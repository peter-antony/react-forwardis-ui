import React, { useState } from 'react';
import { CalendarIcon, Search, CircleArrowOutUpRight  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { SimpleDropDown } from '../Common/SimpleDropDown';
import { InputDropDown } from '../Common/InputDropDown';

interface OrderFormProps {
  onSaveDraft: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const OrderForm = ({ onSaveDraft, onConfirm, onCancel }: OrderFormProps) => {
  const [orderType, setOrderType] = useState('buy');
  const [orderDate, setOrderDate] = useState<Date>();
  const [formData, setFormData] = useState({
    contract: '',
    customer: '',
    cluster: '',
    customerOrderNo: '',
    customerRefNo: '',
    qcValue: '',
    remarks: '',
    summary: ''
  });
  onConfirm = () => {
    console.log("FORM DATA : ", formData);
  }
  //Contracts Array
  const contracts = [
    {
      "id": 1,
      "name": "DB Cargo",
      "seqNo": 1,   // Optional
      "default": "Y",   // Optional
      "description": "db-cargo" // Optional
    },
    {
      "id": 2,
      "name": "Rail Freight",
      "seqNo": 2,
      "default": "N",
      "description": "rail-freight"
    },
    {
      "id": 3,
      "name": "Express Logistics",
      "seqNo": 3,
      "default": "N",
      "description": "express-logistics"
    }

  ]
  //Customers Array
  const customers = [
    {
      "id": 1,
      "name": "DB Cargo",
      "seqNo": 1,   // Optional
      "default": "Y",   // Optional
      "description": "db-cargo" // Optional
    },
    {
      "id": 2,
      "name": "Global Logistics",
      "seqNo": 2,
      "default": "N",
      "description": "global-logistics"
    },
    {
      "id": 3,
      "name": "Freight Solutions",
      "seqNo": 3,
      "default": "N",
      "description": "freight-solutions"
    }

  ]
  //QC List Array
  const QCList = [
    {
      "id": 1,
      "name": "QC",
      "seqNo": 1,   // Optional
      "default": "Y",   // Optional
      "description": "qc" // Optional
    },
    {
      "id": 2,
      "name": "Quality",
      "seqNo": 2,
      "default": "N",
      "description": "quality"
    },
    {
      "id": 3,
      "name": "Control",
      "seqNo": 3,
      "default": "N",
      "description": "control"
    }

  ]
  const [inputValue, setInputValue] = useState("");
  const [selectedQC, setSelectedQC] = useState("QC");
  const [qcDropdown, setQcDropdown] = useState('QC');
  const [qcInput, setQcInput] = useState('');
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQcChange = (dropdownValue: string, inputValue: string) => {
    setQcDropdown(dropdownValue);
    setQcInput(inputValue);
    setFormData(prev => ({
      ...prev,
      qcValue: `${dropdownValue}-${inputValue}`
    }));
  };

  const isFormValid = () => {
    return orderDate && formData.contract && formData.customer;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Details</h2>

      <div className="space-y-6">
        {/* Order Type */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Order Type</Label>
          <RadioGroup
            value={orderType}
            onValueChange={setOrderType}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="buy" id="buy" />
              <Label htmlFor="buy">Buy Order</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sell" id="sell" />
              <Label htmlFor="sell">Sell Order</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Order Date */}
          <div>
            <Label htmlFor="order-date" className="text-sm font-medium text-gray-700 mb-2 block">
              Quick Order Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal relative",
                    !orderDate && "text-muted-foreground"
                  )}
                >
                  {orderDate ? format(orderDate, "dd/MM/yyyy") : "Select date"}
                  <CalendarIcon className="mr-2 h-4 w-4 absolute right-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={orderDate}
                  onSelect={setOrderDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Contract */}
          <div>
            <Label htmlFor="contract" className="text-sm font-medium text-gray-700 mb-2 block">
              Contract
            </Label>
            <SimpleDropDown list={contracts} value={formData.contract}
              onValueChange={value => handleInputChange('contract', value)} />
          </div>

          {/* Customer */}
          {
            orderType === "buy" && (
              <div>
                <Label htmlFor="customer" className="text-sm font-medium text-gray-700 mb-2 block">
                  Customer
                </Label>
                <SimpleDropDown list={customers} value={formData.customer} onValueChange={value => handleInputChange('customer', value)} />
              </div>
            )
          }
          {/* Vendor */}
          {
            orderType === "sell" && (
              <div>
                <Label htmlFor="customer" className="text-sm font-medium text-gray-700 mb-2 block">
                  Vendor
                </Label>
                <SimpleDropDown list={customers} value={formData.customer} onValueChange={value => handleInputChange('customer', value)} />
              </div>
            )
          }
          {/* Cluster */}
          <div>
            <Label htmlFor="cluster" className="text-sm font-medium text-gray-700 mb-2 block">
              Cluster
            </Label>
            <Input
              id="cluster"
              placeholder="10000406"
              value={formData.cluster}
              onChange={(e) => handleInputChange('cluster', e.target.value)}
            />
          </div>

          {/* Customer Internal Order No */}
          {
            orderType === "buy" && (
              <div className="col-span-full ">
                <Label htmlFor="customer-order-no" className="text-sm font-medium text-gray-700 mb-2 block">
                  Customer Internal Order No.
                </Label>
                <div className="relative">
                  <Input
                    id="customer-order-no"
                    placeholder="IO/0000000042"
                    value={formData.customerOrderNo}
                    onChange={(e) => handleInputChange('customerOrderNo', e.target.value)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            )
          }
          {/* Customer/Supplier Ref. No. and QC Userdefined 1 on the same line */}
          <div >
            <Label htmlFor="customer-ref-no" className="text-sm font-medium text-gray-700 mb-2 block">
              Customer/ Supplier Ref. No.
            </Label>
            <div className="relative">
              <Input
                id="customer-ref-no"
                placeholder="Enter Ref. No."
                value={formData.customerRefNo}
                onChange={(e) => handleInputChange('customerRefNo', e.target.value)}
                className="px-3 py-2 pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div >
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              QC Userdefined 1
            </Label>
            <InputDropDown
              label="QC Userdefined 1"
              dropdownOptions={['QC', 'QA', 'Test']}
              selectedOption={qcDropdown}
              onOptionChange={option => handleQcChange(option, qcInput)}
              value={qcInput}
              onValueChange={val => handleQcChange(qcDropdown, val)}
            />
          </div>
        </div>
        {/* Remarks */}
        <div>
          <Label htmlFor="remarks" className="text-sm font-medium text-gray-700 mb-2 block">
            Remarks 1
          </Label>
          <Textarea
            id="remarks"
            placeholder="Enter Remarks"
            value={formData.remarks}
            onChange={(e) => handleInputChange('remarks', e.target.value)}
            rows={3}
          />
        </div>

        {/* Summary */}
        <div>
          <Label htmlFor="summary" className="text-sm font-medium text-gray-700 mb-2 block">
            Summary
          </Label>
          <Textarea
            id="summary"
            placeholder="Enter Summary"
            value={formData.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
        <button className="p-2 rounded-md border border-gray-200 hover:bg-gray-100">
          <CircleArrowOutUpRight  className="w-5 h-5 text-gray-400" />
        </button>
        <Button
          variant="outline"
          onClick={onSaveDraft}
          className="border-blue-300 text-blue-600 hover:bg-blue-50"
        >
          Save Draft
        </Button>
        <Button
          onClick={onConfirm}
          disabled={!isFormValid()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;
