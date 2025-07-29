import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Star } from 'lucide-react';
import ReviewsCarousel from './ReviewsCarousel';
import '../../pages/MoviePage/MovieDetailsPage.css';
import RatingForm from '../../components/RatingForm';

// GraphQL Sorguları ve Mutasyonları
const GET_MOVIE_DETAILS = gql`
    query GetMovie($id: Int!) {
        getMovie(id: $id) {
            id
            title
            releaseDate
            genre
            description
            directorId
            # Eğer posterUrl backend'den geliyorsa buraya ekleyin
            # posterUrl
        }
    }
`;

const GET_ACTORS_IN_MOVIE = gql`
    query ShowAllActorsInMovie($movieId: Int!) {
        showAllActorsInMovie(movieId: $movieId) {
            id
            name
            birthDate
        }
    }
`;

const GET_MOVIE_AVERAGE_RANKING = gql`
    query FindAverageRankingInMovie($movieId: Int!) {
        findAverageRankingInMovie(movieId: $movieId)
    }
`;

const GET_REVIEWS_IN_MOVIE = gql`
    query ShowAllReviewsInMovie($movieId: Int!) {
        showAllReviewsInMovie(movieId: $movieId) {
            id
            rating
            comment
            movieId
            userId
        }
    }
`;

const GET_DIRECTOR_DETAILS = gql`
    query GetDirector($id: Int!) {
        getDirector(id: $id) {
            id
            name
        }
    }
`;

const ADD_REVIEW = gql`
    mutation CreateReview($input: ReviewInput!) {
        createReview(input: $input) {
            id
            rating
            comment
            movieId
            userId
        }
    }
`;

// Watchlist'e ekleme mutasyonu
const ADD_TO_WATCHLIST_MUTATION = gql`
    mutation AddToWatchlist($userId: Int!, $movieId: Int!) {
        addMovieToWatchList(userId: $userId, movieId: $movieId) {
            id # WatchList'e eklenen filmin ID'si veya backend'inizin döndürdüğü herhangi bir alan
        }
    }
`;

