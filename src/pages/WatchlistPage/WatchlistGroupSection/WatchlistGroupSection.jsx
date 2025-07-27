import React from 'react';

const WatchlistGroupSection = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-white mb-4">Your lists <span className="text-blue-400 ml-2">&gt;</span></h2>
      <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-base font-medium">
        <span className="text-2xl mr-2">+</span>
        Create a list
      </button>
    </div>
  );
};

export { WatchlistGroupSection };
