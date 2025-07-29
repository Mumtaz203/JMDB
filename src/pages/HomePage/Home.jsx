import "./Home.css";
import { Link } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

// GraphQL query – film ID'si ile bir film çek
const GET_MOVIE = gql`
    query GetMovie($id: Int!) {
        getMovie(id: $id) {
            id
            title
            description
        }
    }
`;

const movieImages = {
    2: {
        poster: "images/MovieImages/KungFuPanda/KungfuPanda4min.png",
        banner: "images/MovieImages/KungFuPanda/KungfuPanda4big.png"
    },
};
const topRatedMovies=[
    {
    id:3,
        poster:"images/Superman.png"
    },
    {
        id:4,
        poster:"images/dark-knight-poster.jpg"
    },
    {
        id:5,
        poster:"images/fight-club-poster.jpg"
    }
    ,{
    id:6,
        poster:"images/LordOfTheRingsPoster.png"
    }
    ,{
    id:7,
        poster:"images/TheGodFather.png"
    },
    {
        id:8,
        poster:"images/AngryMan.png"
    },
    {
        id:9,
        poster:"images/Schnidler.png"
    },
    {
        id:10,
        poster:"images/pulp-fiction-poster.jpg"
    },
    {
        id:11,
        poster:"images/forrest-gump-poster.jpg"
    },
    {
        id:12,
        poster:"images/TheMatrix.png"
    },
    {
        id:13,
        poster:"images/interstellar-poster.jpg"
    },
    {
        id:14,
        poster:"images/SlienceOfLambs.png"
    }




]

export default function Home() {
    const placeholders = Array(18).fill(null);

    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: { id: 2 },
    });

    const triggerAnimation = (id) => {
        const boxes = document.querySelectorAll(`#${id} .placeholder-box`);
        boxes.forEach(box => box.classList.add("moving"));
        setTimeout(() => {
            boxes.forEach(box => box.classList.remove("moving"));
        }, 400);
    };

    const scrollLeft = (id) => {
        triggerAnimation(id);
        const container = document.getElementById(id);
        const scrollAmount = 180 * 4;
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    };

    const scrollRight = (id) => {
        triggerAnimation(id);
        const container = document.getElementById(id);
        const scrollAmount = 180 * 4;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    const movie = data?.getMovie;
    const images = movieImages[movie?.id] || {};

    return (
        <div className="home-container">
            {/* Highlight Bölümü */}
            <div className="highlight-section">
                {/* Sol sabit metin ve poster */}
                <div className="highlight-left">
                    <h1 className="welcome-title">WELCOME!</h1>
                    <Link to={`/movie/${movie?.id || ''}`} className="static-heading">
                        FAN FAVOURITE THIS WEEK
                    </Link>

                    <div className="movie-info">
                        <div className="mini-poster" style={{
                            backgroundImage: `url(${images.poster})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}></div>
                        <div className="movie-details">
                            <Link to={`/movie/${movie?.id || ''}`} className="movie-title">
                                {loading ? "Loading..." : movie?.title || "No title found"}
                            </Link>
                            <p className="movie-description">
                                {loading
                                    ? "Loading movie description..."
                                    : movie?.description || "No description available."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sağ büyük görsel */}
                <div className="highlight-right">
                    <div className="highlight-image" style={{
                        backgroundImage: `url(${images.banner})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}></div>
                </div>
            </div>

            {/* What is Next */}
            <h2 className="section-title">WHAT IS NEXT?</h2>
            <div className="carousel-container">
                <button className="carousel-btn left" onClick={() => scrollLeft("next-carousel")}>&lt;</button>
                <div id="next-carousel" className="carousel">
                    {placeholders.map((_, i) => (
                        <div key={i} className="placeholder-box"></div>
                    ))}
                </div>
                <button className="carousel-btn right" onClick={() => scrollRight("next-carousel")}>&gt;</button>
            </div>

            {/* Top Rated Movies */}
            <h2 className="section-title">TOP RATED MOVIES</h2>
            <div className="carousel-container">
                <button className="carousel-btn left" onClick={() => scrollLeft("top-carousel")}>&lt;</button>
                <div id="top-carousel" className="carousel">
                    {topRatedMovies.map((movie) => (
                        <Link
                            to={`/movie/${movie.id}`}
                            key={movie.id}
                            className="placeholder-box"
                            style={{
                                backgroundImage: `url(${movie.poster})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                    ))}
                </div>
                <button className="carousel-btn right" onClick={() => scrollRight("top-carousel")}>&gt;</button>
            </div>

        </div>
    );
}