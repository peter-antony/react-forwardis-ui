
import React from 'react';
import { Search, Clock, Star } from 'lucide-react';

interface SearchDropdownProps {
  onClose: () => void;
  onSelect: (value: string) => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({ onClose, onSelect }) => {
  const recentSearches = ['CUS00000001', 'Confirmed', 'Pending'];
  const favorites = ['Trip Details', 'Vehicle Trip', 'Passenger Count', 'Destination', 'Estimated Arrival'];

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
      <div className="p-3">
        <div className="mb-3">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
            <Clock className="w-3 h-3" />
            Recent Search
          </div>
          <div className="space-y-1">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className="flex items-center gap-2 w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded"
                onClick={() => onSelect(search)}
              >
                <Search className="w-3 h-3 text-gray-400" />
                {search}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
            <Star className="w-3 h-3" />
            Favourites
          </div>
          <div className="space-y-1">
            {favorites.map((favorite, index) => (
              <button
                key={index}
                className="flex items-center gap-2 w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded"
                onClick={() => onSelect(favorite)}
              >
                <Star className="w-3 h-3 text-gray-400" />
                {favorite}
                {index === 0 && <span className="ml-auto text-xs text-gray-400">...</span>}
              </button>
            ))}
          </div>
          <button className="text-blue-600 text-sm mt-2 hover:underline">
            Show More →
          </button>
        </div>
      </div>
    </div>
  );
};
