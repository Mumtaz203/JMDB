
import React from 'react';
import { MovieCard } from '../../../components/MovieCard';

const ListedMoviesSection = ({ movies }) => {
    const moviesToDisplay = movies || [];

    return (
        <section className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">İzleme Listemdeki Filmler</h2>
            <div className="movie-list-container">
                {moviesToDisplay.length > 0 ? (
                    moviesToDisplay.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p className="text-center text-lg mt-8 text-gray-400">İzleme listenizde film bulunmuyor.</p>
                )}
            </div>
        </section>
    );
};

export default ListedMoviesSection;