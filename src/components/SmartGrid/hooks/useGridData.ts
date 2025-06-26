
import { useMemo, useCallback } from 'react';
import { GridPreferences } from '../../../types/smartGrid';

interface UseGridDataProps<T> {
  data: T[];
  preferences: GridPreferences;
  currentPage: number;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: Record<string, any>) => void;
}

export const useGridData = <T extends Record<string, any>>({
  data,
  preferences,
  currentPage,
  onSort,
  onFilter,
}: UseGridDataProps<T>) => {
  const sortData = useCallback((items: T[], sortBy: string, direction: 'asc' | 'desc') => {
    if (!sortBy) return items;
    
    return [...items].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (aVal === bVal) return 0;
      
      const comparison = aVal < bVal ? -1 : 1;
      return direction === 'asc' ? comparison : -comparison;
    });
  }, []);

  const filterData = useCallback((items: T[], filters: Record<string, any>) => {
    return items.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === '') return true;
        
        const itemValue = item[key];
        if (typeof itemValue === 'string') {
          return itemValue.toLowerCase().includes(value.toLowerCase());
        }
        
        return itemValue === value;
      });
    });
  }, []);

  const processedData = useMemo(() => {
    let result = [...data];
    
    // Apply filters
    result = filterData(result, preferences.filters);
    
    // Apply sorting
    result = sortData(result, preferences.sortBy, preferences.sortDirection);
    
    // Apply pagination
    const startIndex = (currentPage - 1) * preferences.pageSize;
    const endIndex = startIndex + preferences.pageSize;
    const paginatedData = result.slice(startIndex, endIndex);
    
    return {
      filteredData: result,
      paginatedData,
    };
  }, [data, preferences, currentPage, filterData, sortData]);

  const updateSort = useCallback((column: string, direction: 'asc' | 'desc') => {
    if (onSort) {
      onSort(column, direction);
    }
  }, [onSort]);

  const updateFilters = useCallback((filters: Record<string, any>) => {
    if (onFilter) {
      onFilter(filters);
    }
  }, [onFilter]);

  return {
    processedData,
    sortData,
    filterData,
    updateSort,
    updateFilters,
  };
};
