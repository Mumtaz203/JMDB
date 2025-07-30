import React, { useState, useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import Filter from './Filter';


const SEARCH_MOVIES = gql`
    query SearchMovies($name: String!) {
        searchMovieByName(name: $name) {
            id
            title
            releaseDate
            genre
        }
    }
`;

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const navigate = useNavigate();

    const [searchMovies, { data }] = useLazyQuery(SEARCH_MOVIES);

    useEffect(() => {
        if (query.length > 1) {
            searchMovies({ variables: { name: query } });
            setDropdownOpen(true);
        } else {
            setDropdownOpen(false);
        }
    }, [query, searchMovies]);

    const results = data?.searchMovieByName || [];

    const handleSelect = (movie) => {
        setQuery(movie.title);
        setDropdownOpen(false);
        navigate(`/movie/${movie.id}`); // MovieDetails sayfasına git
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && results.length > 0) {
            handleSelect(results[0]); // Enter ile ilk sonuca git
        }
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
    };

    return (
        <div className="search-bar-wrapper">
            <input
                type="text"
                placeholder="search in JMDB"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {dropdownOpen && (
                <ul className="search-dropdown">
                    {results.length > 0 ? (
                        results.map((movie) => (
                            <li
                                key={movie.id}
                                className="cursor-pointer hover:bg-gray-700 transition-colors"
                                onClick={() => handleSelect(movie)}
                            >
                                <div className="dropdown-item p-2">
                                    <span className="dropdown-title font-semibold text-white">
                                        {movie.title}
                                    </span>
                                    {movie.genre && (
                                        <span className="dropdown-meta text-gray-400 text-sm ml-2">
                                            ({movie.genre})
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="no-results text-gray-400 p-2">No results</li>
                    )}
                </ul>
            )}

            <button className="search-btn">
                <span className="material-symbols-outlined">search</span>
            </button>

            <Filter />
        </div>
    );
}
