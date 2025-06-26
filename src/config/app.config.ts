
export const APP_CONFIG = {
  app: {
    name: 'Logistics Management',
    version: '1.0.0',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
  },
  ui: {
    debounceDelay: 300,
    itemsPerPage: 10,
  },
  features: {
    enableAdvancedFilters: true,
    enableExport: true,
    enableBulkOperations: true,
  },
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
  },
};

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  TRIP_EXECUTION: '/trip-execution',
} as const;

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
  CANCELLED: 'cancelled',
} as const;

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export const TRIP_STATUS = {
  RELEASED: 'Released',
  UNDER_EXECUTION: 'Under Execution',
  INITIATED: 'Initiated',
  CANCELLED: 'Cancelled',
  DELETED: 'Deleted',
  CONFIRMED: 'Confirmed',
} as const;

export const BILLING_STATUS = {
  DRAFT_BILL_RAISED: 'Draft Bill Raised',
  NOT_ELIGIBLE: 'Not Eligible',
  REVENUE_LEAKAGE: 'Revenue Leakage',
  INVOICE_CREATED: 'Invoice Created',
  INVOICE_APPROVED: 'Invoice Approved',
} as const;
