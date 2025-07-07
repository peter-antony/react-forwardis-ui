
import React, { useState } from 'react';
import { GridColumn, GridPreferences } from '../../types/smartGrid';
import { Button } from '../ui/button';
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react';

interface GridHeaderProps<T> {
  columns: GridColumn<T>[];
  preferences: GridPreferences;
  onSort: (column: string, direction: 'asc' | 'desc') => void;
  onColumnReorder: (draggedId: string, targetId: string) => void;
  onSelectAll: (checked: boolean) => void;
  selectedAll: boolean;
  indeterminate: boolean;
}

export function GridHeader<T>({
  columns,
  preferences,
  onSort,
  onColumnReorder,
  onSelectAll,
  selectedAll,
  indeterminate,
}: GridHeaderProps<T>) {
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);

  const handleDragStart = (columnKey: string) => {
    setDraggedColumn(columnKey);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnKey: string) => {
    e.preventDefault();
    if (draggedColumn && draggedColumn !== targetColumnKey) {
      onColumnReorder(draggedColumn, targetColumnKey);
    }
    setDraggedColumn(null);
  };

  const getSortIcon = (columnKey: string) => {
    if (preferences.sortBy !== columnKey) return null;
    return preferences.sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="w-12 px-4 py-3">
          <input
            type="checkbox"
            checked={selectedAll}
            ref={(input) => {
              if (input) input.indeterminate = indeterminate;
            }}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </th>
        {columns.map((column) => {
          const columnKey = String(column.key);
          const currentTitle = preferences.columnTitles[columnKey] || column.title;
          
          return (
            <th
              key={columnKey}
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 last:border-r-0"
              style={{ width: preferences.columnWidths[columnKey] || column.width }}
              draggable
              onDragStart={() => handleDragStart(columnKey)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, columnKey)}
            >
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                <span className="flex-1">{currentTitle}</span>
                {column.sortable && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto"
                    onClick={() => {
                      const newDirection = preferences.sortBy === columnKey && preferences.sortDirection === 'asc' ? 'desc' : 'asc';
                      onSort(columnKey, newDirection);
                    }}
                  >
                    {getSortIcon(columnKey)}
                  </Button>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
