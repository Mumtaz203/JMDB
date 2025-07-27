import "./Header.css";
import "./SignInButton.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [username, setUsername] = useState(null);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
    };

    useEffect(() => {
        const savedUser = localStorage.getItem("username");
        if (savedUser) {
            setUsername(savedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        setUsername(null);
        window.location.reload(); // sayfayı yenileyerek güncelle
    };

    return (
        <>
            <div className="outer-frame">
                <header className="inner-frame">
                    {/* Hamburger Menü */}
                    <div className="menu-container">
                        <div
                            className="menu-icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            ☰
                        </div>
                        {isMenuOpen && (
                            <div className="dropdown-menu">
                                <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                                <Link to="/actors" onClick={() => setIsMenuOpen(false)}>Actors</Link>
                                <Link to="/createacc" onClick={() => setIsMenuOpen(false)}>Create Account</Link>
                            </div>
                        )}
                    </div>

                    {/* Arama alanı */}
                    <div className="search-bar">
                        <input type="text" placeholder="search in JMDB" />
                        <button className="search-btn">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <button
                            className="filter-btn"
                            onClick={toggleFilter}
                        >
                            <span className="material-symbols-outlined">filter_list</span>
                        </button>
                    </div>

                    {/* Sign In veya Kullanıcı Adı */}
                    <div className="header-buttons">
                        {username ? (
                            <div className="user-info">
                                <span className="username">
                                 {username.includes('@') ? username.split('@')[0] : username}
                                </span>
                                <button className="logout-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/signin" className="signInBtn">Sign In</Link>
                        )}
                        <Link to="/watchlist" className="header-btn">
                            <span className="material-symbols-outlined bookmark-icon">bookmark</span>
                        </Link>
                    </div>

                    {/* JMDB Logo */}
                    <Link to="/" className="logo-text">JMDB</Link>
                </header>
            </div>

            {/* Overlay ve Filtre Paneli */}
            {isFilterOpen && (
                <div className="filter-overlay" onClick={closeFilter}>
                    <div className="filter-sidebar open" onClick={(e) => e.stopPropagation()}>
                        <h2>Filters</h2>
                        <p>(Şimdilik placeholder içerik)</p>
                        <ul>
                            <li>All Movies</li>
                            <li>Movies I Haven't Seen</li>
                            <li>Movies I Have Seen</li>
                        </ul>
                        <button onClick={closeFilter}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}
