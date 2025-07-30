import React, { useRef } from 'react';
import { SmallMovieCard } from '../../../components/SmallMovieCard';
import { useQuery, gql } from '@apollo/client';
import { movieImages } from "../../../movieAssets";

const GET_TOP_TEN_MOVIES_QUERY = gql`
  query SortMovieByBetterReviewPoint {
    sortMovieByBetterReviewPoint {
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
  query FindAverageRankingInMovie($movieId: Int!) {
    findAverageRankingInMovie(movieId: $movieId)
  }
`;

const ExploreMoreWrapperSection = () => {
  const scrollRef = useRef(null);

  const { loading, error, data } = useQuery(GET_TOP_TEN_MOVIES_QUERY);
  const allTopMovies = data?.sortMovieByBetterReviewPoint || [];

  const topTenMovies = allTopMovies.slice(0, 10);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return <p className="text-white text-center">Loading Top 10 Movies...</p>;
  if (error) return <p className="text-red-500 text-center">Error loading top 10 movies: {error.message}</p>;

  return (
    <div className="p-6 relative">
      <h2 className="text-xl font-bold text-white mb-4">Top 10 this week</h2>
      
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white p-2 rounded-full z-20 hover:bg-gray-700 focus:outline-none hidden md:block"
        aria-label="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={scrollRef}
        className="flex flex-nowrap overflow-x-auto gap-4 py-2 hide-scrollbar scroll-smooth"
      >
        {topTenMovies.map(movie => (
          <MovieCardWithRatingAndImage key={movie.id} movie={movie} />
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white p-2 rounded-full z-20 hover:bg-gray-700 focus:outline-none hidden md:block"
        aria-label="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const MovieCardWithRatingAndImage = ({ movie }) => {
    const { loading: ratingLoading, error: ratingError, data: ratingData } = useQuery(GET_MOVIE_AVERAGE_RANKING, {
        variables: { movieId: movie.id },
    });

    const imageUrl = movieImages[movie.id]?.poster || "/images/placeholder.png";

    let rating = null;
    if (ratingData && ratingData.findAverageRankingInMovie !== null) {
        rating = ratingData.findAverageRankingInMovie;
    }

    if (ratingLoading) return <SmallMovieCard movie={{ ...movie, imageUrl, rating: null, title: movie.title }} />;
    if (ratingError) {
        console.error(`Error fetching rating for movie ID ${movie.id}:`, ratingError.message);
        return <SmallMovieCard movie={{ ...movie, imageUrl, rating: null, title: movie.title }} />;
    }

    return (
        <SmallMovieCard
            movie={{
                ...movie,
                imageUrl: imageUrl,
                rating: rating
            }}
        />
    );
};

export { ExploreMoreWrapperSection };