// src/components/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, onRemoveMovie, onRateClick }) => {
  const getReleaseYear = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.getFullYear().toString();
    } catch (e) {
      console.error("Error parsing release date:", e);
      return 'N/A';
    }
  };

  return (
    <div className="bg-[#2A2A2A] p-4 rounded-lg shadow-xl flex flex-col sm:flex-row items-start gap-4 mb-4 relative">
      <div className="flex-shrink-0 w-full sm:w-auto">
        <img
          src={movie.imageUrl}
          alt={`${movie.title} poster`}
          className="w-full h-auto sm:w-[150px] sm:h-[225px] rounded-lg object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; }}
        />
      </div>

      <div className="flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="font-bold text-white text-xl md:text-2xl [font-family:'Montserrat',Helvetica] tracking-[0] leading-[normal]">
              {movie.title}
            </h2>
            <p className="text-[#838383] text-[11px] [font-family:'Montserrat',Helvetica] font-normal tracking-[0] leading-[normal] mt-1">
              {getReleaseYear(movie.releaseDate)}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="w-6 h-6 flex-shrink-0">
            <Link to={`/movie/${movie.id}`}>
            <img
              className="w-5 h-5 cursor-pointer"
              alt="More options"
              src="/images/icons/more-options.svg"
              onError={(e) => { e.target.onerror = null; e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; }}
            />
            </Link>
          </div>
        </div>

       <div className="flex flex-wrap items-center mt-4 sm:mt-6 gap-3 sm:gap-4">
        <div className="flex items-center">
            <div className="w-5 h-5 mr-1 flex items-center justify-center">
                <img
                    className="w-[17px] h-4"
                    alt="StarIcon rating"
                    src="/images/icons/star-icon.svg"
                    onError={(e) => { e.target.onerror = null; e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; }}
                />
            </div>
            <span className="font-extrabold text-[#d2f1ff] text-[13px] [font-family:'Montserrat',Helvetica] tracking-[0] leading-[normal]">
                {movie.averageRanking ? `${movie.averageRanking.toFixed(1)}` : 'N/A'}
            </span>
        </div>

          <button
            type="button"
            onClick={() => {
              console.log('Rate button clicked for movie ID:', movie.id);
              onRateClick && onRateClick(movie.id);
            }}
            className="p-0 h-auto [font-family:'Montserrat',Helvetica] font-extrabold text-[#4eb0e6] text-[13px] tracking-[0] leading-[normal] hover:underline"
          >
            Rate
          </button>

          <div className="flex items-center">
            <div className="w-5 h-5 mr-1 flex items-center justify-center">
              <img
                className="w-3 h-0.5"
                alt="Remove icon"
                src="/images/icons/remove-icon.svg"
                onError={(e) => { e.target.onerror = null; e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; }}
              />
            </div>
            <button
              type="button"
              className="p-0 h-auto [font-family:'Montserrat',Helvetica] font-extrabold text-[#d2f1ff] text-[13px] tracking-[0] leading-[normal] hover:underline"
              onClick={() => onRemoveMovie && onRemoveMovie(movie.id)}
            >
              Remove
            </button>
          </div>
        </div>

        <p className="mt-4 sm:mt-6 [font-family:'Montserrat',Helvetica] font-semibold text-white text-xs tracking-[0] leading-[normal] max-w-[435px]">
          {movie.description}
        </p>

        <div className="mt-4 [font-family:'Montserrat',Helvetica] text-[8px] tracking-[0] leading-[normal]">
          <span className="font-extrabold text-white">
            Director&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          </span>
          <span className="font-extrabold text-[#3abdff]">
            {movie.directorName}
          </span>

            {movie.actors && Array.isArray(movie.actors) && movie.actors.length > 0 ? (
                <React.Fragment>
                    <span className="font-extrabold text-white">&nbsp;&nbsp;&nbsp;&nbsp;Stars&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    {
                        movie.actors.map((actor, index) => (
                            <React.Fragment key={actor.id || index}>
                                <span className="font-extrabold text-[#3abdff]">
                                    {actor.name}
                                </span>
                                {index < movie.actors.length - 1 && (
                                    <span className="font-extrabold text-[#3abdff]">&nbsp;&nbsp;</span>
                                )}
                            </React.Fragment>
                        ))
                    }
                </React.Fragment>
            ) : (
                <span className="font-extrabold text-[#3abdff]">&nbsp;&nbsp;&nbsp;&nbsp;Stars&nbsp;&nbsp;&nbsp;&nbsp;N/A</span>
            )}
        </div>
      </div>
    </div>
  );
};

export { MovieCard };