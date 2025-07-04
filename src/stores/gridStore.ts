
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GridPreferences } from '../types/smartGrid';

interface GridState {
  // Grid preferences per user and grid ID
  preferences: Record<string, GridPreferences>;
  
  // UI state per grid
  editingCell: Record<string, { rowIndex: number; columnKey: string } | null>;
  expandedRows: Record<string, Set<number>>;
  selectedRows: Record<string, Set<number>>;
  
  // View modes
  viewModes: Record<string, 'table' | 'card'>;
  showColumnFilters: Record<string, boolean>;
  showCheckboxes: Record<string, boolean>;
}

interface GridActions {
  // Preferences
  setPreferences: (gridId: string, preferences: GridPreferences) => void;
  updateColumnOrder: (gridId: string, columnOrder: string[]) => void;
  toggleColumnVisibility: (gridId: string, columnId: string) => void;
  updateColumnWidth: (gridId: string, columnId: string, width: number) => void;
  updateColumnHeader: (gridId: string, columnId: string, header: string) => void;
  
  // Cell editing
  setEditingCell: (gridId: string, cell: { rowIndex: number; columnKey: string } | null) => void;
  
  // Row management
  toggleRowExpansion: (gridId: string, rowIndex: number) => void;
  toggleRowSelection: (gridId: string, rowIndex: number) => void;
  selectAllRows: (gridId: string, rowCount: number) => void;
  clearSelection: (gridId: string) => void;
  
  // UI state
  setViewMode: (gridId: string, mode: 'table' | 'card') => void;
  toggleColumnFilters: (gridId: string) => void;
  toggleCheckboxes: (gridId: string) => void;
  
  // Utilities
  getPreferences: (gridId: string) => GridPreferences;
  resetPreferences: (gridId: string, columns: any[]) => void;
}

const createDefaultPreferences = (columns: any[] = []): GridPreferences => ({
  columnOrder: columns.map(col => col.key || col.id),
  hiddenColumns: [],
  columnWidths: {},
  columnHeaders: {},
  columnTitles: {},
  subRowColumns: [],
  subRowColumnOrder: [],
  sortBy: '',
  sortDirection: 'asc',
  filters: []
});

export const useGridStore = create<GridState & GridActions>()(
  persist(
    (set, get) => ({
      // Initial state
      preferences: {},
      editingCell: {},
      expandedRows: {},
      selectedRows: {},
      viewModes: {},
      showColumnFilters: {},
      showCheckboxes: {},
      
      // Actions
      setPreferences: (gridId, preferences) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            [gridId]: preferences
          }
        }));
        console.log('⚙️ Set preferences for grid:', gridId, preferences);
      },
      
      updateColumnOrder: (gridId, columnOrder) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            [gridId]: {
              ...state.preferences[gridId],
              columnOrder
            }
          }
        }));
        console.log('🔄 Updated column order for grid:', gridId, columnOrder);
      },
      
      toggleColumnVisibility: (gridId, columnId) => {
        set((state) => {
          const prefs = state.preferences[gridId] || createDefaultPreferences();
          const hiddenColumns = prefs.hiddenColumns.includes(columnId)
            ? prefs.hiddenColumns.filter(id => id !== columnId)
            : [...prefs.hiddenColumns, columnId];
          
          return {
            preferences: {
              ...state.preferences,
              [gridId]: {
                ...prefs,
                hiddenColumns
              }
            }
          };
        });
        console.log('👁️ Toggled column visibility for grid:', gridId, 'column:', columnId);
      },
      
      updateColumnWidth: (gridId, columnId, width) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            [gridId]: {
              ...state.preferences[gridId],
              columnWidths: {
                ...state.preferences[gridId]?.columnWidths,
                [columnId]: width
              }
            }
          }
        }));
      },
      
      updateColumnHeader: (gridId, columnId, header) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            [gridId]: {
              ...state.preferences[gridId],
              columnHeaders: {
                ...state.preferences[gridId]?.columnHeaders,
                [columnId]: header
              }
            }
          }
        }));
        console.log('📝 Updated column header for grid:', gridId, 'column:', columnId, 'header:', header);
      },
      
      setEditingCell: (gridId, cell) => {
        set((state) => ({
          editingCell: {
            ...state.editingCell,
            [gridId]: cell
          }
        }));
      },
      
      toggleRowExpansion: (gridId, rowIndex) => {
        set((state) => {
          const expandedRows = new Set(state.expandedRows[gridId] || []);
          if (expandedRows.has(rowIndex)) {
            expandedRows.delete(rowIndex);
          } else {
            expandedRows.add(rowIndex);
          }
          
          return {
            expandedRows: {
              ...state.expandedRows,
              [gridId]: expandedRows
            }
          };
        });
      },
      
      toggleRowSelection: (gridId, rowIndex) => {
        set((state) => {
          const selectedRows = new Set(state.selectedRows[gridId] || []);
          if (selectedRows.has(rowIndex)) {
            selectedRows.delete(rowIndex);
          } else {
            selectedRows.add(rowIndex);
          }
          
          return {
            selectedRows: {
              ...state.selectedRows,
              [gridId]: selectedRows
            }
          };
        });
      },
      
      selectAllRows: (gridId, rowCount) => {
        set((state) => ({
          selectedRows: {
            ...state.selectedRows,
            [gridId]: new Set(Array.from({ length: rowCount }, (_, i) => i))
          }
        }));
      },
      
      clearSelection: (gridId) => {
        set((state) => ({
          selectedRows: {
            ...state.selectedRows,
            [gridId]: new Set()
          }
        }));
      },
      
      setViewMode: (gridId, mode) => {
        set((state) => ({
          viewModes: {
            ...state.viewModes,
            [gridId]: mode
          }
        }));
        console.log('👁️ Set view mode for grid:', gridId, 'mode:', mode);
      },
      
      toggleColumnFilters: (gridId) => {
        set((state) => ({
          showColumnFilters: {
            ...state.showColumnFilters,
            [gridId]: !state.showColumnFilters[gridId]
          }
        }));
      },
      
      toggleCheckboxes: (gridId) => {
        set((state) => ({
          showCheckboxes: {
            ...state.showCheckboxes,
            [gridId]: !state.showCheckboxes[gridId]
          }
        }));
      },
      
      // Utilities
      getPreferences: (gridId) => {
        return get().preferences[gridId] || createDefaultPreferences();
      },
      
      resetPreferences: (gridId, columns) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            [gridId]: createDefaultPreferences(columns)
          }
        }));
        console.log('🔄 Reset preferences for grid:', gridId);
      }
    }),
    {
      name: 'grid-store',
      partialize: (state) => ({
        preferences: state.preferences,
        viewModes: state.viewModes
      })
    }
  )
);

// Selectors for better performance
export const useGridPreferences = (gridId: string) => 
  useGridStore(state => state.preferences[gridId] || createDefaultPreferences());

export const useGridEditingCell = (gridId: string) => 
  useGridStore(state => state.editingCell[gridId]);

export const useGridExpandedRows = (gridId: string) => 
  useGridStore(state => state.expandedRows[gridId] || new Set());

export const useGridSelectedRows = (gridId: string) => 
  useGridStore(state => state.selectedRows[gridId] || new Set());

export const useGridViewMode = (gridId: string) => 
  useGridStore(state => state.viewModes[gridId] || 'table');

export const useGridShowColumnFilters = (gridId: string) => 
  useGridStore(state => state.showColumnFilters[gridId] || false);

export const useGridShowCheckboxes = (gridId: string) => 
  useGridStore(state => state.showCheckboxes[gridId] || false);
