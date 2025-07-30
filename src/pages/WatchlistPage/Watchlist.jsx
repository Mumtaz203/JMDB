import React, { useEffect, useState, useCallback } from 'react';
import { useQuery, gql, useLazyQuery, useMutation } from '@apollo/client';
import { WatchlistHeaderSection } from './WatchlistHeaderSection/WatchlistHeaderSection';
import { FilterHeaderSection } from './FilterHeaderSection/FilterHeaderSection';
import ListedMoviesSection from './ListedMoviesSection/ListedMoviesSection';
import { ExploreMoreSection } from './ExploreMoreSection/ExploreMoreSection';
import { ExploreMoreWrapperSection } from './ExploreMoreWrapperSection/ExploreMoreWrapperSection';
import { useNavigate } from 'react-router-dom';
import { movieImages } from "../../movieAssets";

const GET_USER_WATCHLIST = gql`
    query GetUserWatchlist($userId: Int!) {
        showWatchList(userId: $userId) {
            id
            title
            releaseDate
            genre
            description
            directorId
        }
    }
`;

const GET_MOVIE_AVERAGE_RANKING = gql`
    query GetMovieAverageRanking($movieId: Int!) {
        findAverageRankingInMovie(movieId: $movieId)
    }
`;

const GET_MOVIE_ACTORS = gql`
    query GetMovieActors($movieId: Int!) {
        showAllActorsInMovie(movieId: $movieId) {
            id
            name
        }
    }
`;

const GET_DIRECTOR_DETAILS = gql`
    query GetDirectorDetails($directorId: Int!) {
        getDirector(id: $directorId) {
            id
            name
        }
    }
`;

const REMOVE_MOVIE_FROM_WATCHLIST_MUTATION = gql`
    mutation RemoveMovieFromWatchList($movieId: Int!, $userId: Int!) {
        removeMovieFromWatchList(movieId: $movieId, userId: $userId) {
            id
            title
        }
    }
`;

