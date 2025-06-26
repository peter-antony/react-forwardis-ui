
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('auth_token'),
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      console.log('🔐 Login process started');
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      console.log('✅ Login successful for user:', action.payload.user.email);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('auth_token', action.payload.token);
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      console.error('❌ Login failed:', action.payload);
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    logout: (state) => {
      console.log('👋 User logged out');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('auth_token');
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      console.log('👤 Updating user profile:', action.payload);
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
