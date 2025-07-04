
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FilterValue } from '../types/filterSystem';

interface FilterState {
  // Active filters per grid
  activeFilters: Record<string, Record<string, FilterValue>>;
  
  // Saved filter sets per user and grid
  savedFilterSets: Record<string, {
    id: string;
    name: string;
    filters: Record<string, FilterValue>;
    isDefault: boolean;
    createdAt: string;
  }[]>;
  
  // UI state
  showFilterRow: Record<string, boolean>;
  showSubRowFilters: Record<string, boolean>;
}

interface FilterActions {
  // Filter management
  setActiveFilters: (gridId: string, filters: Record<string, FilterValue>) => void;
  updateFilter: (gridId: string, columnKey: string, filter: FilterValue | undefined) => void;
  clearFilters: (gridId: string) => void;
  clearFilter: (gridId: string, columnKey: string) => void;
  
  // Filter sets
  saveFilterSet: (gridId: string, name: string, filters: Record<string, FilterValue>, isDefault?: boolean) => void;
  loadFilterSet: (gridId: string, filterSetId: string) => void;
  deleteFilterSet: (gridId: string, filterSetId: string) => void;
  
  // UI state
  toggleFilterRow: (gridId: string) => void;
  toggleSubRowFilters: (gridId: string) => void;
  
  // Utilities
  getActiveFilters: (gridId: string) => Record<string, FilterValue>;
  hasActiveFilters: (gridId: string) => boolean;
  getFilterCount: (gridId: string) => number;
}

export const useFilterStore = create<FilterState & FilterActions>()(
  persist(
    (set, get) => ({
      // Initial state
      activeFilters: {},
      savedFilterSets: {},
      showFilterRow: {},
      showSubRowFilters: {},
      
      // Actions
      setActiveFilters: (gridId, filters) => {
        set((state) => ({
          activeFilters: {
            ...state.activeFilters,
            [gridId]: filters
          }
        }));
        console.log('🔍 Set active filters for grid:', gridId, filters);
      },
      
      updateFilter: (gridId, columnKey, filter) => {
        set((state) => {
          const gridFilters = state.activeFilters[gridId] || {};
          const newFilters = { ...gridFilters };
          
          if (filter) {
            newFilters[columnKey] = filter;
          } else {
            delete newFilters[columnKey];
          }
          
          return {
            activeFilters: {
              ...state.activeFilters,
              [gridId]: newFilters
            }
          };
        });
        console.log('🔍 Updated filter for grid:', gridId, 'column:', columnKey, 'filter:', filter);
      },
      
      clearFilters: (gridId) => {
        set((state) => ({
          activeFilters: {
            ...state.activeFilters,
            [gridId]: {}
          }
        }));
        console.log('🧹 Cleared all filters for grid:', gridId);
      },
      
      clearFilter: (gridId, columnKey) => {
        set((state) => {
          const gridFilters = state.activeFilters[gridId] || {};
          const newFilters = { ...gridFilters };
          delete newFilters[columnKey];
          
          return {
            activeFilters: {
              ...state.activeFilters,
              [gridId]: newFilters
            }
          };
        });
        console.log('🧹 Cleared filter for grid:', gridId, 'column:', columnKey);
      },
      
      saveFilterSet: (gridId, name, filters, isDefault = false) => {
        const filterSet = {
          id: `${gridId}-${Date.now()}`,
          name,
          filters,
          isDefault,
          createdAt: new Date().toISOString()
        };
        
        set((state) => ({
          savedFilterSets: {
            ...state.savedFilterSets,
            [gridId]: [...(state.savedFilterSets[gridId] || []), filterSet]
          }
        }));
        console.log('💾 Saved filter set for grid:', gridId, 'name:', name);
      },
      
      loadFilterSet: (gridId, filterSetId) => {
        const state = get();
        const filterSets = state.savedFilterSets[gridId] || [];
        const filterSet = filterSets.find(set => set.id === filterSetId);
        
        if (filterSet) {
          set((state) => ({
            activeFilters: {
              ...state.activeFilters,
              [gridId]: filterSet.filters
            }
          }));
          console.log('📂 Loaded filter set for grid:', gridId, 'name:', filterSet.name);
        }
      },
      
      deleteFilterSet: (gridId, filterSetId) => {
        set((state) => ({
          savedFilterSets: {
            ...state.savedFilterSets,
            [gridId]: (state.savedFilterSets[gridId] || []).filter(set => set.id !== filterSetId)
          }
        }));
        console.log('🗑️ Deleted filter set:', filterSetId);
      },
      
      toggleFilterRow: (gridId) => {
        set((state) => ({
          showFilterRow: {
            ...state.showFilterRow,
            [gridId]: !state.showFilterRow[gridId]
          }
        }));
      },
      
      toggleSubRowFilters: (gridId) => {
        set((state) => ({
          showSubRowFilters: {
            ...state.showSubRowFilters,
            [gridId]: !state.showSubRowFilters[gridId]
          }
        }));
      },
      
      // Utilities
      getActiveFilters: (gridId) => {
        return get().activeFilters[gridId] || {};
      },
      
      hasActiveFilters: (gridId) => {
        const filters = get().activeFilters[gridId] || {};
        return Object.keys(filters).length > 0;
      },
      
      getFilterCount: (gridId) => {
        const filters = get().activeFilters[gridId] || {};
        return Object.keys(filters).length;
      }
    }),
    {
      name: 'filter-store',
      partialize: (state) => ({
        activeFilters: state.activeFilters,
        savedFilterSets: state.savedFilterSets
      })
    }
  )
);

// Selectors for better performance
export const useActiveFilters = (gridId: string) => 
  useFilterStore(state => state.activeFilters[gridId] || {});

export const useFilterCount = (gridId: string) => 
  useFilterStore(state => Object.keys(state.activeFilters[gridId] || {}).length);

export const useHasActiveFilters = (gridId: string) => 
  useFilterStore(state => Object.keys(state.activeFilters[gridId] || {}).length > 0);

export const useSavedFilterSets = (gridId: string) => 
  useFilterStore(state => state.savedFilterSets[gridId] || []);
