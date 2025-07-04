
import React from 'react';
import { SmartGrid } from '@/components/SmartGrid';
import { GridColumnConfig } from '@/types/smartGrid';
import { useQuickOrderData } from '../hooks/useQuickOrderData';

interface QuickOrderTableProps {
  onRowClick?: (row: any) => void;
  selectedRows?: Set<number>;
  onSelectionChange?: (selectedRows: Set<number>) => void;
}

export const QuickOrderTable: React.FC<QuickOrderTableProps> = ({
  onRowClick,
  selectedRows,
  onSelectionChange
}) => {
  const { data, loading, columns } = useQuickOrderData();

  return (
    <SmartGrid
      data={data}
      columns={columns}
      loading={loading}
      selectedRows={selectedRows}
      onSelectionChange={onSelectionChange}
      onLinkClick={onRowClick}
      gridTitle="Quick Orders"
      recordCount={data.length}
      showCreateButton={true}
      createButtonLabel="Create Order"
      searchPlaceholder="Search quick orders..."
    />
  );
};
