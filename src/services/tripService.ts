
import { api } from './api';
import { API_ENDPOINTS, buildQueryParams } from './endpoints';

export interface Trip {
  id: string;
  title: string;
  status: 'draft' | 'pending' | 'approved' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  startDate: string;
  endDate: string;
  budget: number;
  description?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TripFilters {
  status?: string[];
  priority?: string[];
  assignee?: string[];
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  search?: string;
}

export interface TripQueryParams extends TripFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface TripResponse {
  data: Trip[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Trip service functions
export const tripService = {
  // Get trips with filtering, sorting, and pagination
  getTrips: async (params: TripQueryParams = {}): Promise<TripResponse> => {
    const queryString = buildQueryParams(params);
    const url = `${API_ENDPOINTS.TRIPS.LIST}?${queryString}`;
    return api.get<TripResponse>(url);
  },

  // Get single trip by ID
  getTrip: async (id: string): Promise<Trip> => {
    return api.get<Trip>(`${API_ENDPOINTS.TRIPS.LIST}/${id}`);
  },

  // Create new trip
  createTrip: async (tripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> => {
    return api.post<Trip>(API_ENDPOINTS.TRIPS.CREATE, tripData);
  },

  // Update existing trip
  updateTrip: async (id: string, tripData: Partial<Trip>): Promise<Trip> => {
    return api.put<Trip>(API_ENDPOINTS.TRIPS.UPDATE(id), tripData);
  },

  // Delete trip
  deleteTrip: async (id: string): Promise<void> => {
    return api.delete<void>(API_ENDPOINTS.TRIPS.DELETE(id));
  },

  // Approve trip
  approveTrip: async (id: string, approvalData?: any): Promise<Trip> => {
    return api.post<Trip>(API_ENDPOINTS.TRIPS.APPROVE(id), approvalData);
  },

  // Bulk update trips
  bulkUpdateTrips: async (updates: Array<{ id: string; data: Partial<Trip> }>): Promise<Trip[]> => {
    return api.post<Trip[]>(`${API_ENDPOINTS.TRIPS.LIST}/bulk`, { updates });
  },

  // Export trips
  exportTrips: async (params: TripQueryParams = {}, format: 'csv' | 'excel' = 'csv'): Promise<Blob> => {
    const queryString = buildQueryParams({ ...params, format });
    const url = `${API_ENDPOINTS.TRIPS.EXPORT}?${queryString}`;
    
    const response = await api.get<Blob>(url, {
      responseType: 'blob'
    });
    
    return response;
  },
};
