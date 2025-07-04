
import { useState } from 'react';

// Placeholder hook - will be implemented later
export const useTripPlans = () => {
  const [tripPlans, setTripPlans] = useState([]);
  return { tripPlans, setTripPlans };
};
