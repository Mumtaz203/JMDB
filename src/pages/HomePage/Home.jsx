import "./Home.css";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { movieImages } from "../../movieAssets"; // Poster ve banner eşleşmeleri

// Haftanın favori filmi (örnek: id:2)
const GET_MOVIE = gql`
    query GetMovie($id: Int!) {
        getMovie(id: $id) {
            id
            title
            description
        }
    }
`;

// Top Rated filmler (en yüksek puandan düşük puana)
const GET_TOP_RATED = gql`
    query {
        sortMovieByBetterReviewPoint {
            id
            title
        }
    }
`;

export default function Home() {
    const { loading: loadingHighlight, data: highlightData } = useQuery(GET_MOVIE, {
        variables: { id: 2 },
    });

    const { loading: loadingTopRated, data: topRatedData } = useQuery(GET_TOP_RATED);

    const triggerAnimation = (id) => {
        const boxes = document.querySelectorAll(`#${id} .placeholder-box`);
        boxes.forEach((box) => box.classList.add("moving"));
        setTimeout(() => boxes.forEach((box) => box.classList.remove("moving")), 400);
    };

    const scroll = (id, dir) => {
        triggerAnimation(id);
        const container = document.getElementById(id);
        const scrollAmount = 180 * 4;
        container.scrollBy({
            left: dir === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    const highlightMovie = highlightData?.getMovie;
    const highlightImages = movieImages[highlightMovie?.id] || {};

    const topRatedMovies = topRatedData?.sortMovieByBetterReviewPoint || [];

    return (
        <div className="home-container">
            {/* Highlight Section */}
            <div className="highlight-section">
                <div className="highlight-left">
                    <h1 className="welcome-title">WELCOME!</h1>
                    <Link to={`/movie/${highlightMovie?.id || ""}`} className="static-heading">
                        FAN FAVOURITE THIS WEEK
                    </Link>

                    <div className="movie-info">
                        <div
                            className="mini-poster"
                            style={{
                                backgroundImage: `url(${highlightImages.poster})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></div>
                        <div className="movie-details">
                            <Link to={`/movie/${highlightMovie?.id || ""}`} className="movie-title">
                                {loadingHighlight ? "Loading..." : highlightMovie?.title || "No title found"}
                            </Link>
                            <p className="movie-description">
                                {loadingHighlight
                                    ? "Loading movie description..."
                                    : highlightMovie?.description || "No description available."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sağ banner */}
                <div className="highlight-right">
                    <div
                        className="highlight-image"
                        style={{
                            backgroundImage: `url(${highlightImages.banner})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>
                </div>
            </div>

            {/* What is Next (şimdilik placeholder) */}
            <h2 className="section-title-home">WHAT IS NEXT?</h2>
            <div className="carousel-container">
                <button className="carousel-btn left" onClick={() => scroll("next-carousel", "left")}>
                    &lt;
                </button>
                <div id="next-carousel" className="carousel">
                    {Array(18)
                        .fill(null)
                        .map((_, i) => (
                            <div key={i} className="placeholder-box"></div>
                        ))}
                </div>
                <button className="carousel-btn right" onClick={() => scroll("next-carousel", "right")}>
                    &gt;
                </button>
            </div>

            {/* Top Rated Movies (dinamik, poster tabanlı) */}
            <h2 className="section-title-home">TOP RATED MOVIES</h2>
            <div className="carousel-container">
                <button className="carousel-btn left" onClick={() => scroll("top-carousel", "left")}>
                    &lt;
                </button>
                <div id="top-carousel" className="carousel">
                    {loadingTopRated
                        ? Array(10)
                            .fill(null)
                            .map((_, i) => <div key={i} className="placeholder-box"></div>)
                        : topRatedMovies.map((movie) => {
                            const poster = movieImages[movie.id]?.poster || "";
                            return (
                                <Link
                                    to={`/movie/${movie.id}`}
                                    key={movie.id}
                                    className="placeholder-box"
                                    style={{
                                        backgroundImage: `url(${poster})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                ></Link>
                            );
                        })}
                </div>
                <button className="carousel-btn right" onClick={() => scroll("top-carousel", "right")}>
                    &gt;
                </button>
            </div>
        </div>
    );
}
