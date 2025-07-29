import React, { useEffect, useState } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import "./Actors.css";


const GET_ALL_MOVIES = gql`
    query GetAllMovies {
        getAllMovies {
            id
            title
        }
    }
`;


const SHOW_ALL_ACTORS = gql`
    query ShowAllActorsInMovie($movieId: Int!) {
        showAllActorsInMovie(movieId: $movieId) {
            id
            name
        }
    }
`;

export default function Actors() {
    const { data: moviesData, loading: moviesLoading, error: moviesError } = useQuery(GET_ALL_MOVIES, {
        fetchPolicy: "network-only"
    });

    const [fetchActors] = useLazyQuery(SHOW_ALL_ACTORS);
    const [actors, setActors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" veya "desc"
    const [loadingActors, setLoadingActors] = useState(false);
    const [errorActors, setErrorActors] = useState(null);

    useEffect(() => {
        const fetchAllActors = async () => {
            if (!moviesData?.getAllMovies) return;
            setLoadingActors(true);
            const allActors = [];

            try {
                for (const movie of moviesData.getAllMovies) {
                    const res = await fetchActors({ variables: { movieId: movie.id } });
                    if (res?.data?.showAllActorsInMovie) {
                        allActors.push(...res.data.showAllActorsInMovie);
                    }
                }

                const uniqueActors = Array.from(
                    new Map(allActors.map(actor => [actor.id, actor])).values()
                );

                setActors(uniqueActors);
            } catch (err) {
                setErrorActors(err);
            } finally {
                setLoadingActors(false);
            }
        };

        fetchAllActors();
    }, [moviesData, fetchActors]);

    if (moviesLoading || loadingActors) return <p style={{ color: "#fff" }}>Loading all actors...</p>;
    if (moviesError || errorActors) return <p style={{ color: "#fff" }}>Error loading data.</p>;

    // Arama ve sıralama
    const filteredActors = actors
        .filter(actor => actor.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "asc") return a.name.localeCompare(b.name);
            return b.name.localeCompare(a.name);
        });

    return (
        <div className="actors-page">
            <h1 className="actors-title">All Actors/Actresses</h1>

            <div className="actors-controls">
                <input
                    type="text"
                    placeholder="Search actor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                    Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
                </button>
            </div>

            <div className="actors-grid">
                {filteredActors.length > 0 ? (
                    filteredActors.map((actor) => (
                        <div key={actor.id} className="actor-card">
                            <h3>{actor.name}</h3>
                        </div>
                    ))
                ) : (
                    <p className="no-movies">No actors found.</p>
                )}
            </div>
        </div>
    );
}
