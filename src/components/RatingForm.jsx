import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import '../pages/MoviePage/MovieDetailsPage.css';

const RatingForm = ({ onDismiss, onSubmit, initialRating = 0, initialComment = '' }) => {
    const [rating, setRating] = useState(initialRating);
    const [comment, setComment] = useState(initialComment);
    const [error, setError] = useState('');

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
        setError('');
    };

    const handleSubmit = () => {
        if (rating === 0) {
            setError("Please pick a rating.");
            return;
        }
        onSubmit(rating, comment);
        onDismiss();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md relative border border-gray-700">
                <button
                    onClick={onDismiss}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Rate Film and Comment</h2>

                <div className="flex justify-center mb-6">
                    {[...Array(10)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                            <Star
                                key={starValue}
                                size={32}
                                className={`cursor-pointer ${
                                    starValue <= rating ? 'text-yellow-400' : 'text-gray-600'
                                } hover:text-yellow-300 transition-colors`}
                                onClick={() => handleStarClick(starValue)}
                                fill="currentColor"
                            />
                        );
                    })}
                </div>

                {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

                <div className="mb-6">
                    <label htmlFor="comment" className="block text-gray-300 text-sm font-bold mb-2">
                        Your Comment (If You want to add):
                    </label>
                    <textarea
                        id="comment"
                        className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 resize-none h-24"
                        placeholder="Please enter a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onDismiss}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                    >
                        İptal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingForm;