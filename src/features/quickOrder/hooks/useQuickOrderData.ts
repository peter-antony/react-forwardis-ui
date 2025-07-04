
import { useState, useEffect } from 'react';
import { GridColumnConfig } from '@/types/smartGrid';

export const useQuickOrderData = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: GridColumnConfig[] = [
    {
      key: "id",
      label: "Quick Order No.",
      type: "Link",
      sortable: true,
      editable: false,
      mandatory: true,
      subRow: false
    },
    {
      key: "quickOrderDate",
      label: "Quick Order Date",
      type: "DateTimeRange",
      sortable: true,
      editable: false,
      subRow: false
    },
    {
      key: "status",
      label: "Status",
      type: "Badge",
      sortable: true,
      editable: false,
      subRow: false
    },
    {
      key: "customerSub",
      label: "Customer/Supplier",
      type: "EditableText",
      sortable: true,
      editable: false,
      subRow: false
    },
    {
      key: "customerSubRefNo",
      label: "Cust/Sup.Ref.No.",
      type: "Text",
      sortable: true,
      editable: false,
      subRow: false
    },
    {
      key: "contract",
      label: "Contract",
      type: "Text",
      sortable: true,
      editable: false,
      subRow: false
    },
    {
      key: "orderType",
      label: "Order Type",
      type: "Text",
      sortable: true,
      editable: false,
      subRow: false
    },
    {
      key: "totalNet",
      label: "Total Net",
      type: "Text",
      sortable: true,
      editable: false,
      subRow: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      // Mock data for demonstration
      const mockData = [
        {
          id: "QO001",
          quickOrderDate: "2024-01-15",
          status: "Active",
          customerSub: "ABC Corp",
          customerSubRefNo: "REF001",
          contract: "C001",
          orderType: "Standard",
          totalNet: "$1,200.00"
        }
      ];
      setData(mockData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { data, loading, columns };
};
