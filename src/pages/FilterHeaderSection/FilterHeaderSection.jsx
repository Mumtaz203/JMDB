import React from 'react';
import { SlidersHorizontal, ArrowUpNarrowWide, Grid, List } from 'lucide-react';

const FilterHeaderSection = () => {
  return (

    <div className="bg-transparent border-b border-[#3abdff] pb-4 mb-8 flex items-center justify-between">

      <div className="text-[#838383] text-base font-semibold">88 movies</div>

      <div className="flex items-center space-x-6"> 
        {/* Filtre butonu */}
        <button className="flex items-center text-[#3abdff] hover:text-[#4eb0e6] transition-colors">
          <SlidersHorizontal size={20} className="mr-1" /> 
          <span className="text-sm font-medium [font-family:'Montserrat',Helvetica]">Filter</span>
        </button>

        {/* Sıralama butonu */}
        <button className="flex items-center text-[#3abdff] hover:text-[#4eb0e6] transition-colors">
          <ArrowUpNarrowWide size={20} className="mr-1" /> 
          <span className="text-sm font-medium [font-family:'Montserrat',Helvetica]">Sort by</span>
        </button>

        {/* Görünüm değiştirme butonları */}
       
        <div className="flex space-x-2">
          <button className="text-[#3abdff] hover:text-[#4eb0e6] transition-colors">
            <List size={20} /> 
          </button>
          <button className="text-[#3abdff] hover:text-[#4eb0e6] transition-colors">
            <Grid size={20} /> 
          </button>
        </div>
      </div>
    </div>
  );
};

export { FilterHeaderSection };