const CastCard = ({ actor }) => {
    return (
        <button
            type="button"
            className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer w-full text-left"
            onClick={() => console.log(`Clicked on ${actor.name}`)}
        >
            <img
                src={"/images/default-actor.jpg"}
                alt={actor.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
                onError={(e) => { e.target.onerror = null; e.target.src = "/images/default-actor.jpg"; }}
            />
            <div>
                <p className="text-white text-sm font-semibold">{actor.name}</p>
                <p className="text-gray-400 text-xs">Actor</p>
            </div>
        </button>
    );
};

function MovieDetails() {
    const { id } = useParams();
    const movieId = parseInt(id);
    const navigate = useNavigate();
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [userId, setUserId] = useState(null);
    // Mesaj state'i eklendi
    const [message, setMessage] = useState({ text: '', type: '' }); // type: 'success', 'error', 'info'

    // Kullanıcı ID'sini localStorage'dan çekme
    useEffect(() => {
        const savedUserId = localStorage.getItem('userId');
        if (savedUserId) {
            setUserId(parseInt(savedUserId));
        }
    }, []);

    // Mesajları otomatik kapatmak için useEffect
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ text: '', type: '' });
            }, 3000); // 3 saniye sonra mesajı kapat
            return () => clearTimeout(timer);
        }
    }, [message]);

    // GraphQL Sorguları
    const { loading: movieLoading, error: movieError, data: movieData } = useQuery(GET_MOVIE_DETAILS, {
        variables: { id: movieId },
        fetchPolicy: "network-only"
    });

    const { loading: actorsLoading, error: actorsError, data: actorsData } = useQuery(GET_ACTORS_IN_MOVIE, {
        variables: { movieId: movieId },
        skip: !movieData?.getMovie,
        fetchPolicy: "network-only"
    });

    const { loading: ratingLoading, error: ratingError, data: ratingData, refetch: refetchRating } = useQuery(GET_MOVIE_AVERAGE_RANKING, {
        variables: { movieId: movieId },
        skip: !movieData?.getMovie,
        fetchPolicy: "network-only"
    });

    const { loading: reviewsLoading, error: reviewsError, data: reviewsData, refetch: refetchReviews } = useQuery(GET_REVIEWS_IN_MOVIE, {
        variables: { movieId: movieId },
        skip: !movieData?.getMovie,
        fetchPolicy: "network-only"
    });

    const { loading: directorLoading, error: directorError, data: directorData } = useQuery(GET_DIRECTOR_DETAILS, {
        variables: { id: movieData?.getMovie?.directorId },
        skip: !movieData?.getMovie?.directorId || !movieData?.getMovie,
        fetchPolicy: "network-only"
    });

    // GraphQL Mutasyonları
    const [createReviewMutation] = useMutation(ADD_REVIEW);

    // Watchlist'e ekleme mutasyonu ve loading state'i
    const [addMovie, { loading: addingToWatchlist }] = useMutation(ADD_TO_WATCHLIST_MUTATION, {
        onCompleted: (data) => {
            const success = data.addMovieToWatchList?.id || data.addMovieToWatchList === true;
            if (success) {
                setMessage({ text: 'Film izleme listenize başarıyla eklendi!', type: 'success' });
            } else {
                setMessage({ text: 'Film izleme listesine eklenirken bir sorun oluştu.', type: 'error' });
            }
        },
        onError: (error) => {
            console.error("Watchlist'e eklerken hata:", error);
            if (error.message.includes("already in watchlist")) {
                setMessage({ text: 'Bu film zaten izleme listenizde!', type: 'info' });
            } else {
                setMessage({ text: `Filmi eklerken hata: ${error.message}`, type: 'error' });
            }
        }
    });

    // Fonksiyonlar
    const handleRatingSubmit = async (rating, comment) => {
        const currentUserId = parseInt(localStorage.getItem('userId'));

        if (!currentUserId) {
            alert("You must be signed in to leave a review.");
            navigate('/signin');
            return;
        }

        try {
            await createReviewMutation({
                variables: {
                    input: {
                        movieId: movieId,
                        userId: currentUserId,
                        rating: rating,
                        comment: comment || ""
                    }
                },
            });
            alert(`Your rating (${rating}) has been saved and your review has been added!`);
            refetchRating();
            refetchReviews();
        } catch (mutationError) {
            console.error('Error occurred while saving the review:', mutationError);
            alert(`An error occurred while saving the review: ${mutationError.message}`);
        }
    };

    const handleOpenRatingModal = () => {
        const usernameInLocalStorage = localStorage.getItem('username');

        if (!usernameInLocalStorage) {
            alert("You must be signed in to rate or leave a comment.");
            navigate('/signin');
            return;
        }
        setShowRatingModal(true);
    };

    const handleCloseRatingModal = () => {
        setShowRatingModal(false);
    };

    const handleRelatedMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    // "Add to Watchlist" butonuna tıklama handler'ı
    const handleAddToWatchlist = async () => {
        const currentUserId = parseInt(localStorage.getItem('userId'));

        if (currentUserId === null || isNaN(currentUserId)) {
            setMessage({ text: 'Lütfen filmi izleme listenize eklemek için giriş yapın.', type: 'info' });
            return;
        }
        if (isNaN(movieId)) {
            setMessage({ text: 'Geçersiz film ID.', type: 'error' });
            return;
        }

        await addMovie({ variables: { userId: currentUserId, movieId: movieId } });
    };

    // Loading ve Error Durumları
    if (movieLoading || actorsLoading || ratingLoading || reviewsLoading || directorLoading) {
        return <div className="text-center mt-20 text-xl">Loading...</div>;
    }

    if (movieError || actorsError || ratingError || reviewsError || directorError) {
        return <div className="text-center mt-20 text-xl text-red-500">An error occurred: {movieError?.message || actorsError?.message || ratingError?.message || reviewsError?.message || directorError?.message}</div>;
    }

    if (!movieData || !movieData.getMovie) {
        return <div className="text-center mt-20 text-xl">Movie not found. Please enter a valid movie ID.</div>;
    }

    // Veri Atamaları
    const movie = movieData.getMovie;
    const actors = actorsData?.showAllActorsInMovie || [];
    const averageRating = ratingData?.findAverageRankingInMovie;
    const reviews = reviewsData?.showAllReviewsInMovie || [];
    const directorName = directorData?.getDirector?.name;

    const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A';

    return (
        <div className="movie-details-page-container">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Mesaj Kutusu */}
                {message.text && (
                    <div className={`mb-4 p-3 rounded-lg text-center font-bold
                        ${message.type === 'success' ? 'bg-green-500 text-white' : ''}
                        ${message.type === 'error' ? 'bg-red-500 text-white' : ''}
                        ${message.type === 'info' ? 'bg-blue-500 text-white' : ''}
                    `}>
                        {message.text}
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8 mb-12 items-start">
                    <div className="poster-area">
                        <div className="relative w-full max-w-[300px] lg:max-w-full rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={movie.posterUrl || "/images/default-poster.jpg"}
                                alt={movie.title}
                                className="w-full h-auto object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "/images/default-poster.jpg"; }}
                            />
                        </div>
                        <div className="flex flex-col gap-3 w-full max-w-[300px] lg:max-w-full mt-4">
                            {/* ADD TO WATCHLIST BUTONU */}
                            <button
                                className="flex items-center justify-center bg-[#3abdff] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#4eb0e6] transition-colors"
                                onClick={handleAddToWatchlist}
                                disabled={userId === null || isNaN(movieId) || addingToWatchlist}
                            >
                                <img src="/images/icons/add-icon.svg" alt="Add to Watchlist" className="w-5 h-5 mr-2" onError={(e) => { e.target.onerror = null; e.target.src = "/images/icons/add-icon.svg"; }} />
                                {addingToWatchlist ? 'Ekleniyor...' : 'Add to Watchlist'}
                            </button>
                            {/* MARK AS WATCHED BUTONU (Değişmedi) */}
                            <button className="flex items-center justify-center bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors" onClick={() => alert("Watched feature is currently unavailable.")}>
                                <img src="/images/icons/watched-icon.svg" alt="Mark as watched" className="w-5 h-5 mr-2" onError={(e) => { e.target.onerror = null; e.target.src = "/images/icons/watched-icon.svg"; }} />
                                Mark as watched
                            </button>
                        </div>
                    </div>

                    <div className="flex-grow info-area">
                        <h1 className="movie-title">{movie.title} ({year})</h1>
                        <p className="text-gray-400 text-lg">{movie.duration || 'N/A'}</p>

                        <p className="movie-summary">{movie.description}</p>

                        <p className="movie-director">
                            <strong>Director:</strong> {directorName || 'N/A'}
                        </p>
                        <p className="movie-director">
                            <strong>Stars:</strong> {actors.length > 0 ? actors.map(a => a.name).join(', ') : 'N/A'}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {movie.genre ? (
                                <span className="bg-[#3C535C] text-white text-xs px-3 py-1 rounded-full">
                                    {movie.genre}
                                </span>
                            ) : (
                                <span className="text-gray-400">N/A</span>
                            )}
                        </div>

                        <div className="rating-bar">
                            <span className="score">
                                <Star size={24} fill="currentColor" className="mr-2" />
                                {averageRating !== undefined && averageRating !== null ? `${averageRating.toFixed(1)} / 10` : 'N/A'}
                            </span>
                            <button className="btn rate" onClick={handleOpenRatingModal}>
                                <img src="/images/icons/rate-icon.svg" alt="Rate" className="w-6 h-6 mr-2" onError={(e) => { e.target.onerror = null; e.target.src = "/images/icons/rate-icon.svg"; }} />
                                Rate
                            </button>
                        </div>
                    </div>

                    <aside className="cast-area">
                        <h3 className="text-xl mb-3">Cast</h3>
                        <ul className="space-y-2 text-gray-200">
                            {actors.length > 0 ? (
                                actors.map((actor, index) => (
                                    <li key={index}>
                                        <CastCard actor={actor} />
                                    </li>
                                ))
                            ) : (
                                <li>No cast information available.</li>
                            )}
                        </ul>
                        <button className="see-more" onClick={() => console.log("See More Cast clicked")}>
                            See More
                        </button>
                    </aside>
                </div>

                <section className="reviews-section">
                    <h2 className="text-2xl mb-4">User reviews <span className="text-blue-400 ml-2">&gt;</span></h2>
                    <div className="reviews-scroll">
                        {reviews.length > 0 ? (
                            <ReviewsCarousel reviews={reviews} />
                        ) : (
                            <p className="text-gray-400">There are no reviews for this movie yet.</p>
                        )}
                    </div>
                    <button className="mt-4 add-review-button" onClick={handleOpenRatingModal}>
                        Add Review
                    </button>
                </section>

                <section className="related-section">
                    <h3 className="text-2xl mb-3">Related Movies</h3>
                    <div className="related-scroll flex gap-4 overflow-x-auto pb-4">
                        <p className="text-gray-400">No similar movies found.</p>
                    </div>
                </section>
            </div>

            {showRatingModal && (
                <RatingForm
                    onDismiss={handleCloseRatingModal}
                    onSubmit={handleRatingSubmit}
                />
            )}
        </div>
    );
}

export default MovieDetails;