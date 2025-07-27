import React, { useRef, useState, useEffect } from 'react';
import { SmallMovieCard } from '../../../components/SmallMovieCard';

const mockExploreMovies = [
  {
    id: 1, title: "Gladiator", rating: "8.5", imageUrl: "/images/gladiator-poster.jpg" 
  },
  {
    id: 2, title: "Forrest Gump", rating: "8.8", imageUrl: "/images/forrest-gump-poster.jpg" 
  },
  {
    id: 3, title: "Pulp Fiction", rating: "8.9", imageUrl: "/images/pulp-fiction-poster.jpg" 
  },
  {
    id: 4, title: "The Matrix", rating: "8.7", imageUrl: "/images/the-matrix-poster.jpg"
  },
  {
    id: 5, title: "Inception", rating: "8.8", imageUrl: "/images/inception-poster.jpg"
  }
];

const ExploreMoreSection = () => {
  const scrollRef = useRef(null); 
  const [isDragging, setIsDragging] = useState(false); 
  const [startX, setStartX] = useState(0); 
  const [scrollLeft, setScrollLeft] = useState(0);


  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing'; 
  };


  const handleMouseUp = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
  };


  const handleMouseLeave = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab'; 
  };


  const handleMouseMove = (e) => {
    if (!isDragging) return; 
    e.preventDefault(); 
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-white mb-4">Explore more</h2>
      
      <div 
        ref={scrollRef} 
        className="flex flex-nowrap overflow-x-auto gap-4 py-2 hide-scrollbar"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {mockExploreMovies.map(movie => (
          <SmallMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export { ExploreMoreSection };