const Watchlist = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [moviesWithDetails, setMoviesWithDetails] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const [sortCriteria, setSortCriteria] = useState('none');
    const [filterText, setFilterText] = useState('');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    useEffect(() => {
        const savedUserId = localStorage.getItem('userId');
        if (savedUserId) {
            const parsedUserId = parseInt(savedUserId);
            if (!isNaN(parsedUserId)) {
                setUserId(parsedUserId);
            } else {
                console.error("UserId in localStorage is not a valid number:", savedUserId);
                navigate('/signin');
            }
        } else {
            navigate('/signin');
        }
    }, [navigate]);

    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ text: '', type: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const { loading: watchlistLoading, error: watchlistError, data: watchlistData, refetch } = useQuery(GET_USER_WATCHLIST, {
        variables: { userId },
        skip: userId === null,
        fetchPolicy: "network-only"
    });

    const [fetchRanking] = useLazyQuery(GET_MOVIE_AVERAGE_RANKING);
    const [fetchActors] = useLazyQuery(GET_MOVIE_ACTORS);
    const [fetchDirector] = useLazyQuery(GET_DIRECTOR_DETAILS);

    const [removeMovie, { loading: removingMovie }] = useMutation(REMOVE_MOVIE_FROM_WATCHLIST_MUTATION, {
        onCompleted: (data) => {
            console.log("Movie successfully removed from watchlist. Returned data:", data);
            refetch();
            setMessage({ text: 'Movie was successfully removed from your watchlist!', type: 'success' });
        },
        onError: (error) => {
            console.error("Error while removing movie from watchlist:", error);
            setMessage({ text: `Error while removing movie: ${error.message}`, type: 'error' });
        }
    });

    const fetchDetailsForMovies = useCallback(async (movies) => {
        if (!movies || movies.length === 0) {
            setMoviesWithDetails([]);
            return;
        }

        setLoadingDetails(true);
        const detailedMoviesPromises = movies.map(async (movie) => {
            let averageRanking = null;
            let actors = [];
            let directorName = 'N/A';

            try {
                const { data: rankingData } = await fetchRanking({ variables: { movieId: movie.id } });
                averageRanking = rankingData?.findAverageRankingInMovie;
            } catch (e) {
                console.error(`Error fetching ranking for movie ${movie.id}:`, e.message);
            }

            try {
                const { data: actorsData } = await fetchActors({ variables: { movieId: movie.id } });
                actors = actorsData?.showAllActorsInMovie;
            } catch (e) {
                console.error(`Error fetching actors for movie ${movie.id}:`, e.message);
            }
            
            if (movie.directorId) {
                try {
                    const { data: directorData } = await fetchDirector({ variables: { directorId: movie.directorId } });
                    directorName = directorData?.getDirector?.name || 'N/A';
                } catch (e) {
                    console.error(`Error fetching director for movie ${movie.id}:`, e.message);
                }
            }

            const imageUrl = movieImages[movie.id]?.poster || "/images/placeholder.png";
            const duration = "N/A";

            return {
                ...movie,
                imageUrl, 
                duration,
                averageRanking,
                actors,
                directorName,
            };
        });

        const detailedMovies = await Promise.all(detailedMoviesPromises);
        setMoviesWithDetails(detailedMovies);
        setLoadingDetails(false);
    }, [fetchRanking, fetchActors, fetchDirector]);

    useEffect(() => {
        if (userId !== null) {
            if (watchlistData && watchlistData.showWatchList) {
                fetchDetailsForMovies(watchlistData.showWatchList);
            } else {
                refetch();
            }
        }
    }, [userId, watchlistData, refetch, fetchDetailsForMovies]);

    const handleRemoveMovie = async (movieIdToRemove) => {
        if (userId === null || isNaN(userId)) {
            setMessage({ text: 'Please sign in to remove a movie from your watchlist.', type: 'info' });
            return;
        }
        try {
            await removeMovie({ variables: { movieId: movieIdToRemove, userId: userId } });
        } catch (error) {
            console.error("Error occurred while sending movie removal request:", error);
        }
    };

    const handleRatingSuccessInWatchlist = useCallback(() => {
        if (watchlistData && watchlistData.showWatchList) {
            fetchDetailsForMovies(watchlistData.showWatchList);
        } else {
            refetch();
        }
    }, [watchlistData, fetchDetailsForMovies, refetch]);

    let filteredMovies = moviesWithDetails.filter(movie =>
        movie.title.toLowerCase().includes(filterText.toLowerCase())
    );

    let sortedMovies = [...filteredMovies]; 

    if (sortCriteria === 'title_asc') {
        sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortCriteria === 'title_desc') {
        sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortCriteria === 'rating_desc') {
        sortedMovies.sort((a, b) => (b.averageRanking || 0) - (a.averageRanking || 0));
    }

    const moviesToDisplay = sortedMovies;

    if (userId === null) {
        return (
            <div className="min-h-screen text-white p-4 sm:p-6 lg:p-8 flex justify-center items-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Welcome to Your Watchlist</h2>
                    <p className="text-lg">You need to sign in to use this page.</p>
                </div>
            </div>
        );
    }

    if (watchlistLoading || loadingDetails || removingMovie) {
        return (
            <div className="min-h-screen text-white p-4 sm:p-6 lg:p-8 flex justify-center items-center">
                <p>Loading your watchlist and details...</p>
            </div>
        );
    }

    if (watchlistError) {
        console.error("Error while loading watchlist:", watchlistError);
        return (
            <div className="min-h-screen text-white p-4 sm:p-6 lg:p-8 flex justify-center items-center">
                <p className="text-red-500">An error occurred while loading your watchlist: {watchlistError.message}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {message.text && (
                    <div className={`mb-4 p-3 rounded-lg text-center font-bold
                        ${message.type === 'success' ? 'bg-green-500 text-white' : ''}
                        ${message.type === 'error' ? 'bg-red-500 text-white' : ''}
                        ${message.type === 'info' ? 'bg-blue-500 text-white' : ''}
                    `}>
                        {message.text}
                    </div>
                )}
                <WatchlistHeaderSection />
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    <div className="flex-grow lg:w-2/3">
                        <FilterHeaderSection
                            movieCount={moviesToDisplay.length}
                            filterText={filterText}
                            onFilterChange={(e) => setFilterText(e.target.value)}
                            sortCriteria={sortCriteria}
                            onSortChange={setSortCriteria}
                            showFilterDropdown={showFilterDropdown}
                            setShowFilterDropdown={setShowFilterDropdown}
                            showSortDropdown={showSortDropdown}
                            setShowSortDropdown={setShowSortDropdown}
                        />
                        {moviesToDisplay.length > 0 ? (
                            <ListedMoviesSection 
                                movies={moviesToDisplay} 
                                onRemoveMovie={handleRemoveMovie} 
                                onRatingSuccess={handleRatingSuccessInWatchlist}
                            />
                        ) : (
                            <p className="text-center text-lg mt-8 text-gray-400">Your watchlist is currently empty. Check out movie detail pages to add some!</p>
                        )}
                    </div>
                    <div className="lg:w-1/3 space-y-6 lg:space-y-8">
                        <ExploreMoreSection />
                        <ExploreMoreWrapperSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Watchlist;
