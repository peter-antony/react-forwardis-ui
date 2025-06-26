
import { baseApi } from './baseApi';
import type { Task, ApiResponse } from '../../types';
import { APP_CONFIG } from '../../config/app.config';

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<ApiResponse<Task[]>, {
      page?: number;
      limit?: number;
      status?: string;
      priority?: string;
      search?: string;
    }>({
      query: (params) => {
        console.log('📋 Fetching tasks with params:', params);
        return {
          url: '/tasks',
          params: {
            page: params.page || 1,
            limit: params.limit || APP_CONFIG.ui.itemsPerPage,
            ...params,
          },
        };
      },
      providesTags: ['Task'],
      transformResponse: (response: ApiResponse<Task[]>) => {
        console.log('✅ Tasks fetched successfully:', response.data.length, 'items');
        return response;
      },
    }),

    getTask: builder.query<ApiResponse<Task>, string>({
      query: (id) => {
        console.log('📄 Fetching task:', id);
        return `/tasks/${id}`;
      },
      providesTags: (result, error, id) => [{ type: 'Task', id }],
    }),

    createTask: builder.mutation<ApiResponse<Task>, Partial<Task>>({
      query: (task) => {
        console.log('➕ Creating new task:', task.title);
        return {
          url: '/tasks',
          method: 'POST',
          body: task,
        };
      },
      invalidatesTags: ['Task'],
      transformResponse: (response: ApiResponse<Task>) => {
        console.log('✅ Task created successfully:', response.data.id);
        return response;
      },
    }),

    updateTask: builder.mutation<ApiResponse<Task>, { id: string; updates: Partial<Task> }>({
      query: ({ id, updates }) => {
        console.log('📝 Updating task:', id, updates);
        return {
          url: `/tasks/${id}`,
          method: 'PATCH',
          body: updates,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),

    deleteTask: builder.mutation<ApiResponse<void>, string>({
      query: (id) => {
        console.log('🗑️ Deleting task:', id);
        return {
          url: `/tasks/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
