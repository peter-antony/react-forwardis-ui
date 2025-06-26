
import { useState, useEffect, useMemo, useCallback } from 'react';

interface UseGridSelectionProps<T> {
  data: T[];
  selectedRows: string[];
  onRowSelectionChange?: (selectedIds: string[]) => void;
  rowKey: string | ((record: T) => string);
}

export const useGridSelection = <T extends Record<string, any>>({
  data,
  selectedRows,
  onRowSelectionChange,
  rowKey,
}: UseGridSelectionProps<T>) => {
  const [internalSelection, setInternalSelection] = useState<string[]>(selectedRows);

  useEffect(() => {
    setInternalSelection(selectedRows);
  }, [selectedRows]);

  const getRowKey = useCallback((record: T): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return String(record[rowKey]);
  }, [rowKey]);

  const dataKeys = useMemo(() => {
    return data.map(getRowKey);
  }, [data, getRowKey]);

  const selection = useMemo(() => {
    const selectedAll = dataKeys.length > 0 && dataKeys.every(key => internalSelection.includes(key));
    const indeterminate = internalSelection.length > 0 && !selectedAll;
    
    return {
      selectedRows: internalSelection,
      selectedAll,
      indeterminate,
    };
  }, [internalSelection, dataKeys]);

  const handleSelectAll = useCallback((checked: boolean) => {
    const newSelection = checked ? dataKeys : [];
    setInternalSelection(newSelection);
    onRowSelectionChange?.(newSelection);
  }, [dataKeys, onRowSelectionChange]);

  const handleSelectRow = useCallback((rowId: string, checked: boolean) => {
    const newSelection = checked
      ? [...internalSelection, rowId]
      : internalSelection.filter(id => id !== rowId);
    
    setInternalSelection(newSelection);
    onRowSelectionChange?.(newSelection);
  }, [internalSelection, onRowSelectionChange]);

  const clearSelection = useCallback(() => {
    setInternalSelection([]);
    onRowSelectionChange?.([]);
  }, [onRowSelectionChange]);

  return {
    selection,
    handleSelectAll,
    handleSelectRow,
    clearSelection,
  };
};
