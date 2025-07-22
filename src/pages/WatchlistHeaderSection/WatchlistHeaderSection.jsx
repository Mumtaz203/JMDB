import React from 'react';

const WatchlistHeaderSection = () => {
  return (
    <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-md mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">Your Watchlist</h1>
      <p className="text-sm text-gray-400 mb-4">Modified 8 seconds ago</p>
      <p className="text-base text-white leading-relaxed">
        Your Watchlist is the meticulously curated universe where your cinematic aspirations reside. 
        It's a testament to your unparalleled taste, a treasure trove of captivating stories, 
        and an ever-evolving journey into the heart of entertainment. 
        Dive in, explore your next obsession, and let your viewing adventure begin!
      </p>
    </div>
  );
};

export { WatchlistHeaderSection };
