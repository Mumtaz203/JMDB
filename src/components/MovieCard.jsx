import React from 'react';

const MovieCard = ({ movie }) => {
  const renderStars = () => {
    if (Array.isArray(movie.stars)) {
      return movie.stars.map((star, index) => (
        <React.Fragment key={star.name || index}>
          {star.link ? (
            <a href={star.link} target="_blank" rel="noopener noreferrer" className="underline text-[#3abdff] hover:text-[#4eb0e6]">
              {star.name}
            </a>
          ) : (
            star.name
          )}
          {index < movie.stars.length - 1 && (
            <span className="text-[#3abdff]">&nbsp;&nbsp;</span> 
          )}
        </React.Fragment>
      ));
    }
    return movie.stars;
  };

  return (
    // Film kartları arasında boşluk bırakmak için mb-4
    <div className="bg-[#2A2A2A] p-4 rounded-lg shadow-xl flex flex-col sm:flex-row items-start gap-4 mb-4 relative">
      {/* Movie Poster */}
      <div className="flex-shrink-0 w-full sm:w-auto">
        <img
          src={movie.imageUrl}
          alt={`${movie.title} poster`}
          className="w-full h-auto sm:w-[150px] sm:h-[225px] rounded-lg object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; }} // Şeffaf 1x1 piksel resim
        />
      </div>

      {/* Movie Details */}
      <div className="flex-grow flex flex-col">
        {/* Title and More Options */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="font-bold text-white text-xl md:text-2xl [font-family:'Montserrat',Helvetica] tracking-[0] leading-[normal]">
              {movie.title}
            </h2>
            <p className="text-[#838383] text-[11px] [font-family:'Montserrat',Helvetica] font-normal tracking-[0] leading-[normal] mt-1">
              {movie.year}&nbsp;&nbsp;&nbsp;&nbsp;{movie.duration}
            </p>
          </div>
          <div className="w-6 h-6 flex-shrink-0">
            {/* "More options" ikonu için placeholder.*/}
            <img 
              className="w-5 h-5 cursor-pointer" 
              alt="More options" 
              src="/images/icons/more-options.svg"
              onError={(e) => { e.target.onerror = null; e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; }}
            />
          </div>
        </div>

        {/* Rating and Actions */}
        <div className="flex flex-wrap items-center mt-4 sm:mt-6 gap-3 sm:gap-4">
          {/* Rating */}
          <div className="flex items-center">
            <div className="w-5 h-5 mr-1 flex items-center justify-center">
              {/* Yıldız ikonu için placeholder. */}
              <img 
                className="w-[17px] h-4" 
                alt="StarIcon rating" 
                src="/images/icons/star-icon.svg" 
                onError={(e) => { e.target.onerror = null; e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; }}
              />
            </div>
            <span className="font-extrabold text-[#d2f1ff] text-[13px] [font-family:'Montserrat',Helvetica] tracking-[0] leading-[normal]">
              {movie.rating}
            </span>
          </div>

          {/* Rate Button */}
          {}
          <button 
            type="button"
            className="p-0 h-auto [font-family:'Montserrat',Helvetica] font-extrabold text-[#4eb0e6] text-[13px] tracking-[0] leading-[normal] hover:underline"
          >
            Rate
          </button>

          {/* Add List Button */}
          {}
          <div className="flex items-center">
            <div className="w-5 h-5 mr-1 flex items-center justify-center overflow-hidden">
              {/* Artı ikonu için placeholder. */}
              <img 
                className="w-3 h-3 mt-1 ml-1" 
                alt="Add list icon" 
                src="/images/icons/add-icon.svg"
                onError={(e) => { e.target.onerror = null; e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; }}
              />
            </div>
            <button 
              type="button"
              className="p-0 h-auto [font-family:'Montserrat',Helvetica] font-extrabold text-[#d2f1ff] text-[13px] tracking-[0] leading-[normal] hover:underline"
            >
              Add List
            </button>
          </div>

          {/* Remove Button */}
          {}
          <div className="flex items-center">
            <div className="w-5 h-5 mr-1 flex items-center justify-center">
              {/* Eksi ikonu için placeholder. */}
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
            >
              Remove
            </button>
          </div>
        </div>

        {/* Synopsis */}
        <p className="mt-4 sm:mt-6 [font-family:'Montserrat',Helvetica] font-semibold text-white text-xs tracking-[0] leading-[normal] max-w-[435px]">
          {movie.description}
        </p>

        {/* Director and Stars */}
        <div className="mt-4 [font-family:'Montserrat',Helvetica] text-[8px] tracking-[0] leading-[normal]">
          <span className="font-extrabold text-white">
            Director&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          </span>
          <span className="text-[#3abdff] underline">
            {movie.director}
          </span>
          <span className="font-extrabold text-white">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stars&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="font-extrabold text-[#3abdff]">&nbsp;</span>
          {renderStars()}
        </div>
      </div>
    </div>
  );
};

export { MovieCard };
