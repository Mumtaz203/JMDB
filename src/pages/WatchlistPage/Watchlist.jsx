import React from 'react';
import { WatchlistHeaderSection } from './WatchlistHeaderSection/WatchlistHeaderSection';
import { WatchlistGroupSection } from './WatchlistGroupSection/WatchlistGroupSection';
import { FilmListSection } from './FilmListSection/FilmListSection';
import { FilterHeaderSection } from './FilterHeaderSection/FilterHeaderSection';
import { ListedMoviesSection } from './ListedMoviesSection/ListedMoviesSection';
import { ExploreMoreSection } from './ExploreMoreSection/ExploreMoreSection';
import { ExploreMoreWrapperSection } from './ExploreMoreWrapperSection/ExploreMoreWrapperSection';


function Watchlist() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <WatchlistHeaderSection />
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-grow lg:w-2/3">
            <FilterHeaderSection /> 
            <FilmListSection /> 
            <ListedMoviesSection /> 
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
}

export default Watchlist;
