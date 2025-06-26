
import React, { useState } from 'react';
import { AppLayout } from '../components/AppLayout';
import { Breadcrumb } from '../components/Breadcrumb';
import { TripPlansTable } from '../components/organisms/TripPlansTable/TripPlansTable';
import { SearchFilterBar } from '../components/molecules/SearchFilterBar/SearchFilterBar';
import { useTripPlans } from '../hooks/useTripPlans';

const TripExecutionManagement: React.FC = () => {
  const { tripPlans, loading, error } = useTripPlans();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Trip Execution Management', active: true }
  ];

  const handleRowSelectionChange = (selectedIds: string[]) => {
    setSelectedRows(selectedIds);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters: string[]) => {
    setFilters(newFilters);
  };

  const handleToggleAdvancedFilters = (show: boolean) => {
    setShowAdvancedFilters(show);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Trip Execution Management</h1>
        </div>

        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedFilters={filters}
          onFiltersChange={handleFiltersChange}
          showAdvancedFilters={showAdvancedFilters}
          onToggleAdvancedFilters={handleToggleAdvancedFilters}
          selectedRowsCount={selectedRows.length}
        />

        <TripPlansTable
          tripPlans={tripPlans}
          loading={loading}
          error={error}
          selectedRows={selectedRows}
          onRowSelectionChange={handleRowSelectionChange}
          searchQuery={searchQuery}
          filters={filters}
        />
      </div>
    </AppLayout>
  );
};

export default TripExecutionManagement;
