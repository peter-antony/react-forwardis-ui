
import { useState, useEffect } from 'react';
import { TripPlan } from '../types/tripPlan';
import { TRIP_STATUS, BILLING_STATUS } from '../config/app.config';

export const useTripPlans = () => {
  const [tripPlans, setTripPlans] = useState<TripPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTripPlans = async () => {
      try {
        setLoading(true);
        // Mock data - replace with actual API call
        const mockData: TripPlan[] = [
          {
            id: '1',
            tripPlanNo: 'TP001',
            status: TRIP_STATUS.RELEASED,
            tripBillingStatus: BILLING_STATUS.DRAFT_BILL_RAISED,
            plannedStartDateTime: '2024-01-15 08:00',
            plannedEndDateTime: '2024-01-15 18:00',
            actualStartDateTime: '2024-01-15 08:15',
            actualEndDateTime: '2024-01-15 17:45',
            departurePoint: 'Warehouse A',
            arrivalPoint: 'Customer Site B',
            customer: 'ABC Corp',
            resources: 'Driver: John Doe, Vehicle: TR001'
          },
          {
            id: '2',
            tripPlanNo: 'TP002',
            status: TRIP_STATUS.UNDER_EXECUTION,
            tripBillingStatus: BILLING_STATUS.NOT_ELIGIBLE,
            plannedStartDateTime: '2024-01-16 09:00',
            plannedEndDateTime: '2024-01-16 19:00',
            actualStartDateTime: '2024-01-16 09:00',
            actualEndDateTime: '',
            departurePoint: 'Depot C',
            arrivalPoint: 'Distribution Center D',
            customer: 'XYZ Ltd',
            resources: 'Driver: Jane Smith, Vehicle: TR002'
          }
        ];
        
        setTripPlans(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch trip plans');
        console.error('Error fetching trip plans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTripPlans();
  }, []);

  return { tripPlans, loading, error };
};
