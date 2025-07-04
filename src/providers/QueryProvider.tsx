import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client with optimized defaults for ERP application
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache for 5 minutes by default
      staleTime: 5 * 60 * 1000,
      // Keep inactive queries in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry failed requests twice
      retry: 2,
      // Retry with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus for real-time accuracy
      refetchOnWindowFocus: true,
      // Don't refetch on reconnect by default
      refetchOnReconnect: 'always',
      // Background refetch interval (15 minutes)
      refetchInterval: 15 * 60 * 1000,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
      // Shorter retry delay for mutations
      retryDelay: 1000,
    },
  },
});

// Add global error handling
queryClient.setQueryDefaults(['trips'], {
  staleTime: 2 * 60 * 1000, // Trips data stale after 2 minutes
});

queryClient.setQueryDefaults(['orders'], {
  staleTime: 1 * 60 * 1000, // Orders data stale after 1 minute
});

queryClient.setQueryDefaults(['preferences'], {
  staleTime: 30 * 60 * 1000, // User preferences stale after 30 minutes
  gcTime: 60 * 60 * 1000, // Keep preferences in cache for 1 hour
});

// Log query cache events for debugging
if (process.env.NODE_ENV === 'development') {
  queryClient.getQueryCache().subscribe((event) => {
    console.log('🔄 Query Cache Event:', {
      type: event.type,
      query: event.query.queryKey,
      timestamp: new Date().toISOString()
    });
  });

  queryClient.getMutationCache().subscribe((event) => {
    console.log('🔄 Mutation Cache Event:', {
      type: event.type,
      mutation: event.mutation.options.mutationKey,
      timestamp: new Date().toISOString()
    });
  });
}

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false} 
          position="bottom"
        />
      )}
    </QueryClientProvider>
  );
}

export { queryClient };
