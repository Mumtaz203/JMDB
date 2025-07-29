// src/pages/Watchlist/Watchlist.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { WatchlistHeaderSection } from './WatchlistHeaderSection/WatchlistHeaderSection';
import { WatchlistGroupSection } from './WatchlistGroupSection/WatchlistGroupSection';
import { FilterHeaderSection } from './FilterHeaderSection/FilterHeaderSection';
import ListedMoviesSection from './ListedMoviesSection/ListedMoviesSection';
import { ExploreMoreSection } from './ExploreMoreSection/ExploreMoreSection';
import { ExploreMoreWrapperSection } from './ExploreMoreWrapperSection/ExploreMoreWrapperSection';

// GraphQL Sorguları
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

const Watchlist = () => {
    const [userId, setUserId] = useState(null);
    const [moviesWithDetails, setMoviesWithDetails] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(false); // Yeni yükleme state'i

    useEffect(() => {
        const savedUserId = localStorage.getItem('userId');
        if (savedUserId) {
            setUserId(parseInt(savedUserId));
        }
    }, []);

    const { loading: watchlistLoading, error: watchlistError, data: watchlistData, refetch } = useQuery(GET_USER_WATCHLIST, {
        variables: { userId },
        skip: userId === null,
        fetchPolicy: "network-only"
    });

    const [fetchRanking] = useLazyQuery(GET_MOVIE_AVERAGE_RANKING);
    const [fetchActors] = useLazyQuery(GET_MOVIE_ACTORS);
    const [fetchDirector] = useLazyQuery(GET_DIRECTOR_DETAILS);

    const fetchDetailsForMovies = useCallback(async (movies) => {
        if (!movies || movies.length === 0) {
            setMoviesWithDetails([]);
            return;
        }

        setLoadingDetails(true); // Detaylar yüklenmeye başlarken true yap
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

            const imageUrl = "https://via.placeholder.com/150x225?text=Film+Posteri+Yok";
            const duration = "N/A"; // Eğer backend'den duration almıyorsak

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
        setLoadingDetails(false); // Detaylar yüklendiğinde false yap
    }, [fetchRanking, fetchActors, fetchDirector]);

    useEffect(() => {
        if (userId !== null) {
            refetch(); // UserId değiştiğinde veya mount olduğunda izleme listesini çek
        }
    }, [userId, refetch]);

    useEffect(() => {
        if (watchlistData && watchlistData.showWatchList && !watchlistLoading) {
            // Sadece watchlist verisi ilk geldiğinde veya değiştiğinde detayları çek
            fetchDetailsForMovies(watchlistData.showWatchList);
        }
    }, [watchlistData, watchlistLoading, fetchDetailsForMovies]);

    if (userId === null) {
        return (
            <div className="min-h-screen text-white p-4 sm:p-6 lg:p-8 flex justify-center items-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">İzleme Listesine Hoş Geldiniz</h2>
                    <p className="text-lg">Bu sayfayı kullanmak için önce giriş yapmalısınız.</p>
                </div>
            </div>
        );
    }

    if (watchlistLoading || loadingDetails) { 
        return (
            <div className="min-h-screen text-white p-4 sm:p-6 lg:p-8 flex justify-center items-center">
                <p>İzleme listeniz ve detayları yükleniyor...</p>
            </div>
        );
    }

    if (watchlistError) {
        console.error("İzleme listesi yüklenirken hata:", watchlistError);
        return (
            <div className="min-h-screen text-white p-4 sm:p-6 lg:p-8 flex justify-center items-center">
                <p className="text-red-500">İzleme listenizi yüklerken bir hata oluştu: {watchlistError.message}</p>
            </div>
        );
    }

    const moviesToDisplay = moviesWithDetails;

    return (
        <div className="min-h-screen text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <WatchlistHeaderSection />
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    <div className="flex-grow lg:w-2/3">
                        <FilterHeaderSection />
                        {moviesToDisplay.length > 0 ? (
                            <ListedMoviesSection movies={moviesToDisplay} />
                        ) : (
                            <p className="text-center text-lg mt-8 text-gray-400">İzleme listenizde henüz film bulunmuyor. Film eklemek için film detay sayfalarına göz atın!</p>
                        )}
                    </div>
                    <div className="lg:w-1/3 space-y-6 lg:space-y-8">
                        <ExploreMoreSection />
                        <ExploreMoreWrapperSection />
                        <WatchlistGroupSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Watchlist;