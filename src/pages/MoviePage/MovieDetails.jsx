import React, { useEffect, useState } from "react";
import ReviewsCarousel from "./ReviewsCarousel";

const MovieDetailsPage = () => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("username");
        if (savedUser) {
            setUsername(savedUser);
        }
    }, []);

    const handleProtectedAction = (action) => {
        if (!username) {
            alert("You need to sign in first.");
            return;
        }
        alert(`${action} action performed!`);
    };

    return (
        <div className="bg-gradient-to-b from-black via-gray-900 to-gray-950 text-gray-100 p-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div className="flex flex-col items-center gap-4 md:w-1/4">
                    <div className="w-52 h-80 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                        Poster
                    </div>
                    <button
                        className={`w-full py-2 rounded-lg transition ${
                            username
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-600 text-gray-300 cursor-not-allowed"
                        }`}
                        onClick={() => handleProtectedAction("Added to Watchlist")}
                    >
                        Add to Watchlist
                    </button>
                    <button
                        className={`w-full py-2 rounded-lg transition ${
                            username
                                ? "bg-gray-700 text-white hover:bg-gray-600"
                                : "bg-gray-600 text-gray-300 cursor-not-allowed"
                        }`}
                        onClick={() => handleProtectedAction("Marked as Watched")}
                    >
                        Mark as Watched
                    </button>
                </div>

                <div className="flex flex-col gap-4 md:w-3/4">
                    <h1 className="text-3xl font-bold">Inception (2010)</h1>
                    <p className="text-gray-300 leading-relaxed">
                        Dom Cobb is a skilled thief, the absolute best in the dangerous art
                        of extraction... (özet buraya gelecek).
                    </p>
                    <p className="text-blue-300">
                        <strong>Director:</strong> Christopher Nolan
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-yellow-400 text-xl">⭐ 8.8 / 10</span>
                        <button
                            className={`px-4 py-2 rounded-md transition ${
                                username
                                    ? "bg-indigo-500 hover:bg-indigo-600"
                                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                            }`}
                            onClick={() => handleProtectedAction("Rated")}
                        >
                            Rate
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-10">
                    <section>
                        <h2 className="text-2xl mb-4">User Reviews ⭐ 8.8</h2>
                        <ReviewsCarousel />
                        <button
                            className={`mt-4 signInBtn px-4 py-2 rounded-md transition ${
                                username
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                            }`}
                            onClick={() => handleProtectedAction("Added Review")}
                        >
                            Add Review
                        </button>
                    </section>

                    <section>
                        <h3 className="text-2xl mb-3">Related Movies</h3>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            <div className="bg-gray-800 rounded-lg h-60 w-40 flex items-center justify-center text-gray-400">
                                Interstellar
                            </div>
                            <div className="bg-gray-800 rounded-lg h-60 w-40 flex items-center justify-center text-gray-400">
                                The Dark Knight
                            </div>
                            <div className="bg-gray-800 rounded-lg h-60 w-40 flex items-center justify-center text-gray-400">
                                Fight Club
                            </div>
                        </div>
                    </section>
                </div>

                <aside className="lg:w-1/3 bg-gray-800 rounded-lg p-4 self-start">
                    <h3 className="text-xl mb-3">Cast</h3>
                    <ul className="space-y-2 text-gray-200">
                        <li>Leonardo DiCaprio - Cobb</li>
                        <li>Elliot Page - Ariadne</li>
                        <li>Tom Hardy - Eames</li>
                        <li>Cillian Murphy - Robert Fischer</li>
                        <li>Marion Cotillard - Mal</li>
                        <li>Michael Caine - Miles</li>
                    </ul>
                    <a href="/cast" className="block mt-3 text-blue-400 hover:underline">
                        See More
                    </a>
                </aside>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
