
import { useState, useEffect, useCallback } from 'react';
import { GridColumn, GridPreferences } from '../../../types/smartGrid';

interface UseGridPreferencesProps<T> {
  columns: GridColumn<T>[];
  defaultSort?: { column: string; direction: 'asc' | 'desc' };
  defaultFilters: Record<string, any>;
  pageSize: number;
  storageKey: string;
  savePreferences?: (preferences: GridPreferences) => void;
  loadPreferences?: () => GridPreferences | null;
}

export const useGridPreferences = <T>({
  columns,
  defaultSort,
  defaultFilters,
  pageSize,
  storageKey,
  savePreferences,
  loadPreferences,
}: UseGridPreferencesProps<T>) => {
  const getInitialPreferences = (): GridPreferences => {
    // Try to load from external source first
    if (loadPreferences) {
      const loaded = loadPreferences();
      if (loaded) return loaded;
    }

    // Try localStorage
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load grid preferences from localStorage:', error);
    }

    // Return defaults
    return {
      columnOrder: columns.map(col => String(col.key)),
      columnWidths: {},
      columnTitles: {},
      hiddenColumns: [],
      sortBy: defaultSort?.column || '',
      sortDirection: defaultSort?.direction || 'asc',
      filters: defaultFilters,
      pageSize,
    };
  };

  const [preferences, setPreferences] = useState<GridPreferences>(getInitialPreferences);

  const updatePreferences = useCallback((updates: Partial<GridPreferences>) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, ...updates };
      
      // Save to external source if provided
      if (savePreferences) {
        savePreferences(newPreferences);
      } else {
        // Save to localStorage
        try {
          localStorage.setItem(storageKey, JSON.stringify(newPreferences));
        } catch (error) {
          console.warn('Failed to save grid preferences to localStorage:', error);
        }
      }
      
      return newPreferences;
    });
  }, [savePreferences, storageKey]);

  const resetPreferences = useCallback(() => {
    const defaultPreferences: GridPreferences = {
      columnOrder: columns.map(col => String(col.key)),
      columnWidths: {},
      columnTitles: {},
      hiddenColumns: [],
      sortBy: defaultSort?.column || '',
      sortDirection: defaultSort?.direction || 'asc',
      filters: defaultFilters,
      pageSize,
    };
    
    setPreferences(defaultPreferences);
    
    if (savePreferences) {
      savePreferences(defaultPreferences);
    } else {
      try {
        localStorage.setItem(storageKey, JSON.stringify(defaultPreferences));
      } catch (error) {
        console.warn('Failed to save reset preferences to localStorage:', error);
      }
    }
  }, [columns, defaultSort, defaultFilters, pageSize, savePreferences, storageKey]);

  return {
    preferences,
    updatePreferences,
    resetPreferences,
  };
};
