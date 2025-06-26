
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APP_CONFIG } from '../../config/app.config';
import type { RootState } from '../index';

const baseQuery = fetchBaseQuery({
  baseUrl: APP_CONFIG.api.baseUrl,
  timeout: APP_CONFIG.api.timeout,
  prepareHeaders: (headers, { getState }) => {
    console.log('🔗 API Request:', {
      baseUrl: APP_CONFIG.api.baseUrl,
      timestamp: new Date().toISOString(),
    });

    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('content-type', 'application/json');
    return headers;
  },
});

const baseQueryWithRetry = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status === 401) {
    console.warn('🔐 Authentication error detected, redirecting to login');
    // Handle auth error - redirect to login or refresh token
  }

  // Retry logic for failed requests
  if (result.error && extraOptions?.maxRetries > 0) {
    console.log(`🔄 Retrying request, attempts left: ${extraOptions.maxRetries}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return baseQueryWithRetry(args, api, {
      ...extraOptions,
      maxRetries: extraOptions.maxRetries - 1,
    });
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Task', 'User', 'Project'],
  endpoints: () => ({}),
});
