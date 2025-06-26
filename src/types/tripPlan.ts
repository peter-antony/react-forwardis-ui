
export interface TripPlan {
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
