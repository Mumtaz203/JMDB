import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Filter.css";

export default function Filter() {
    const [isOpen, setIsOpen] = useState(false);
    const [showOption, setShowOption] = useState("all");
    const [showAllDates, setShowAllDates] = useState(true);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [actor, setActor] = useState("");
    const [director, setDirector] = useState("");
    const [rating, setRating] = useState(5);
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };

    const closeFilter = () => {
        setIsOpen(false);
    };

    const toggleGenre = (genre) => {
        setGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    };

    const applyFilters = () => {
        // URL parametrelerini oluştur
        const params = new URLSearchParams();

        if (actor.trim()) {
            params.append("actor", actor.trim());
        }

        if (director.trim()) {
            params.append("director", director.trim());
        }

        if (!showAllDates) {
            if (dateFrom) params.append("dateFrom", dateFrom);
            if (dateTo) params.append("dateTo", dateTo);
        }

        if (rating) {
            params.append("rating", rating);
        }

        if (genres.length > 0) {
            params.append("genres", genres.join(","));
        }

        // Filtreli sayfaya yönlendir
        navigate(`/filtered?${params.toString()}`);

        // Paneli kapat
        closeFilter();
    };

    const resetFilters = () => {
        setShowOption("all");
        setShowAllDates(true);
        setDateFrom("");
        setDateTo("");
        setActor("");
        setDirector("");
        setRating(5);
        setGenres([]);
    };

    return (
        <>
            <button className="filter-btn" onClick={toggleFilter}>
                <span className="material-symbols-outlined">filter_list</span>
            </button>

            {isOpen && (
                <div className="filter-overlay" onClick={closeFilter}>
                    <div
                        className={`filter-sidebar ${isOpen ? "open" : ""}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 class="filter-title">Filters</h2>

                        {/* Show Options */}
                        <div className="filter-section">
                            <span className="section-title-filter">Show</span>
                            <label>
                                <input
                                    type="radio"
                                    name="show"
                                    value="all"
                                    checked={showOption === "all"}
                                    onChange={() => setShowOption("all")}
                                />
                                All Movies
                            </label>
                        </div>

                        {/* Release Date */}
                        <div className="filter-section">
                            <span className="section-title-filter">Release Date</span>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={showAllDates}
                                    onChange={() => setShowAllDates(!showAllDates)}
                                />
                                Show All Movies
                            </label>
                            {!showAllDates && (
                                <div className="date-range">
                                    <input
                                        type="date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Actor / Director Search */}
                        <div className="filter-section">
                            <span className="section-title-filter">Search By</span>
                            <label>Actor</label>
                            <div className="search-input">
                                <input
                                    type="text"
                                    value={actor}
                                    onChange={(e) => setActor(e.target.value)}
                                    placeholder="search"
                                />
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <label>Director</label>
                            <div className="search-input">
                                <input
                                    type="text"
                                    value={director}
                                    onChange={(e) => setDirector(e.target.value)}
                                    placeholder="search"
                                />
                                <span className="material-symbols-outlined">search</span>
                            </div>
                        </div>

                        {/* Rating Slider */}
                        <div className="filter-section">
                            <span className="section-title-filter">Rating</span>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            />
                            <span>{rating}</span>
                        </div>

                        {/* Genres */}
                        <div className="filter-section">
                            <span className="section-title-filter">Genres</span>
                            <div className="genre-buttons">
                                {["Action", "Adventure", "Animation", "Comedy"].map((g) => (
                                    <button
                                        key={g}
                                        className={`genre-btn ${genres.includes(g) ? "active" : ""}`}
                                        onClick={() => toggleGenre(g)}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="filter-actions">
                            <button className="logout-btn" onClick={applyFilters}>
                                Apply
                            </button>
                            <button className="logout-btn" onClick={resetFilters}>
                                Reset
                            </button>
                            <button className="logout-btn" onClick={closeFilter}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
