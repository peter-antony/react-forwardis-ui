import React, { useState, useMemo, useEffect } from 'react';
import { SmartGrid } from '@/components/SmartGrid';
import { GridColumnConfig } from '@/types/smartGrid';
import { Button } from '@/components/ui/button';
import { Printer, MoreHorizontal, User, Train, UserCheck, Container, Plus, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSmartGridState } from '@/hooks/useSmartGridState';
import { DraggableSubRow } from '@/components/SmartGrid/DraggableSubRow';
import { ConfigurableButtonConfig } from '@/components/ui/configurable-button';
import { Breadcrumb } from '../components/Breadcrumb';
import { AppLayout } from '@/components/AppLayout';
import { useNavigate } from 'react-router-dom';

interface SampleData {
  id: string;
  quickOrderDate: string;
  customerSub: string;
  status: string;
  tripBillingStatus: string;
  customerSubRefNo: string;
  contract: string;
  customer: string;
  orderType: string;
  totalNet: string
  departurePointDetails?: string;
  arrivalPointDetails?: string;
  customerDetails?: Array<{
    name: string;
    id: string;
    type: 'customer';
  }>;
  resourceDetails?: Array<{
    name: string;
    id: string;
    type: 'train' | 'agent' | 'container';
  }>;
}

const QuickOrderManagement = () => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const gridState = useSmartGridState();
  
  const initialColumns: GridColumnConfig[] = [
    {
      key: 'id',
      label: 'Quick Order No.',
      type: 'Link',
      sortable: true,
      editable: false,
      mandatory: true,
      subRow: false
    },
    {
      key: 'quickOrderDate',
      label: 'Quick Order Date',
      type: 'DateTimeRange',
      sortable: true,
      editable: false,
      subRow: false
    },
    {
      key: 'status',
      label: 'Status',
      type: 'Badge',
      sortable: true,
      editable: false,
      subRow: false
    },
    {
      key: 'customerSub',
      label: 'Customer/Supplier',
      type: 'EditableText',
      sortable: true,
      editable: false,
      subRow: false
    },    
    {
      key: 'customerSubRefNo',
      label: 'Cust/Sup.Ref.No.',
      type: 'Text',
      // type: 'TextWithTooltip',
      sortable: true,
      editable: false,
      subRow: false
    },
    {
      key: 'contract',
      label: 'Contract',
      type: 'Text',
      sortable: true,
      editable: false,
      // infoTextField: 'arrivalPointDetails',
      subRow: false
    },
    {
      key: 'orderType',
      label: 'Order Type',
      type: 'Text',
      sortable: true,
      editable: false,
      subRow: false
    },
    {
      key: 'totalNet',
      label: 'Total Net',
      type: 'Text',
      sortable: true,
      editable: false,
      subRow: false
    },
    
  ];

  // const initialColumns: GridColumnConfig[] = [
  //   {
  //     key: 'id',
  //     label: 'Trip Plan No',
  //     type: 'Link',
  //     sortable: true,
  //     editable: false,
  //     mandatory: true,
  //     subRow: false
  //   },
  //   {
  //     key: 'status',
  //     label: 'Status',
  //     type: 'Badge',
  //     sortable: true,
  //     editable: false,
  //     subRow: false
  //   },
  //   {
  //     key: 'tripBillingStatus',
  //     label: 'Trip Billing Status',
  //     type: 'Badge',
  //     sortable: true,
  //     editable: false,
  //     subRow: false
  //   },
  //   {
  //     key: 'plannedStartEndDateTime',
  //     label: 'Planned Start and End Date Time',
  //     type: 'EditableText',
  //     sortable: true,
  //     editable: false,
  //     subRow: false
  //   },
  //   {
  //     key: 'actualStartEndDateTime',
  //     label: 'Actual Start and End Date Time',
  //     type: 'DateTimeRange',
  //     sortable: true,
  //     editable: false,
  //     subRow: false
  //   },
  //   {
  //     key: 'departurePoint',
  //     label: 'Departure Point',
  //     type: 'TextWithTooltip',
  //     sortable: true,
  //     editable: false,
  //     infoTextField: 'departurePointDetails',
  //     subRow: true
  //   },
  //   {
  //     key: 'arrivalPoint',
  //     label: 'Arrival Point',
  //     type: 'TextWithTooltip',
  //     sortable: true,
  //     editable: false,
  //     infoTextField: 'arrivalPointDetails',
  //     subRow: true
  //   },
  //   {
  //     key: 'customer',
  //     label: 'Customer',
  //     type: 'ExpandableCount',
  //     sortable: true,
  //     editable: false,
  //     renderExpandedContent: (row: SampleData) => (
  //       <div className="space-y-3">
  //         <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
  //           <User className="h-4 w-4" />
  //           Customer Details
  //         </div>
  //         {row.customerDetails?.map((customer, index) => (
  //           <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
  //             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
  //               <User className="h-4 w-4 text-blue-600" />
  //             </div>
  //             <div>
  //               <div className="font-medium text-gray-900">{customer.name}</div>
  //               <div className="text-sm text-gray-500">{customer.id}</div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     )
  //   },
  //   {
  //     key: 'resources',
  //     label: 'Resources',
  //     type: 'ExpandableCount',
  //     sortable: true,
  //     editable: false,
  //     renderExpandedContent: (row: SampleData) => (
  //       <div className="space-y-3">
  //         <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
  //           <Container className="h-4 w-4" />
  //           Resource Details
  //         </div>
  //         {row.resourceDetails?.map((resource, index) => (
  //           <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
  //             <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
  //               {resource.type === 'train' && <Train className="h-4 w-4 text-green-600" />}
  //               {resource.type === 'agent' && <UserCheck className="h-4 w-4 text-green-600" />}
  //               {resource.type === 'container' && <Container className="h-4 w-4 text-green-600" />}
  //             </div>
  //             <div>
  //               <div className="font-medium text-gray-900">{resource.name}</div>
  //               <div className="text-sm text-gray-500">{resource.id}</div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     )
  //   }
  // ];

  // Initialize columns and data in the grid state
  useEffect(() => {
    console.log('Initializing columns in QuickOrderManagement');
    gridState.setColumns(initialColumns);
    gridState.setGridData(processedData);
  }, []);

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard', active: false },
    { label: 'Quick Order Management', active: true }
    // { label: 'Trip Execution Management', active: false },
  ];

  // Log when columns change
  useEffect(() => {
    console.log('Columns changed in QuickOrderManagement:', gridState.columns);
    console.log('Sub-row columns:', gridState.columns.filter(col => col.subRow).map(col => col.key));
  }, [gridState.columns, gridState.forceUpdate]);
  
  const { toast } = useToast();

  const sampleData: SampleData[] = [
    {
      id: 'QQ/0001/2025',
      status: 'Released',
      tripBillingStatus: 'Draft Bill Raised',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Buy',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'QQ/0001/2026',
      status: 'Under Execution',
      tripBillingStatus: 'Not Eligible',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Sell',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'QQ/0001/2027',
      status: 'Initiated',
      tripBillingStatus: 'Revenue Leakage',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Buy',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'QQ/0001/2028',
      status: 'Cancelled',
      tripBillingStatus: 'Invoice Created',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Sell',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'QQ/0001/2029',
      status: 'Deleted',
      tripBillingStatus: 'Invoice Approved',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Buy',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'QQ/0001/2030',
      status: 'Confirmed',
      tripBillingStatus: 'Not Eligible',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Sell',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'QQ/0001/2031',
      status: 'Under Execution',
      tripBillingStatus: 'Revenue Leakage',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Buy',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'QQ/0001/2033',
      status: 'Released',
      tripBillingStatus: 'Draft Bill Raised',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Buy',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'QQ/0001/2034',
      status: 'Under Execution',
      tripBillingStatus: 'Not Eligible',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Sell',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'QQ/0001/2035',
      status: 'Initiated',
      tripBillingStatus: 'Revenue Leakage',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Buy',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'QQ/0001/2036',
      status: 'Cancelled',
      tripBillingStatus: 'Invoice Created',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Sell',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'QQ/0001/2037',
      status: 'Deleted',
      tripBillingStatus: 'Invoice Approved',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Buy',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'WW/0001/2038',
      status: 'Confirmed',
      tripBillingStatus: 'Not Eligible',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Sell',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    },
    {
      id: 'WW/0001/2039',
      status: 'Under Execution',
      tripBillingStatus: 'Revenue Leakage',
      customerSub: 'Oitis Group',
      quickOrderDate: '25-Mar-2025',
      customerSubRefNo: 'CSR/111/2024',
      contract: 'AO Intertrans',
      customer: '+3',
      orderType: 'Buy',
      totalNet: '$1395.00',
      departurePointDetails: 'VQL-705\nVolla\n\nAddress\nSardar Patel Rd, Sriram Nagar, Tharamani, Chennai, Tamil Nadu 600113',
      arrivalPointDetails: 'Currency details for CUR-25',
      customerDetails: [
        { name: 'DB Cargo', id: 'CUS00000123', type: 'customer' },
        { name: 'ABC Rail Goods', id: 'CUS00003214', type: 'customer' },
        { name: 'Wave Cargo', id: 'CUS00012345', type: 'customer' }
      ],
      resourceDetails: [
        { name: 'Train ID', id: 'TR000213', type: 'train' },
        { name: 'AGN01', id: 'Agent-0000001', type: 'agent' },
        { name: '20FT CT', id: '20 Feet Container', type: 'container' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      // Status column colors
      'Released': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Under Execution': 'bg-purple-100 text-purple-800 border-purple-300',
      'Initiated': 'bg-blue-100 text-blue-800 border-blue-300',
      'Cancelled': 'bg-red-100 text-red-800 border-red-300',
      'Deleted': 'bg-red-100 text-red-800 border-red-300',
      'Confirmed': 'bg-green-100 text-green-800 border-green-300',
      
      // Trip Billing Status colors
      'Draft Bill Raised': 'bg-orange-100 text-orange-800 border-orange-300',
      'Not Eligible': 'bg-red-100 text-red-800 border-red-300',
      'Revenue Leakage': 'bg-red-100 text-red-800 border-red-300',
      'Invoice Created': 'bg-blue-100 text-blue-800 border-blue-300',
      'Invoice Approved': 'bg-green-100 text-green-800 border-green-300'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const processedData = useMemo(() => {
    return sampleData.map(row => ({
      ...row,
      status: {
        value: row.status,
        variant: getStatusColor(row.status)
      },
      tripBillingStatus: {
        value: row.tripBillingStatus,
        variant: getStatusColor(row.tripBillingStatus)
      }
    }));
  }, []);
  // Navigate to the create new quick order page
  const navigate = useNavigate();
  // Configurable buttons for the grid toolbar
  const configurableButtons: ConfigurableButtonConfig[] = [
    {
      label: "Create Order",
      tooltipTitle: "Create new quick order",
      showDropdown: true, // Enable dropdown for future functionality
      onClick: () => {
        navigate('/create-quick-order');
      },
      dropdownItems: [
        {
          label: "Create Quick Order",
          icon: <Plus className="h-4 w-4" />,
          onClick: () => {
            navigate('/create-quick-order');
            
          }
        },
        {
          label: "Bulk Upload",
          icon: <Upload className="h-4 w-4" />,
          onClick: () => {
            toast({
              title: "Bulk Upload",
              description: "Opening bulk upload dialog..."
            });
          }
        }
      ]
    }
  ];

  const handleLinkClick = (value: any, row: any) => {
    console.log('Link clicked:', value, row);
  };

  const handleUpdate = async (updatedRow: any) => {
    console.log('Updating row:', updatedRow);
    // Update the grid data
    gridState.setGridData(prev => 
      prev.map((row, index) => 
        index === updatedRow.index ? { ...row, ...updatedRow } : row
      )
    );
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "Success",
      description: "Trip plan updated successfully"
    });
  };

  const handleRowSelection = (selectedRowIndices: Set<number>) => {
    console.log('Selected rows changed:', selectedRowIndices);
    setSelectedRows(selectedRowIndices);
  };

  const renderSubRow = (row: any, rowIndex: number) => {
    return (
      <DraggableSubRow
        row={row}
        rowIndex={rowIndex}
        columns={gridState.columns}
        subRowColumnOrder={gridState.subRowColumnOrder}
        editingCell={gridState.editingCell}
        onReorderSubRowColumns={gridState.handleReorderSubRowColumns}
        onSubRowEdit={gridState.handleSubRowEdit}
        onSubRowEditStart={gridState.handleSubRowEditStart}
        onSubRowEditCancel={gridState.handleSubRowEditCancel}
      />
    );
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-4 px-6 space-y-6">
          <div className="hidden md:block">
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Grid Container */}
          <div className="rounded-lg shadow-sm mt-4">
            <SmartGrid
              key={`grid-${gridState.forceUpdate}`}
              columns={gridState.columns}
              data={gridState.gridData.length > 0 ? gridState.gridData : processedData}
              editableColumns={['customerSub']}
              paginationMode="pagination"
              onLinkClick={handleLinkClick}
              onUpdate={handleUpdate}
              onSubRowToggle={gridState.handleSubRowToggle}
              selectedRows={selectedRows}
              onSelectionChange={handleRowSelection}
              rowClassName={(row: any, index: number) => 
                selectedRows.has(index) ? 'smart-grid-row-selected' : ''
              }
              nestedRowRenderer={renderSubRow}
              configurableButtons={configurableButtons}
              showDefaultConfigurableButton={false}
              gridTitle="Quick Order"
              recordCount={gridState.gridData.length > 0 ? gridState.gridData.length : processedData.length}
              showCreateButton={true}
              createButtonLabel="Create New Quick Order"
              searchPlaceholder="Search all columns..."
            />
            
            {/* Footer with action buttons matching the screenshot style */}
            <div className="flex items-center justify-between p-4 border-t bg-gray-50/50">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 px-3 text-gray-700 border-gray-300 hover:bg-gray-100"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 px-3 text-gray-700 border-gray-300 hover:bg-gray-100"
                >
                  <MoreHorizontal className="h-4 w-4 mr-2" />
                  More
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="h-8 px-4 text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default QuickOrderManagement;
