import "./Header.css";
import "./SignInButton.css";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("username");
        if (savedUser) {
            setUsername(savedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        setUsername(null);
        window.location.reload();
    };

    return (
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
                            <Link to="/actors" onClick={() => setIsMenuOpen(false)}>Actors/Actresses</Link>
                            <Link to="/createacc" onClick={() => setIsMenuOpen(false)}>Create Account</Link>
                        </div>
                    )}
                </div>

                {/* Arama ve Filtre */}
                <div className="search-filter-wrapper">
                    <SearchBar />
                </div>

                {/* Kullanıcı Bilgisi */}
                <div className="header-buttons">
                    {username ? (
                        <div className="user-info">
                            <span className="username">{username}</span>
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

                {/* Logo */}
                <Link to="/" className="logo-text">JMDB</Link>
            </header>
        </div>
    );
}
