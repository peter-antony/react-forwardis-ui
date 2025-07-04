
// Centralized API endpoints configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // Trip Management
  TRIPS: {
    LIST: '/trips',
    CREATE: '/trips',
    UPDATE: (id: string) => `/trips/${id}`,
    DELETE: (id: string) => `/trips/${id}`,
    APPROVE: (id: string) => `/trips/${id}/approve`,
    EXPORT: '/trips/export',
  },
  
  // Quick Orders
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    UPDATE: (id: string) => `/orders/${id}`,
    DELETE: (id: string) => `/orders/${id}`,
    BULK_UPDATE: '/orders/bulk',
  },
  
  // Billing
  BILLING: {
    LIST: '/billing',
    CREATE: '/billing',
    UPDATE: (id: string) => `/billing/${id}`,
    INVOICES: '/billing/invoices',
    PAYMENTS: '/billing/payments',
  },
  
  // User Preferences
  PREFERENCES: {
    GRID: (userId: string, gridId: string) => `/users/${userId}/preferences/grid/${gridId}`,
    FILTERS: (userId: string, gridId: string) => `/users/${userId}/preferences/filters/${gridId}`,
    LAYOUT: (userId: string) => `/users/${userId}/preferences/layout`,
  },
  
  // Reports & Analytics
  REPORTS: {
    DASHBOARD: '/reports/dashboard',
    TRIPS: '/reports/trips',
    FINANCIAL: '/reports/financial',
    EXPORT: (type: string) => `/reports/export/${type}`,
  },
};

// Query parameter builders
export const buildQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  return searchParams.toString();
};
