
import { baseApi } from './baseApi';
import type { User, ApiResponse } from '../../types';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<User[]>, void>({
      query: () => {
        console.log('👥 Fetching users');
        return '/users';
      },
      providesTags: ['User'],
    }),

    getUser: builder.query<ApiResponse<User>, string>({
      query: (id) => {
        console.log('👤 Fetching user:', id);
        return `/users/${id}`;
      },
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    updateUser: builder.mutation<ApiResponse<User>, { id: string; updates: Partial<User> }>({
      query: ({ id, updates }) => {
        console.log('✏️ Updating user:', id, updates);
        return {
          url: `/users/${id}`,
          method: 'PATCH',
          body: updates,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} = usersApi;
