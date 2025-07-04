
import React, { useState } from 'react';
import { X, Search, Calendar, Clock, Bookmark, Banknote, Wrench, ArrowLeft, FileText, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { DynamicPanel } from '@/components/DynamicPanel';
import { PanelConfig, PanelSettings } from '@/types/dynamicPanel';
import { Card } from '@/components/ui/card';
import { BillingDetailsPanel } from './BillingDetails';
import { toast } from 'sonner';


interface ResourceGroupDetailsProps {
  open: boolean;
  onClose: () => void;
}

const ResourceGroupDetails = ({ open, onClose }: ResourceGroupDetailsProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleProceedToNext = () => {
    setCurrentStep(2);
  };

  const handleFirstStep = () => {
    setCurrentStep(1);
  };

  const handleSecondStep = () => {
    setCurrentStep(2);
  };

  const handleSaveDetails = () => {
    toast.success('Details saved successfully');
    console.log('Save details clicked');
  };

  const [basicDetailsData, setBasicDetailsData] = useState({});
  const [operationalDetailsData, setOperationalDetailsData] = useState({});
  const [billingDetailsData, setBillingDetailsData] = useState({});

  // Panel titles state
  const [basicDetailsTitle, setBasicDetailsTitle] = useState('Basic Details');
  const [operationalDetailsTitle, setOperationalDetailsTitle] = useState('Operational Details');
  const [billingDetailsTitle, setBillingDetailsTitle] = useState('Billing Details');

  // Panel widths state - updated for 12-column system
  // const [basicDetailsWidth, setBasicDetailsWidth] = useState<'full' | 'half' | 'third' | 'quarter' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>(12);
  // const [operationalDetailsWidth, setOperationalDetailsWidth] = useState<'full' | 'half' | 'third' | 'quarter' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>(6);
  // const [billingDetailsWidth, setBillingDetailsWidth] = useState<'full' | 'half' | 'third' | 'quarter' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>(6);

  // Panel visibility state
  const [basicDetailsVisible, setBasicDetailsVisible] = useState(true);
  const [operationalDetailsVisible, setOperationalDetailsVisible] = useState(true);
  const [billingDetailsVisible, setBillingDetailsVisible] = useState(true);

  // Basic Details Panel Configuration
  const basicDetailsConfig: PanelConfig = {
    resource: {
      id: 'resource',
      label: 'Resource',
      fieldType: 'select',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 2,
      options: [
        { label: 'Vehicle', value: 'vehicle' },
        { label: 'Equipment', value: 'equipment' },
        { label: 'Material', value: 'material' },
        { label: 'Other', value: 'other' }
      ]
    },
    resourceType: {
      id: 'resourceType',
      label: 'Resource Type',
      fieldType: 'select',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 3,
      options: [
        { label: 'Truck 4.2', value: 'truck-4.2' },
        { label: 'Truck 4.5', value: 'truck-4.5' },
        { label: 'Truck 5.2', value: 'truck-5.2' },
      ]
    },
    serviceType: {
      id: 'serviceType',
      label: 'Service Type',
      fieldType: 'select',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 4,
      options: [
        { label: 'Block Train Conventional', value: 'Block Train Conventional' },
        { label: 'Block Train Convention', value: 'Block Train Convention' },
      ]
    },
    subservice: {
      id: 'sub-service',
      label: 'Sub-Service',
      fieldType: 'select',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 5,
      options: [
        { label: 'Repair', value: 'repair' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Other', value: 'other' }
      ]
    }
  };

  // Operational Details Panel Configuration
  const operationalDetailsConfig: PanelConfig = {
    operationalLocation: {
      id: 'operationalLocation',
      label: 'Operational Location',
      fieldType: 'search',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 1,
      placeholder: 'Search operational location...'
    },
    departurePoint: {
      id: 'departurePoint',
      label: 'Departure Point',
      fieldType: 'select',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 2,
      options: [
        { label: '10-000471', value: '10-000471' },
        { label: '10-000481', value: '10-000481' },
        { label: '10-000491', value: '10-000491' }
      ]
    },
    arrivalPoint: {
      id: 'arrivalPoint',
      label: 'Arrival Point',
      fieldType: 'select',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 3,
      options: [
        { label: '10-000720', value: '10-000720' },
        { label: '10-000721', value: '10-000721' },
        { label: '10-000722', value: '10-000722' }
      ]
    },
    fromDate: {
      id: 'fromDate',
      label: 'From Date',
      fieldType: 'date',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 4
    },
    fromTime: {
      id: 'fromTime',
      label: 'From Time',
      fieldType: 'time',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 5
    },
    toDate: {
      id: 'toDate',
      label: 'To Date',
      fieldType: 'date',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 6
    },
    toTime: {
      id: 'toTime',
      label: 'To Time',
      fieldType: 'time',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 7
    },
    remarks: {
      id: 'remarks',
      label: 'Remarks',
      fieldType: 'text',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 8
    },
  };

  // Billing Details Panel Configuration
  const billingDetailsConfig: PanelConfig = {
    totalAmount: {
      id: 'totalAmount',
      label: 'Total Amount',
      fieldType: 'currency',
      value: '',
      mandatory: true,
      visible: true,
      editable: true,
      order: 1
    },
    taxAmount: {
      id: 'taxAmount',
      label: 'Tax Amount',
      fieldType: 'currency',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 2
    },
    discountAmount: {
      id: 'discountAmount',
      label: 'Discount Amount',
      fieldType: 'currency',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 3
    },
    billingStatus: {
      id: 'billingStatus',
      label: 'Billing Status',
      fieldType: 'select',
      value: '',
      mandatory: true,
      visible: true,
      editable: true,
      order: 4,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' }
      ]
    },
    paymentTerms: {
      id: 'paymentTerms',
      label: 'Payment Terms',
      fieldType: 'select',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 5,
      options: [
        { label: 'Net 30', value: 'net-30' },
        { label: 'Net 60', value: 'net-60' },
        { label: 'Due on Receipt', value: 'due-on-receipt' }
      ]
    },
    invoiceDate: {
      id: 'invoiceDate',
      label: 'Invoice Date',
      fieldType: 'date',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 6
    }
  };

  const [billingData, setBillingData] = useState({
    billingDetail: "DB00023/42",
    contractPrice: 1200.00,
    netAmount: 5580.00,
    billingType: 'Wagon',
    unitPrice: 1395.00,
    billingQty: 4,
    tariff: 'TAR000750 - Tariff Description',
    tariffType: 'Rate Per Block Train',
    remarks: ''
  });

  // Mock functions for user config management
  const getUserPanelConfig = (userId: string, panelId: string): PanelSettings | null => {
    const stored = localStorage.getItem(`panel-config-${userId}-${panelId}`);
    return stored ? JSON.parse(stored) : null;
  };

  const saveUserPanelConfig = (userId: string, panelId: string, settings: PanelSettings): void => {
    localStorage.setItem(`panel-config-${userId}-${panelId}`, JSON.stringify(settings));
    console.log(`Saved config for panel ${panelId}:`, settings);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full p-0" side="right">
        <div className="w-full border-b bg-white">
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center space-x-2">
              <Button className='rounded-full border m-2 h-8 w-8' variant="ghost" size="icon" onClick={onClose}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            <h1 className="text-lg font-semibold">Resource Group Details</h1>
            </div>
            <Button className='rounded-full border m-2 h-8 w-8' variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="flex h-full">
          {/* Left Side - Stepper and Main Content */}
          <div className="flex-1 flex">
            {/* Vertical Stepper */}
            <div className="w-64 p-6 border-r">
              <div className="">
                <div className="flex items-start space-x-3 cursor-pointer" onClick={handleFirstStep}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                  }`}>
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-medium ${currentStep === 1 ? 'text-blue-600' : 'text-gray-900'}`}>
                      Resource Group Creation
                    </h3>
                    <p className={`text-xs ${currentStep === 1 ? 'text-blue-600' : 'text-gray-500'}`}>-</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-blue-600 mt-2 ml-4"></div>
                <div className="flex items-start space-x-3 cursor-pointer mt-2" onClick={handleSecondStep}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-medium ${currentStep === 2 ? 'text-blue-600' : 'text-gray-500'}`}>
                      Plan and Actuals
                    </h3>
                    <p className={`text-xs ${currentStep === 2 ? 'text-blue-600' : 'text-gray-500'}`}>Total Items: 0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-50 px-6 py-4 h-full overflow-y-auto">
              <SheetHeader className="mb-4">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-lg font-semibold">Resource Group Creation</SheetTitle>
                  <div className="flex items-center gap-4">
                    <span className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100">
                      <BookmarkCheck className="w-5 h-5 text-gray-500 cursor-pointer" />
                    </span>
                    <span className="rounded-lg border border-gray-300 p-2 hover:bg-gray-100">
                      <FileText className="w-5 h-5 text-gray-500 cursor-pointer" />
                    </span>
                  </div>
                </div>
              </SheetHeader>

              {currentStep === 1 && (
                <div className="space-y-8">
                  {/* Basic Details Section */}
                  {/* <div className="grid grid-cols-12 gap-6"> */}
                  <div className="flex gap-6">
                    <div className="w-3/5">
                      {basicDetailsVisible && (
                        <DynamicPanel
                          panelId="basic-details"
                          panelTitle={basicDetailsTitle}
                          panelIcon={<Wrench className="w-5 h-5 text-lime-500" />}
                          panelConfig={basicDetailsConfig}
                          initialData={basicDetailsData}
                          onDataChange={setBasicDetailsData}
                          onTitleChange={setBasicDetailsTitle}
                          // onWidthChange={setBasicDetailsWidth}
                          getUserPanelConfig={getUserPanelConfig}
                          saveUserPanelConfig={saveUserPanelConfig}
                          userId="current-user"
                          // panelWidth={basicDetailsWidth}
                        />
                      )}

                      {operationalDetailsVisible && (
                        <DynamicPanel
                          panelId="operational-details"
                          panelTitle={operationalDetailsTitle}
                          panelIcon={<Bookmark className="w-5 h-5 text-blue-500" />}
                          panelConfig={operationalDetailsConfig}
                          initialData={operationalDetailsData}
                          onDataChange={setOperationalDetailsData}
                          onTitleChange={setOperationalDetailsTitle}
                          // onWidthChange={setOperationalDetailsWidth}
                          getUserPanelConfig={getUserPanelConfig}
                          saveUserPanelConfig={saveUserPanelConfig}
                          userId="current-user"
                          // panelWidth={operationalDetailsWidth}
                        />
                      )}
                    </div>
                    
                    <div className="w-2/5 rounded-lg bg-card text-card-foreground col-span-12 border border-gray-200 shadow-sm mb-24">
                      {billingDetailsVisible && (
                        <BillingDetailsPanel
                          panelId="billing-details"
                          panelTitle={billingDetailsTitle}
                          panelIcon={<Banknote className="w-5 h-5 text-orange-500" />}
                          panelConfig={billingDetailsConfig}
                          initialData={billingData}
                          onDataChange={setBillingData}
                          onTitleChange={setBillingDetailsTitle}
                          getUserPanelConfig={getUserPanelConfig}
                          saveUserPanelConfig={saveUserPanelConfig}
                          userId="current-user"
                        />
                      )}
                    </div>
                    
                  </div>

                </div>
              )}

              {currentStep === 2 && (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">Plan and Actuals content will be implemented here</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="mt-2 w-full bg-white border-t flex justify-end space-x-3 absolute bottom-0 px-8">
          {currentStep === 1 && ( 
            <Button variant="outline" onClick={handleProceedToNext} className="h-8 my-2 rounded border-blue-600 text-blue-600 hover:bg-blue-50">
              Proceed to Next
            </Button>
          )}
          <Button onClick={handleSaveDetails} className="h-8 my-2 bg-blue-600 rounded hover:bg-blue-700">
            Save Details
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResourceGroupDetails;
