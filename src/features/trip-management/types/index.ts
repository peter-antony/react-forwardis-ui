
export interface Trip {
  id: string;
  tripPlanNo: string;
  status: 'Released' | 'Under Execution' | 'Initiated' | 'Cancelled' | 'Deleted' | 'Confirmed';
  tripBillingStatus: 'Draft Bill Raised' | 'Not Eligible' | 'Revenue Leakage' | 'Invoice Created' | 'Invoice Approved';
  plannedStartDateTime: string;
  plannedEndDateTime: string;
  actualStartDateTime: string;
  actualEndDateTime: string;
  departurePoint: string;
  arrivalPoint: string;
  customer: string;
  resources: string;
}

export interface TripFilters {
  status?: string[];
  billingStatus?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  customer?: string;
}
