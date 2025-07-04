
import { useCallback, useMemo } from 'react';
import { useFilterStore } from '../stores/filterStore';
import { useGridStore } from '../stores/gridStore';
import { GridColumnConfig, FilterConfig } from '../types/smartGrid';
import { FilterValue } from '../types/filterSystem';
import { useDebounce } from './useDebounce';

// Hook to integrate SmartGrid with centralized stores
export function useSmartGridIntegration(gridId: string, columns: GridColumnConfig[]) {
  // Store hooks
  const {
    setActiveFilters,
    updateFilter,
    clearFilters,
    getActiveFilters,
    hasActiveFilters,
    getFilterCount,
    showFilterRow,
    toggleFilterRow
  } = useFilterStore();

  const {
    setPreferences,
    updateColumnOrder,
    toggleColumnVisibility,
    updateColumnWidth,
    updateColumnHeader,
    setEditingCell,
    toggleRowExpansion,
    toggleRowSelection,
    selectAllRows,
    clearSelection,
    setViewMode,
    toggleColumnFilters,
    toggleCheckboxes,
    getPreferences,
    resetPreferences
  } = useGridStore();

  // Get current state
  const activeFilters = getActiveFilters(gridId);
  const preferences = getPreferences(gridId);
  const filterCount = getFilterCount(gridId);
  const hasFilters = hasActiveFilters(gridId);
  const showFilters = showFilterRow[gridId] || false;

  // Debounce filter updates for performance
  const debouncedFilters = useDebounce(activeFilters, 300);

  // Convert FilterValue to legacy FilterConfig format
  const legacyFilters = useMemo((): FilterConfig[] => {
    return Object.entries(debouncedFilters).map(([column, filterValue]) => ({
      column,
      value: filterValue.value,
      operator: filterValue.operator || 'contains'
    }));
  }, [debouncedFilters]);

  // Filter management callbacks
  const handleFilterChange = useCallback((columnKey: string, filter: FilterValue | undefined) => {
    updateFilter(gridId, columnKey, filter);
  }, [gridId, updateFilter]);

  const handleFiltersChange = useCallback((filters: Record<string, FilterValue>) => {
    setActiveFilters(gridId, filters);
  }, [gridId, setActiveFilters]);

  const handleClearFilters = useCallback(() => {
    clearFilters(gridId);
  }, [gridId, clearFilters]);

  // Grid preferences callbacks
  const handleColumnOrderChange = useCallback((newOrder: string[]) => {
    updateColumnOrder(gridId, newOrder);
  }, [gridId, updateColumnOrder]);

  const handleColumnVisibilityToggle = useCallback((columnId: string) => {
    toggleColumnVisibility(gridId, columnId);
  }, [gridId, toggleColumnVisibility]);

  const handleColumnWidthChange = useCallback((columnId: string, width: number) => {
    updateColumnWidth(gridId, columnId, width);
  }, [gridId, updateColumnWidth]);

  const handleColumnHeaderChange = useCallback((columnId: string, header: string) => {
    updateColumnHeader(gridId, columnId, header);
  }, [gridId, updateColumnHeader]);

  // Row management callbacks
  const handleRowExpand = useCallback((rowIndex: number) => {
    toggleRowExpansion(gridId, rowIndex);
  }, [gridId, toggleRowExpansion]);

  const handleRowSelect = useCallback((rowIndex: number) => {
    toggleRowSelection(gridId, rowIndex);
  }, [gridId, toggleRowSelection]);

  const handleSelectAll = useCallback((rowCount: number) => {
    selectAllRows(gridId, rowCount);
  }, [gridId, selectAllRows]);

  const handleClearSelection = useCallback(() => {
    clearSelection(gridId);
  }, [gridId, clearSelection]);

  // UI state callbacks
  const handleViewModeChange = useCallback((mode: 'table' | 'card') => {
    setViewMode(gridId, mode);
  }, [gridId, setViewMode]);

  const handleToggleColumnFilters = useCallback(() => {
    toggleColumnFilters(gridId);
  }, [gridId, toggleColumnFilters]);

  const handleToggleCheckboxes = useCallback(() => {
    toggleCheckboxes(gridId);
  }, [gridId, toggleCheckboxes]);

  const handleToggleFilterRow = useCallback(() => {
    toggleFilterRow(gridId);
  }, [gridId, toggleFilterRow]);

  // Reset all preferences
  const handleResetPreferences = useCallback(() => {
    resetPreferences(gridId, columns);
    clearFilters(gridId);
  }, [gridId, columns, resetPreferences, clearFilters]);

  // Cell editing callbacks
  const handleEditStart = useCallback((rowIndex: number, columnKey: string) => {
    setEditingCell(gridId, { rowIndex, columnKey });
  }, [gridId, setEditingCell]);

  const handleEditEnd = useCallback(() => {
    setEditingCell(gridId, null);
  }, [gridId, setEditingCell]);

  return {
    // State
    activeFilters,
    legacyFilters,
    preferences,
    filterCount,
    hasFilters,
    showFilters,
    
    // Filter actions
    handleFilterChange,
    handleFiltersChange,
    handleClearFilters,
    handleToggleFilterRow,
    
    // Grid preference actions
    handleColumnOrderChange,
    handleColumnVisibilityToggle,
    handleColumnWidthChange,
    handleColumnHeaderChange,
    handleResetPreferences,
    
    // Row actions
    handleRowExpand,
    handleRowSelect,
    handleSelectAll,
    handleClearSelection,
    
    // UI actions
    handleViewModeChange,
    handleToggleColumnFilters,
    handleToggleCheckboxes,
    
    // Cell editing actions
    handleEditStart,
    handleEditEnd,
  };
}
