
import React, { useState } from 'react';
import { Search, Filter, Download, MoreHorizontal, CheckSquare } from 'lucide-react';
import { Button } from '../../atoms/Button/Button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SearchDropdown } from '../SearchDropdown/SearchDropdown';
import { AdvancedFilters } from '../AdvancedFilters/AdvancedFilters';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilters: string[];
  onFiltersChange: (filters: string[]) => void;
  showAdvancedFilters: boolean;
  onToggleAdvancedFilters: (show: boolean) => void;
  selectedRowsCount: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedFilters,
  onFiltersChange,
  showAdvancedFilters,
  onToggleAdvancedFilters,
  selectedRowsCount,
}) => {
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const clearFilter = (filter: string) => {
    onFiltersChange(selectedFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    onFiltersChange([]);
    onSearchChange('');
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Main Search and Action Bar */}
      <div className="flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setShowSearchDropdown(true)}
              className="pl-10 pr-4"
            />
          </div>
          {showSearchDropdown && (
            <SearchDropdown
              onClose={() => setShowSearchDropdown(false)}
              onSelect={(value) => {
                onSearchChange(value);
                setShowSearchDropdown(false);
              }}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>

          <Button variant="default" size="sm">
            <CheckSquare className="w-4 h-4 mr-2" />
            Bulk Actions
          </Button>

          <Button variant="outline" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {selectedFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {filter}
              <button
                onClick={() => clearFilter(filter)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <AdvancedFilters
          onClose={() => onToggleAdvancedFilters(false)}
          onApply={(filters) => {
            onFiltersChange([...selectedFilters, ...filters]);
            onToggleAdvancedFilters(false);
          }}
        />
      )}

      {/* Selected Items Info */}
      {selectedRowsCount > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <div className="flex items-center justify-between">
            <span className="text-blue-800 text-sm">
              {selectedRowsCount} item{selectedRowsCount > 1 ? 's' : ''} selected
            </span>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
