import React, { useState, useEffect } from 'react';
import { MovieCard } from '../../../components/MovieCard';
import { gql, useMutation } from '@apollo/client';
import RatingForm from '../../../components/RatingForm';
import { useNavigate } from 'react-router-dom';

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

const ListedMoviesSection = ({ movies, onRemoveMovie, onRatingSuccess }) => {
    const navigate = useNavigate();
    const moviesToDisplay = movies || [];

    const [showRatingModal, setShowRatingModal] = useState(false);
    const [selectedMovieIdForRating, setSelectedMovieIdForRating] = useState(null);
    const [userId, setUserId] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });

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

    const [createReviewMutation] = useMutation(ADD_REVIEW);

    const handleRatingSubmit = async (rating, comment) => {
        if (!userId) {
            setMessage({ text: 'You must be signed in to leave a comment or rate a movie.', type: 'info' });
            setShowRatingModal(false);
            navigate('/signin');
            return;
        }
        if (!selectedMovieIdForRating) {
            setMessage({ text: 'No movie selected for rating.', type: 'error' });
            setShowRatingModal(false);
            return;
        }

        try {
            await createReviewMutation({
                variables: {
                    input: {
                        movieId: selectedMovieIdForRating,
                        userId: userId,
                        rating: rating,
                        comment: comment || ""
                    }
                },
            });
            setMessage({ text: `Movie successfully rated: ${rating} stars!`, type: 'success' });

            if (onRatingSuccess) {
                onRatingSuccess(); 
            }
        } catch (mutationError) {
            console.error('Error while saving rating:', mutationError);
            setMessage({ text: `Error while saving rating: ${mutationError.message}`, type: 'error' });
        } finally {
            setShowRatingModal(false);
            setSelectedMovieIdForRating(null);
        }
    };

    const handleOpenRatingModal = (movieId) => {
        if (!userId) {
            setMessage({ text: 'You must be signed in to rate a movie.', type: 'info' });
            navigate('/signin');
            return;
        }
        setSelectedMovieIdForRating(movieId);
        setShowRatingModal(true);
    };

    const handleCloseRatingModal = () => {
        setShowRatingModal(false);
        setSelectedMovieIdForRating(null);
    };

    return (
        <section className="mt-8">
            {message.text && (
                <div className={`mb-4 p-3 rounded-lg text-center font-bold
                    ${message.type === 'success' ? 'bg-green-500 text-white' : ''}
                    ${message.type === 'error' ? 'bg-red-500 text-white' : ''}
                    ${message.type === 'info' ? 'bg-blue-500 text-white' : ''}
                `}>
                    {message.text}
                </div>
            )}
            <h2 className="text-2xl font-bold text-white mb-6">Movies</h2>
            <div className="movie-list-container">
                {moviesToDisplay.length > 0 ? (
                    moviesToDisplay.map(movie => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie} 
                            onRemoveMovie={onRemoveMovie} 
                            onRateClick={handleOpenRatingModal} 
                        />
                    ))
                ) : (
                    <p className="text-center text-lg mt-8 text-gray-400">There are no movies in your watchlist.</p>
                )}
            </div>

            {showRatingModal && (
                <RatingForm
                    onDismiss={handleCloseRatingModal}
                    onSubmit={handleRatingSubmit}
                />
            )}
        </section>
    );
};

export default ListedMoviesSection;
