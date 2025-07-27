import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/HomePage/Home";
import Actors from "./pages/ActressesPage/Actors";
import MovieDetails from "./pages/MoviePage/MovieDetails";
import SignInPage from "./pages/SignInPage/SignInPage";
import Watchlist from "./pages/WatchlistPage/Watchlist";
import CreateAcc from "./pages/CreateAccPage/CreateAcc";

function Layout() {
    const location = useLocation();

    // Bu sayfalarda Header gizlenecek:
    const hideHeader = location.pathname === "/signin" || location.pathname === "/createacc";

    return (
        <>
            {!hideHeader && <Header />}
            <div style={{ padding: "20px" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/actors" element={<Actors />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/watchlist" element={<Watchlist />} />
                    <Route path="/createacc" element={<CreateAcc />} />
                </Routes>
            </div>
        </>
    );
}

function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
