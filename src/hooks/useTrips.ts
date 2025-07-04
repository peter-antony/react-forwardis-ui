
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripService, TripQueryParams, Trip } from '../services/tripService';
import { useToast } from './use-toast';

// Query keys for React Query
export const TRIP_QUERY_KEYS = {
  all: ['trips'] as const,
  lists: () => [...TRIP_QUERY_KEYS.all, 'list'] as const,
  list: (params: TripQueryParams) => [...TRIP_QUERY_KEYS.lists(), params] as const,
  details: () => [...TRIP_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...TRIP_QUERY_KEYS.details(), id] as const,
};

// Hook for fetching trips with caching and background refresh
export function useTrips(params: TripQueryParams = {}) {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: TRIP_QUERY_KEYS.list(params),
    queryFn: async () => {
      try {
        return await tripService.getTrips(params);
      } catch (error: any) {
        console.error('Failed to fetch trips:', error);
        toast({
          title: "Error",
          description: "Failed to load trips. Please try again.",
          variant: "destructive"
        });
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 2
  });
}

// Hook for fetching single trip
export function useTrip(id: string) {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: TRIP_QUERY_KEYS.detail(id),
    queryFn: async () => {
      try {
        return await tripService.getTrip(id);
      } catch (error: any) {
        console.error('Failed to fetch trip:', error);
        toast({
          title: "Error",
          description: "Failed to load trip details.",
          variant: "destructive"
        });
        throw error;
      }
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  });
}

// Hook for creating trips with optimistic updates
export function useCreateTrip() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: tripService.createTrip,
    onSuccess: (newTrip) => {
      // Invalidate and refetch trips list
      queryClient.invalidateQueries({ queryKey: TRIP_QUERY_KEYS.lists() });
      
      toast({
        title: "Success",
        description: "Trip created successfully"
      });
    },
    onError: (error: any) => {
      console.error('Failed to create trip:', error);
      toast({
        title: "Error",
        description: "Failed to create trip. Please try again.",
        variant: "destructive"
      });
    }
  });
}

// Hook for updating trips with optimistic updates
export function useUpdateTrip() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (variables: { id: string; data: Partial<Trip> }) => 
      tripService.updateTrip(variables.id, variables.data),
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: TRIP_QUERY_KEYS.detail(variables.id) });
      
      // Snapshot previous value
      const previousTrip = queryClient.getQueryData(TRIP_QUERY_KEYS.detail(variables.id));
      
      // Optimistically update - ensure we have valid data to spread
      if (previousTrip && variables.data) {
        queryClient.setQueryData(TRIP_QUERY_KEYS.detail(variables.id), {
          ...previousTrip as Trip,
          ...variables.data,
          updatedAt: new Date().toISOString()
        });
      }
      
      return { previousTrip };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context && context.previousTrip) {
        queryClient.setQueryData(TRIP_QUERY_KEYS.detail(variables.id), context.previousTrip);
      }
      
      console.error('Failed to update trip:', error);
      toast({
        title: "Error",
        description: "Failed to update trip. Please try again.",
        variant: "destructive"
      });
    },
    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: TRIP_QUERY_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: TRIP_QUERY_KEYS.lists() });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Trip updated successfully"
      });
    }
  });
}

// Hook for deleting trips
export function useDeleteTrip() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: tripService.deleteTrip,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: TRIP_QUERY_KEYS.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: TRIP_QUERY_KEYS.lists() });
      
      toast({
        title: "Success",
        description: "Trip deleted successfully"
      });
    },
    onError: (error: any) => {
      console.error('Failed to delete trip:', error);
      toast({
        title: "Error",
        description: "Failed to delete trip. Please try again.",
        variant: "destructive"
      });
    }
  });
}

// Hook for bulk operations
export function useBulkUpdateTrips() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: tripService.bulkUpdateTrips,
    onSuccess: (updatedTrips) => {
      // Invalidate all trips queries
      queryClient.invalidateQueries({ queryKey: TRIP_QUERY_KEYS.all });
      
      toast({
        title: "Success",
        description: `${updatedTrips.length} trips updated successfully`
      });
    },
    onError: (error: any) => {
      console.error('Failed to bulk update trips:', error);
      toast({
        title: "Error",
        description: "Failed to update trips. Please try again.",
        variant: "destructive"
      });
    }
  });
}
