import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import ReviewsCarousel from './ReviewsCarousel';
import '../../pages/MoviePage/MovieDetailsPage.css';
import RatingForm from '../../components/RatingForm';
import { movieImages } from "../../movieAssets";

const GET_MOVIE_DETAILS = gql`
    query GetMovie($id: Int!) {
        getMovie(id: $id) {
            id
            title
            releaseDate
            genre
            description
            directorId
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

const ADD_TO_WATCHLIST_MUTATION = gql`
    mutation AddToWatchlist($userId: Int!, $movieId: Int!) {
        addMovieToWatchList(userId: $userId, movieId: $movieId) {
            id
            title
            releaseDate
            genre
            description
            directorId
        }
    }
`;

const CastCard = ({ actor }) => (
    <button
        type="button"
        className="flex items-center px-0 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer w-full text-left"
    >
        <img
            src={"/images/default-actor.jpg"}
            alt={actor.name}
            className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0"
            onError={(e) => { e.target.onerror = null; e.target.src = "/images/default-actor.jpg"; }}
        />
        <div className="flex-grow min-w-0">
            <p className="text-white text-sm font-semibold truncate">{actor.name}</p>
            <p className="text-gray-400 text-xs">Actor</p>
        </div>
    </button>
);

function MovieDetails() {
    const { id } = useParams();
    const movieId = parseInt(id);
    const navigate = useNavigate();
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showFullCast, setShowFullCast] = useState(false);

    useEffect(() => {
        const savedUserId = localStorage.getItem('userId');
        if (savedUserId) {
            setUserId(parseInt(savedUserId));
        }
    }, []);

    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ text: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const { loading: movieLoading, error: movieError, data: movieData } = useQuery(GET_MOVIE_DETAILS, {
        variables: { id: movieId },
        fetchPolicy: "cache-and-network"
    });

    const { loading: actorsLoading, error: actorsError, data: actorsData } = useQuery(GET_ACTORS_IN_MOVIE, {
        variables: { movieId: movieId },
        skip: !movieData?.getMovie,
        fetchPolicy: "cache-and-network"
    });

    const { loading: ratingLoading, error: ratingError, data: ratingData, refetch: refetchRating } = useQuery(GET_MOVIE_AVERAGE_RANKING, {
        variables: { movieId: movieId },
        skip: !movieData?.getMovie,
        fetchPolicy: "cache-and-network"
    });

    const { loading: reviewsLoading, error: reviewsError, data: reviewsData, refetch: refetchReviews } = useQuery(GET_REVIEWS_IN_MOVIE, {
        variables: { movieId: movieId },
        skip: !movieData?.getMovie,
        fetchPolicy: "cache-and-network"
    });

    const { loading: directorLoading, error: directorError, data: directorData } = useQuery(GET_DIRECTOR_DETAILS, {
        variables: { id: movieData?.getMovie?.directorId },
        skip: !movieData?.getMovie?.directorId || !movieData?.getMovie,
        fetchPolicy: "cache-and-network"
    });

    const [createReviewMutation] = useMutation(ADD_REVIEW);

    const [addMovie, { loading: addingToWatchlist, error: addMovieError }] = useMutation(ADD_TO_WATCHLIST_MUTATION, {
        onCompleted: (data) => {
            setMessage({ text: 'Movie added to watchlist successfully!', type: 'success' });
            console.log('Movie added to watchlist:', data.addMovieToWatchList);
        },
        onError: (error) => {
            setMessage({ text: `Failed to add movie to watchlist: ${error.message}`, type: 'error' });
            console.error('Error adding movie to watchlist:', error.message);
        }
    });

    const handleRatingSubmit = async (rating, comment) => {
        const userId = parseInt(localStorage.getItem('userId'));
        if (!userId) {
            setMessage({ text: "You must be signed in to leave a review.", type: 'info' });
            navigate('/signin');
            return;
        }

        try {
            await createReviewMutation({
                variables: {
                    input: {
                        movieId: movieId,
                        userId: userId,
                        rating: rating,
                        comment: comment || ""
                    }
                },
            });
            setMessage({ text: `Your rating (${rating}) has been saved and your review has been added!`, type: 'success' });
            refetchRating();
            refetchReviews();
        } catch (mutationError) {
            console.error('Error occurred while saving the review:', mutationError);
            setMessage({ text: `An error occurred while saving the review: ${mutationError.message}`, type: 'error' });
        }
    };

    const handleOpenRatingModal = () => {
        const usernameInLocalStorage = localStorage.getItem('username');
        if (!usernameInLocalStorage) {
            setMessage({ text: "You must be signed in to rate or leave a comment.", type: 'info' });
            navigate('/signin');
            return;
        }
        setShowRatingModal(true);
    };

    const handleAddToWatchlist = async () => {
        const currentUserId = parseInt(localStorage.getItem('userId'));
        const usernameInLocalStorage = localStorage.getItem('username');

        if (!usernameInLocalStorage) {
            setMessage({ text: 'Please sign in to add the movie to your watchlist.', type: 'info' });
            navigate('/signin');
            return;
        }
        try {
            await addMovie({ variables: { userId: currentUserId, movieId: movieId } });
        } catch (error) {
            console.error("Watchlist addition failed outside mutation hook:", error);
        }
    };

    const handleMarkAsWatched = () => {
        const usernameInLocalStorage = localStorage.getItem('username');
        if (!usernameInLocalStorage) {
            setMessage({ text: "You must be signed in to mark a movie as watched.", type: 'info' });
            navigate('/signin');
            return;
        }
        setMessage({ text: 'Movie marked as watched!', type: 'success' });
    };

    const handleCloseRatingModal = () => setShowRatingModal(false);

    const images = useMemo(() => {
        if (!movieData?.getMovie) return {};
        const idKey = String(movieData.getMovie.id);
        return movieImages[idKey] || movieImages[Number(idKey)] || {};
    }, [movieData]);

    const poster = images.poster || "/images/default-poster.jpg";
    const banner = images.banner || null;

    if (movieLoading || actorsLoading || ratingLoading || reviewsLoading || directorLoading) {
        return <div className="text-center mt-20 text-xl">Loading...</div>;
    }

    if (movieError || actorsError || ratingError || reviewsError || directorError || addMovieError) {
        return <div className="text-center mt-20 text-xl text-red-500">An error occurred: {movieError?.message || actorsError?.message || ratingError?.message || reviewsError?.message || directorError?.message || addMovieError?.message}</div>;
    }

    if (!movieData || !movieData.getMovie) {
        return <div className="text-center mt-20 text-xl">Movie not found. Please enter a valid movie ID.</div>;
    }

    const movie = movieData.getMovie;
    const actors = actorsData?.showAllActorsInMovie || [];
    const averageRating = ratingData?.findAverageRankingInMovie;
    const reviews = reviewsData?.showAllReviewsInMovie || [];
    const directorName = directorData?.getDirector?.name;
    const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A';

    const displayedActors = showFullCast ? actors : actors.slice(0, 5);
    const hasMoreActors = actors.length > 5;

    return (
        <div className="movie-details-page-container">
            {banner && (
                <div
                    className="movie-banner"
                    style={{
                        backgroundImage: `url(${banner})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "300px"
                    }}
                ></div>
            )}

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
                                src={poster}
                                alt={movie.title}
                                className="w-full h-auto object-cover"
                                onError={(e) => {
                                    if (!e.target.src.includes("default-poster.jpg")) {
                                        e.target.src = "/images/default-poster.jpg";
                                    }
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-3 w-full max-w-[300px] lg:max-w-full mt-4">
                            <button className="flex items-center justify-center bg-[#3abdff] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#4eb0e6] transition-colors"
                                onClick={handleAddToWatchlist}
                            >
                                <img src="/images/icons/add-icon.svg" alt="Add to Watchlist" className="w-5 h-5 mr-2" />
                                {addingToWatchlist ? 'Adding...' : 'Add to Watchlist'}
                            </button>
                            {/* <<-- handleMarkAsWatched fonksiyonu buraya eklendi */}
                            <button className="flex items-center justify-center bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                                onClick={handleMarkAsWatched}
                            >
                                <img
                                    src="/images/icons/watched-icon.svg"
                                    alt="Mark as watched"
                                    className="w-5 h-5 mr-2"
                                    onError={(e) => {
                                        if (!e.target.src.includes("fallback-icon.svg")) {
                                            e.target.src = "/images/icons/fallback-icon.svg";
                                        }
                                    }}
                                />
                                Mark as watched
                            </button>
                            {/* -->> */}
                        </div>
                    </div>

                    <div className="flex-grow info-area">
                        <h1 className="movie-title">{movie.title} ({year})</h1>
                        <p className="movie-summary">{movie.description}</p>
                        <p className="movie-director"><strong>Director:</strong> {directorName || 'N/A'}</p>
                        <p className="movie-director"><strong>Stars:</strong> {actors.length > 0 ? actors.map(a => a.name).join(', ') : 'N/A'}</p>

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
                                <img src="/images/icons/star-icon.svg" alt="Rate" className="w-8 h-8 mr-1" />
                                {averageRating !== undefined && averageRating !== null ? `${averageRating.toFixed(1)} / 10` : 'N/A'}
                            </span>
                            <button className="btn rate signInBtn" onClick={handleOpenRatingModal}>
                                <img src="/images/icons/star-icon.svg" alt="Rate" className="w-8 h-8 mr-1" />
                                Rate
                            </button>
                        </div>
                    </div>

                    <aside className="cast-area">
                        <h3 className="text-xl mb-3">Cast</h3>
                        <ul className="space-y-2 text-gray-200">
                            {displayedActors.length > 0 ? (
                                displayedActors.map((actor, index) => (
                                    <li key={index}>
                                        <CastCard actor={actor} />
                                    </li>
                                ))
                            ) : (
                                <li>No cast information available.</li>
                            )}
                        </ul>
                        {hasMoreActors && !showFullCast && (
                            <button className="see-more" onClick={() => setShowFullCast(true)}>
                                See More
                            </button>
                        )}
                        {showFullCast && (
                            <button className="see-more" onClick={() => setShowFullCast(false)}>
                                Show Less
                            </button>
                        )}
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