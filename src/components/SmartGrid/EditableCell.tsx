
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface EditableCellProps {
  value: any;
  isEditing: boolean;
  type: 'text' | 'number' | 'date' | 'select' | 'boolean';
  options?: Array<{ label: string; value: any }>;
  onEdit: (value: any) => void;
  onEditStart: () => void;
  onEditEnd: () => void;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  isEditing,
  type,
  options,
  onEdit,
  onEditStart,
  onEditEnd,
}) => {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onEdit(editValue);
    onEditEnd();
  };

  const handleCancel = () => {
    setEditValue(value);
    onEditEnd();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditing) {
    return (
      <div
        className="cursor-pointer hover:bg-gray-100 p-1 rounded"
        onClick={onEditStart}
      >
        {type === 'boolean' ? (
          <span>{value ? 'Yes' : 'No'}</span>
        ) : type === 'select' && options ? (
          <span>{options.find(opt => opt.value === value)?.label || value}</span>
        ) : (
          <span>{String(value || '')}</span>
        )}
      </div>
    );
  }

  if (type === 'select' && options) {
    return (
      <select
        ref={inputRef as any}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1 border border-gray-300 rounded"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (type === 'boolean') {
    return (
      <input
        ref={inputRef as any}
        type="checkbox"
        checked={editValue}
        onChange={(e) => setEditValue(e.target.checked)}
        onBlur={handleSave}
        className="w-4 h-4"
      />
    );
  }

  return (
    <Input
      ref={inputRef}
      type={type === 'number' ? 'number' : type === 'date' ? 'date' : 'text'}
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={handleKeyDown}
      className="w-full"
    />
  );
};
