import React, { useRef, useState, useEffect } from 'react';
import { SmallMovieCard } from '../../../components/SmallMovieCard';

const mockTopMovies = [
  {
    id: 1, title: "The Last of Us", rating: "9.0", imageUrl: "/images/the-last-of-us-poster.jpg"
  },
  {
    id: 2, title: "Mobland", rating: "8.6", imageUrl: "/images/mobland-poster.jpg"
  },
  {
    id: 3, title: "Sinners", rating: "8.0", imageUrl: "/images/sinners-poster.jpg"
  },
  {
    id: 4, title: "Breaking Bad", rating: "9.5", imageUrl: "/images/breaking-bad-poster.jpg"
  }
];

const ExploreMoreWrapperSection = () => {
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
      <h2 className="text-xl font-bold text-white mb-4">Top 10 on this week</h2>
      <div 
        ref={scrollRef} 
        className="flex flex-nowrap overflow-x-auto gap-4 py-2 hide-scrollbar"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {mockTopMovies.map(movie => (
          <SmallMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export { ExploreMoreWrapperSection };
