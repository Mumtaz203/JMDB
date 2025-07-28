import React, { useState, useEffect } from "react";
import "./carousel.css";

const reviews = [
    [
        { user: "@movielover35", text: "Inception blew my mind — Nolan at his peak." },
        { user: "@dreamcatcher", text: "The dream layers were genius, and Zimmer’s score is iconic." },
        { user: "@filmbuff99", text: "Every rewatch makes me notice new details. Masterpiece." },
    ],
    [
        { user: "@scififan", text: "The concept of shared dreaming is both exciting and terrifying." },
        { user: "@critic101", text: "Stunning visuals and incredible pacing." },
        { user: "@arthunter", text: "The hallway fight scene is one of the best in cinema." },
    ],
    [
        { user: "@cinephile", text: "DiCaprio’s performance keeps this grounded despite the wild concept." },
        { user: "@filmnerd", text: "Elliot Page was fantastic. The architecture scenes? WOW." },
        { user: "@soundtrackfan", text: "Hans Zimmer’s ‘Time’ is still my favorite score." },
    ],
];

const ReviewsCarousel = () => {
    const [groupIndex, setGroupIndex] = useState(0);
    const [reviewIndex, setReviewIndex] = useState(0);
    const [animClass, setAnimClass] = useState("slide-in");

    const nextGroup = () => {
        setAnimClass("slide-out");
        setTimeout(() => {
            setGroupIndex((prev) => (prev + 1) % reviews.length);
            setReviewIndex(0);
            setAnimClass("slide-in");
        }, 600);
    };

    const prevGroup = () => {
        setAnimClass("slide-out");
        setTimeout(() => {
            setGroupIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
            setReviewIndex(0);
            setAnimClass("slide-in");
        }, 600);
    };

    // Kart içindeki review’ler 5 saniyede bir değişsin (kayarak)
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimClass("slide-out");
            setTimeout(() => {
                setReviewIndex((prev) => (prev + 1) % reviews[groupIndex].length);
                setAnimClass("slide-in");
            }, 600);
        }, 5000);
        return () => clearInterval(interval);
    }, [groupIndex]);

    return (
        <div className="relative w-full">
            {/* 3 Kart */}
            <div className="flex justify-center gap-4">
                {reviews[groupIndex].map((_, idx) => {
                    const review = reviews[groupIndex][(idx + reviewIndex) % reviews[groupIndex].length];
                    return (
                        <div
                            key={idx}
                            className={`review-card bg-gray-100 text-gray-900 rounded-lg p-6 w-64 h-44 shadow-md flex flex-col ${animClass}`}
                        >
                            <p className="text-sm text-gray-500">{review.user}</p>
                            <p className="mt-2 text-base">{review.text}</p>
                        </div>
                    );
                })}
            </div>

            {/* Sol Ok */}
            <button
                onClick={prevGroup}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-full hover:bg-gray-600"
            >
                ‹
            </button>

            {/* Sağ Ok */}
            <button
                onClick={nextGroup}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-2 py-1 rounded-full hover:bg-gray-600"
            >
                ›
            </button>
        </div>
    );
};

export default ReviewsCarousel;
