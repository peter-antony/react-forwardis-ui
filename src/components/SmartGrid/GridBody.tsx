
import React from 'react';
import { GridColumn } from '../../types/smartGrid';
import { EditableCell } from './EditableCell';

interface GridBodyProps<T> {
  data: T[];
  columns: GridColumn<T>[];
  getRowKey: (record: T) => string;
  selectedRows: string[];
  onSelectRow: (rowKey: string, checked: boolean) => void;
  editingCell: { row: string; column: string } | null;
  onCellEdit: (rowKey: string, columnKey: string, value: any) => void;
  onEditStart: (cell: { row: string; column: string } | null) => void;
  nestedRows: boolean;
  mobileBreakpoint: string;
}

export function GridBody<T>({
  data,
  columns,
  getRowKey,
  selectedRows,
  onSelectRow,
  editingCell,
  onCellEdit,
  onEditStart,
  nestedRows,
  mobileBreakpoint,
}: GridBodyProps<T>) {
  const renderCell = (record: T, column: GridColumn<T>, rowIndex: number) => {
    const rowKey = getRowKey(record);
    const columnKey = String(column.key);
    const value = record[column.key];
    const isEditing = editingCell?.row === rowKey && editingCell?.column === columnKey;

    if (column.render && !isEditing) {
      return column.render(value, record, rowIndex);
    }

    if (column.editable) {
      return (
        <EditableCell
          value={value}
          isEditing={isEditing}
          type={column.type || 'text'}
          options={column.options}
          onEdit={(newValue) => onCellEdit(rowKey, columnKey, newValue)}
          onEditStart={() => onEditStart({ row: rowKey, column: columnKey })}
          onEditEnd={() => onEditStart(null)}
        />
      );
    }

    return <span>{String(value || '')}</span>;
  };

  if (nestedRows) {
    return (
      <tbody>
        {data.map((record, index) => {
          const rowKey = getRowKey(record);
          return (
            <tr key={rowKey} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(rowKey)}
                  onChange={(e) => onSelectRow(rowKey, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td className="px-4 py-3" colSpan={columns.length}>
                <div className={`grid gap-4 ${mobileBreakpoint}:grid-cols-${Math.min(columns.length, 3)}`}>
                  {columns.map((column) => (
                    <div key={String(column.key)} className="space-y-1">
                      <div className="text-xs font-medium text-gray-500">
                        {column.title}
                      </div>
                      <div className="text-sm">
                        {renderCell(record, column, index)}
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((record, index) => {
        const rowKey = getRowKey(record);
        return (
          <tr key={rowKey} className="hover:bg-gray-50 border-b border-gray-200 last:border-b-0">
            <td className="px-4 py-3">
              <input
                type="checkbox"
                checked={selectedRows.includes(rowKey)}
                onChange={(e) => onSelectRow(rowKey, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </td>
            {columns.map((column) => (
              <td
                key={String(column.key)}
                className="px-4 py-3 border-r border-gray-200 last:border-r-0"
              >
                {renderCell(record, column, index)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}
