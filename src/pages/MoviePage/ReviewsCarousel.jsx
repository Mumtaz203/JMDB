import React, { useState, useEffect } from "react";
import "./carousel.css";
import { gql, useApolloClient } from '@apollo/client';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const GET_USER_BY_ID = gql`
    query GetUser($id: Int!) {
        getUser(id: $id) {
            id
            username
        }
    }
`;

const ReviewsCarousel = ({ reviews: initialReviews }) => {
    const client = useApolloClient();

    const [reviewedUsers, setReviewedUsers] = useState({});
    const [isLoadingUsernames, setIsLoadingUsernames] = useState(true);

    const reviews = initialReviews && initialReviews.length > 0
        ? initialReviews.map(review => ({
            id: review.id,
            userId: review.userId,
            user: reviewedUsers[review.userId] || `Loading...`,
            text: review.comment || "No comment available.",
            rating: review.rating
        }))
        : [];

    const groupedReviews = [];
    for (let i = 0; i < reviews.length; i += 3) {
        groupedReviews.push(reviews.slice(i, i + 3));
    }

    const [groupIndex, setGroupIndex] = useState(0);
    const [animClass, setAnimClass] = useState("carousel-slide-in-right");

    const canNavigate = groupedReviews.length > 1;

    useEffect(() => {
        setGroupIndex(0);
        setIsLoadingUsernames(true);

        const fetchUsernames = async () => {
            const uniqueUserIds = [...new Set(initialReviews.map(r => r.userId))];
            const newReviewedUsers = { ...reviewedUsers };

            const promises = uniqueUserIds.map(async (uId) => {
                if (newReviewedUsers[uId]) return;

                try {
                    const { data } = await client.query({
                        query: GET_USER_BY_ID,
                        variables: { id: uId },
                        fetchPolicy: "cache-first"
                    });
                    if (data?.getUser?.username) {
                        newReviewedUsers[uId] = data.getUser.username;
                    } else {
                        newReviewedUsers[uId] = `User ID: ${uId}`;
                    }
                } catch (err) {
                    console.error(`Error while fetching user ID ${uId}:`, err);
                    newReviewedUsers[uId] = `Unknown User`;
                }
            });

            await Promise.all(promises);
            setReviewedUsers(newReviewedUsers);
            setIsLoadingUsernames(false);
        };

        if (initialReviews.length > 0) {
            fetchUsernames();
        } else {
            setIsLoadingUsernames(false);
        }

    }, [initialReviews, client]);

    const handlePrevReviewGroup = () => {
        setAnimClass("carousel-slide-in-left"); // yalnızca giriş animasyonu
        setTimeout(() => {
            setGroupIndex((prev) => (prev - 1 + groupedReviews.length) % groupedReviews.length);
        }, 500); // animasyon süresine eşitlendi
    };

    const handleNextReviewGroup = () => {
        setAnimClass("carousel-slide-in-right"); // yalnızca giriş animasyonu
        setTimeout(() => {
            setGroupIndex((prev) => (prev + 1) % groupedReviews.length);
        }, 500);
    };

    if (reviews.length === 0 || isLoadingUsernames) {
        return <p className="text-gray-400">
            {isLoadingUsernames && reviews.length > 0 ? "Loading usernames..." : "No reviews available for this movie."}
        </p>;
    }

    return (
        <div className="relative w-full flex items-center justify-center px-12">
            {canNavigate && (
                <button
                    onClick={handlePrevReviewGroup}
                    className="absolute z-10 p-2 bg-gray-700 rounded-full shadow-md text-white hover:bg-gray-600 transition-colors
                                left-0 transform -translate-x-1/2 flex items-center justify-center opacity-70 hover:opacity-100"
                    aria-label="Previous review group"
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            <div className="flex justify-center gap-4 flex-grow relative overflow-x-clip">
                <div className={`flex justify-center gap-4 w-full ${animClass}`}>
                    {groupedReviews[groupIndex].map((review, idx) => {
                        const userName = reviewedUsers[review.userId] || `Loading...`;
                        return (
                            <div
                                key={review.id || idx}
                                className="review-card bg-gray-100 text-gray-900 rounded-lg p-6 w-64 h-44 shadow-md flex flex-col flex-shrink-0"
                            >
                                <p className="text-sm text-gray-500 font-semibold">{userName}</p>
                                <div className="flex items-center mt-1">
                                    <Star size={16} fill="currentColor" className="text-yellow-500 mr-1" />
                                    <span className="text-sm font-bold">{review.rating}/10</span>
                                </div>
                                <p className="mt-2 text-base overflow-y-auto text-ellipsis h-[60px]">{review.text}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {canNavigate && (
                <button
                    onClick={handleNextReviewGroup}
                    className="absolute z-10 p-2 bg-gray-700 rounded-full shadow-md text-white hover:bg-gray-600 transition-colors
                                right-0 transform translate-x-1/2 flex items-center justify-center opacity-70 hover:opacity-100"
                    aria-label="Next review group"
                >
                    <ChevronRight size={24} />
                </button>
            )}
        </div>
    );
};

export default ReviewsCarousel;
