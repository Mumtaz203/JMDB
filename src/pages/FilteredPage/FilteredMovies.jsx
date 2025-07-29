import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import "./FilteredMovies.css";
import { movieImages } from "../../movieAssets";

const GET_ALL_MOVIES = gql`
    query GetAllMovies {
        getAllMovies {
            id
            title
            releaseDate
            genre
            directorId
        }
    }
`;

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default function FilteredMovies() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);

    const actor = params.get("actor") || "";
    const director = params.get("director") || "";
    const rating = parseInt(params.get("rating"), 10) || null;
    const genres = params.get("genres")?.split(",") || [];
    const dateFrom = params.get("dateFrom") || "";
    const dateTo = params.get("dateTo") || "";

    const { data, loading, error, refetch } = useQuery(GET_ALL_MOVIES, {
        fetchPolicy: "network-only"
    });

    const [filteredMovies, setFilteredMovies] = useState([]);
    const lastParamsRef = useRef(location.search);

    useEffect(() => {
        refetch().then(() => {
            if (!data?.getAllMovies) return;

            let movies = [...data.getAllMovies];

            // Filtreler
            if (director) {
                movies = movies.filter((m) =>
                    m.title.toLowerCase().includes(director.toLowerCase())
                );
            }
            if (actor) {
                movies = movies.filter((m) =>
                    m.title.toLowerCase().includes(actor.toLowerCase())
                );
            }
            if (rating) {
                movies = movies.filter(() => rating <= 8);
            }
            if (genres.length > 0) {
                movies = movies.filter((m) =>
                    genres.some((g) =>
                        (m.genre || "").toLowerCase().includes(g.toLowerCase())
                    )
                );
            }
            if (dateFrom || dateTo) {
                movies = movies.filter((m) => {
                    const movieDate = new Date(m.releaseDate);
                    const fromDate = dateFrom ? new Date(dateFrom) : null;
                    const toDate = dateTo ? new Date(dateTo) : null;
                    if (fromDate && movieDate < fromDate) return false;
                    if (toDate && movieDate > toDate) return false;
                    return true;
                });
            }

            if (lastParamsRef.current !== location.search) {
                setFilteredMovies(shuffleArray(movies));
                lastParamsRef.current = location.search;
            } else {
                setFilteredMovies(movies);
            }
        });
    }, [data, actor, director, rating, genres, dateFrom, dateTo, location.search, refetch]);

    if (loading) return <p style={{ color: "#fff" }}>Loading...</p>;
    if (error) return <p style={{ color: "#fff" }}>Error: {error.message}</p>;

    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div className="filtered-page">
            <h1 className="filtered-title">According to Your Interests</h1>
            <div className="filtered-movie-grid">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((m) => {
                        const poster = movieImages[m.id]?.poster || "/images/default-poster.jpg";
                        return (
                            <div
                                key={m.id}
                                className="filtered-movie-card cursor-pointer hover:bg-gray-700 transition-colors"
                                onClick={() => handleMovieClick(m.id)}
                            >
                                <div
                                    className="poster"
                                    style={{
                                        backgroundImage: `url(${poster})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        width: "100%",
                                        height: "300px",
                                        borderRadius: "8px"
                                    }}
                                ></div>
                                <div className="movie-info">
                                    <h3>{m.title}</h3>
                                    <p>{m.releaseDate}</p>
                                    <p>{m.genre || "Unknown Genre"}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="no-movies">No movies found.</p>
                )}
            </div>
        </div>
    );
}
