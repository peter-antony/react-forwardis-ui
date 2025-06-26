
import React, { useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface AdvancedFiltersProps {
  onClose: () => void;
  onApply: (filters: string[]) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onClose, onApply }) => {
  const [customer, setCustomer] = useState('');
  const [customerOrderNo, setCustomerOrderNo] = useState('');
  const [executionDate, setExecutionDate] = useState<Date>();
  const [status, setStatus] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [loadType, setLoadType] = useState('');

  const handleApply = () => {
    const filters: string[] = [];
    if (customer) filters.push(`Customer: ${customer}`);
    if (customerOrderNo) filters.push(`Order: ${customerOrderNo}`);
    if (executionDate) filters.push(`Date: ${format(executionDate, 'dd-MMM-yyyy')}`);
    if (status) filters.push(`Status: ${status}`);
    if (serviceType) filters.push(`Service: ${serviceType}`);
    if (loadType) filters.push(`Load: ${loadType}`);
    
    onApply(filters);
  };

  const handleClear = () => {
    setCustomer('');
    setCustomerOrderNo('');
    setExecutionDate(undefined);
    setStatus('');
    setServiceType('');
    setLoadType('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Select Favourites</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Customer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
          <Select value={customer} onValueChange={setCustomer}>
            <SelectTrigger>
              <SelectValue placeholder="Select Customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer1">Customer 1</SelectItem>
              <SelectItem value="customer2">Customer 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Customer Order No */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer Order No.</label>
          <Input
            placeholder="Enter Customer Order No."
            value={customerOrderNo}
            onChange={(e) => setCustomerOrderNo(e.target.value)}
          />
        </div>

        {/* Planned Execution Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Planned Execution Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {executionDate ? format(executionDate, 'dd-MMM-yyyy') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={executionDate}
                onSelect={setExecutionDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Trip Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trip Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="released">Released</SelectItem>
              <SelectItem value="under-execution">Under Execution</SelectItem>
              <SelectItem value="initiated">Initiated</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="express">Express</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Trip Load Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trip Load Type</label>
          <Select value={loadType} onValueChange={setLoadType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Trip Load Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Load</SelectItem>
              <SelectItem value="partial">Partial Load</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <Button variant="ghost" size="sm" onClick={handleClear}>
          Clear
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            // Add to favourites logic
            console.log('Adding filters to favourites');
          }}
        >
          Add to Favourites
        </Button>
        <Button variant="default" size="sm" onClick={handleApply}>
          Search
        </Button>
      </div>
    </div>
  );
};
