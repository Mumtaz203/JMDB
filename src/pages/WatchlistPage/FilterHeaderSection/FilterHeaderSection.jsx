import React from 'react';
import { SlidersHorizontal, ArrowUpNarrowWide } from 'lucide-react';

const FilterHeaderSection = ({ 
    movieCount, 
    filterText, 
    onFilterChange, 
    sortCriteria, 
    onSortChange,
    showFilterDropdown,
    setShowFilterDropdown,
    toogleSortDropdown,
    showSortDropdown,
    setShowSortDropdown
}) => {
    return (
        <div className="bg-transparent border-b border-[#3abdff] pb-4 mb-8 flex items-center justify-between">
            <div className="text-[#838383] text-base font-semibold">{movieCount} movies</div>

            <div className="flex items-center space-x-6"> 
                <div className="relative">
                    <button 
                        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                        className="flex items-center text-[#3abdff] hover:text-[#4eb0e6] transition-colors"
                    >
                        <SlidersHorizontal size={20} className="mr-1" /> 
                        <span className="text-sm font-medium [font-family:'Montserrat',Helvetica]">Filter</span>
                    </button>
                    {showFilterDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#2A2A2A] rounded-md shadow-lg py-1 z-10">
                            <input
                                type="text"
                                placeholder="Filter by movie title..."
                                value={filterText}
                                onChange={onFilterChange}
                                className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button 
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className="flex items-center text-[#3abdff] hover:text-[#4eb0e6] transition-colors"
                    >
                        <ArrowUpNarrowWide size={20} className="mr-1" /> 
                        <span className="text-sm font-medium [font-family:'Montserrat',Helvetica]">Sort by</span>
                    </button>
                    {showSortDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#2A2A2A] rounded-md shadow-lg py-1 z-10">
                            <button 
                                onClick={() => onSortChange('title_asc')}
                                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                            >
                                Title (A-Z)
                            </button>
                            <button 
                                onClick={() => onSortChange('title_desc')}
                                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                            >
                                Title (Z-A)
                            </button>
                            <button 
                                onClick={() => onSortChange('rating_desc')}
                                className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                            >
                                Rating (High to Low)
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export { FilterHeaderSection };
