import React from 'react';
import { MovieCard } from '../../components/MovieCard';

const mockMoviesListed = [
  {
    id: 4,
    title: "Inception",
    year: "2010",
    duration: "2h 28m",
    rating: "8.8",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    director: "Christopher Nolan",
    stars: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    imageUrl: "/images/inception-poster.jpg" 
  },
  {
    id: 5,
    title: "Pulp Fiction",
    year: "1994",
    duration: "2h 34m",
    rating: "8.9",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    director: "Quentin Tarantino",
    stars: "John Travolta, Uma Thurman, Samuel L. Jackson",
    imageUrl: "/images/pulp-fiction-poster.jpg"
  }
];

const ListedMoviesSection = () => {
  return (

    <div className="p-6 mb-8 space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Ek Filmler</h2>
      {mockMoviesListed.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export { ListedMoviesSection };
