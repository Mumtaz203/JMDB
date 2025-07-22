import React from 'react';
import { Star } from 'lucide-react'; 

const SmallMovieCard = ({ movie }) => {
  return (

    <div className="p-2 rounded-lg shadow-md flex flex-col items-center text-center w-[150px] flex-shrink-0 relative">
      {/* Artı ikonu - Sağ üst köşede */}
      <img
        src="/images/icons/add-circle.svg" 
        alt="Add to list"
        className="absolute top-2 right-2 w-6 h-6 cursor-pointer z-10"
        onError={(e) => { e.target.onerror = null; e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; }}
      />

      <img
        src={movie.imageUrl} 
        alt={movie.title}
        className="w-full h-auto rounded-lg object-cover mb-2" 
        onError={(e) => { e.target.onerror = null; e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; }}
      />
      {/* Başlık */}
      <h4 className="text-sm font-semibold text-white truncate w-full">{movie.title}</h4>
      
      {/* Puanlama ve Bilgi İkonu - Alt kısımda yan yana */}
      <div className="flex items-center justify-between w-full mt-1 px-1">
        <div className="flex items-center text-yellow-400 text-xs">
          <Star size={12} fill="currentColor" className="mr-0.5" /> 
          <span className="font-semibold">{movie.rating}</span>
        </div>
        {/* Bilgi ikonu - Sağ alt köşede */}
        <img
          src="/images/icons/info-circle.svg" 
          alt="More info"
          className="w-4 h-4 cursor-pointer"
          onError={(e) => { e.target.onerror = null; e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; }}
        />
      </div>
    </div>
  );
};

export { SmallMovieCard };
