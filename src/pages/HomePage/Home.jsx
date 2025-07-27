import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
    const placeholders = Array(18).fill(null);

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
        const scrollAmount = 180 * 4; // 4 afiş kaydır
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    };

    const scrollRight = (id) => {
        triggerAnimation(id);
        const container = document.getElementById(id);
        const scrollAmount = 180 * 4;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <div className="home-container">
            {/* Highlight Bölümü */}
            <div className="highlight-section">
                {/* Sol sabit metin ve poster */}
                <div className="highlight-left">
                    <h1 className="welcome-title">WELCOME!</h1>
                    <Link to="/movie/:id" className="static-heading">FAN FAVOURITE THIS WEEK</Link>

                    <div className="movie-info">
                        <div className="mini-poster"></div>
                        <div className="movie-details">
                            <Link to="/movie/:id" className="movie-title">Kung Fu Panda 4 (2024)</Link>
                            <p className="movie-description">
                                Placeholder tanıtım metni. Bu alan haftalık olarak güncellenen film özetiyle değişir.
                                Film hakkında kısa bilgi burada yer alır.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sağ büyük görsel */}
                <div className="highlight-right">
                    <div className="highlight-image"></div>
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
                    {placeholders.map((_, i) => (
                        <div key={i} className="placeholder-box"></div>
                    ))}
                </div>
                <button className="carousel-btn right" onClick={() => scrollRight("top-carousel")}>&gt;</button>
            </div>
        </div>
    );
}