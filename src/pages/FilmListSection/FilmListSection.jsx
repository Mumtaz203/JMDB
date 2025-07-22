import React from 'react';
import { MovieCard } from '../../components/MovieCard';

const mockMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    year: "2008",
    duration: "2h 32m",
    rating: "9.0",
    description: "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
    director: "Christopher Nolan",
    stars: [
      { name: "Christian Bale", link: "https://www.imdb.com/name/nm0000093/?ref_=tt_ov_st_1" },
      { name: "Heath Ledger", link: "https://www.imdb.com/name/nm0000093/?ref_=tt_ov_st_1" },
      { name: "Aaron Eckhart", link: "https://www.imdb.com/name/nm0001570/?ref_=tt_ov_st_2" },
    ],
    imageUrl: "/images/dark-knight-poster.jpg" 
  },
  { 
    id: 2,
    title: "Fight Club",
    year: "1999",
    duration: "2h 19m",
    rating: "8.8",
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    director: "David Fincher",
    stars: "Brad Pitt, Edward Norton, Helena Bonham Carter",
    imageUrl: "/images/fight-club-poster.jpg" 
  },
  {
    id: 3,
    title: "Interstellar",
    year: "2014",
    duration: "2h 49m",
    rating: "8.7",
    description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked with piloting a spacecraft.",
    director: "Christopher Nolan",
    stars: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    imageUrl: "/images/interstellar-poster.jpg" 
  }
];

export const FilmListSection = () => {
  return (
    <div className="p-6 mb-8 space-y-4">
      {mockMovies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
