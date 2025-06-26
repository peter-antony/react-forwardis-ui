
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Info } from 'lucide-react';

interface TripPlan {
  id: string;
  tripPlanNo: string;
  status: string;
  tripBillingStatus: string;
  plannedStartDateTime: string;
  plannedEndDateTime: string;
  actualStartDateTime: string;
  actualEndDateTime: string;
  departurePoint: string;
  arrivalPoint: string;
  customer: string;
  resources: string;
}

interface TripPlansTableProps {
  tripPlans: TripPlan[];
  loading: boolean;
  error: string | null;
  selectedRows: string[];
  onRowSelectionChange: (selectedIds: string[]) => void;
  searchQuery: string;
  filters: string[];
}

export const TripPlansTable: React.FC<TripPlansTableProps> = ({
  tripPlans,
  loading,
  error,
  selectedRows,
  onRowSelectionChange,
  searchQuery,
  filters,
}) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Released': { color: 'bg-green-100 text-green-800', label: 'Released' },
      'Under Execution': { color: 'bg-purple-100 text-purple-800', label: 'Under Execution' },
      'Initiated': { color: 'bg-blue-100 text-blue-800', label: 'Initiated' },
      'Cancelled': { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
      'Deleted': { color: 'bg-red-100 text-red-800', label: 'Deleted' },
      'Confirmed': { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Released'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getBillingStatusBadge = (status: string) => {
    const statusConfig = {
      'Draft Bill Raised': { color: 'bg-yellow-100 text-yellow-800', label: 'Draft Bill Raised' },
      'Not Eligible': { color: 'bg-red-100 text-red-800', label: 'Not Eligible' },
      'Revenue Leakage': { color: 'bg-red-100 text-red-800', label: 'Revenue Leakage' },
      'Invoice Created': { color: 'bg-blue-100 text-blue-800', label: 'Invoice Created' },
      'Invoice Approved': { color: 'bg-green-100 text-green-800', label: 'Invoice Approved' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Not Eligible'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onRowSelectionChange(tripPlans.map(trip => trip.id));
    } else {
      onRowSelectionChange([]);
    }
  };

  const handleRowSelect = (tripId: string, checked: boolean) => {
    if (checked) {
      onRowSelectionChange([...selectedRows, tripId]);
    } else {
      onRowSelectionChange(selectedRows.filter(id => id !== tripId));
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading trip plans...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.length === tripPlans.length && tripPlans.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Trip Plan No</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Trip Billing Status</TableHead>
            <TableHead>Planned Start and End Date Time</TableHead>
            <TableHead>Actual Start and End Date Time</TableHead>
            <TableHead>Departure Point</TableHead>
            <TableHead>Arrival Point</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Resources</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tripPlans.map((trip) => (
            <TableRow key={trip.id} className="hover:bg-gray-50">
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(trip.id)}
                  onCheckedChange={(checked) => handleRowSelect(trip.id, checked as boolean)}
                />
              </TableCell>
              <TableCell>
                <span className="text-blue-600 font-medium">{trip.tripPlanNo}</span>
              </TableCell>
              <TableCell>
                {getStatusBadge(trip.status)}
              </TableCell>
              <TableCell>
                {getBillingStatusBadge(trip.tripBillingStatus)}
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{trip.plannedStartDateTime}</div>
                  <div className="text-gray-500">{trip.plannedEndDateTime}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div>{trip.actualStartDateTime}</div>
                  <div className="text-gray-500">{trip.actualEndDateTime}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{trip.departurePoint}</span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{trip.arrivalPoint}</span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
              </TableCell>
              <TableCell>
                <span>{trip.customer}</span>
              </TableCell>
              <TableCell>
                <span>{trip.resources}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
