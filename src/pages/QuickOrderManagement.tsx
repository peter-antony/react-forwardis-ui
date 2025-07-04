
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { PageLayout } from '@/layouts/PageLayout';
import { QuickOrderTable } from '@/features/quickOrder/components/QuickOrderTable';
import { useNavigate } from 'react-router-dom';

const QuickOrderManagement = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard', active: false },
    { label: 'Quick Order Management', active: true }
  ];

  const handleRowClick = (row: any) => {
    console.log('Row clicked:', row);
    // Navigate to detail view or open modal
  };

  const handleCreateOrder = () => {
    navigate('/create-quick-order');
  };

  return (
    <MainLayout>
      <PageLayout
        breadcrumbs={breadcrumbItems}
        title="Quick Order Management"
      >
        <QuickOrderTable
          onRowClick={handleRowClick}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </PageLayout>
    </MainLayout>
  );
};

export default QuickOrderManagement;
