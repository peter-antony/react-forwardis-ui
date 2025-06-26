
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ROUTES } from '../config/app.config';

const Index: React.FC = () => {
  const { isAuthenticated } = useTypedSelector(state => state.auth);

  console.log('🏠 Index page - authenticated:', isAuthenticated);

  // For now, always redirect to dashboard
  // In production, this would check authentication and redirect accordingly
  return <Navigate to={ROUTES.DASHBOARD} replace />;
};

export default Index;
