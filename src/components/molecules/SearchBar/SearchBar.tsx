
import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setSearchQuery } from '../../../store/slices/uiSlice';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { APP_CONFIG } from '../../../config/app.config';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  className,
}) => {
  const dispatch = useAppDispatch();
  const searchQuery = useTypedSelector(state => state.ui.searchQuery);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = useCallback((query: string) => {
    console.log('🔍 Searching for:', query);
    dispatch(setSearchQuery(query));
    if (onSearch) {
      onSearch(query);
    }
  }, [dispatch, onSearch]);

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (query: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => handleSearch(query), APP_CONFIG.ui.debounceDelay);
      };
    })(),
    [handleSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    console.log('🧹 Clearing search');
    setLocalQuery('');
    handleSearch('');
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <Input
        type="text"
        value={localQuery}
        onChange={handleInputChange}
        placeholder={placeholder}
        icon={<Search className="h-4 w-4" />}
        className="pr-10"
      />
      
      {localQuery && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-1 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
