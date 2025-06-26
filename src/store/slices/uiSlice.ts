
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  loading: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: number;
  }>;
  modal: {
    open: boolean;
    component: string | null;
    props: Record<string, any>;
  };
  filters: Record<string, any>;
  searchQuery: string;
}

const initialState: UiState = {
  sidebarOpen: true,
  loading: false,
  theme: 'system',
  notifications: [],
  modal: {
    open: false,
    component: null,
    props: {},
  },
  filters: {},
  searchQuery: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      console.log('🔀 Toggling sidebar:', !state.sidebarOpen);
      state.sidebarOpen = !state.sidebarOpen;
    },

    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      console.log('📐 Setting sidebar open:', action.payload);
      state.sidebarOpen = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      console.log('⏳ Setting loading state:', action.payload);
      state.loading = action.payload;
    },

    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      console.log('🎨 Setting theme:', action.payload);
      state.theme = action.payload;
    },

    addNotification: (state, action: PayloadAction<Omit<UiState['notifications'][0], 'id' | 'timestamp'>>) => {
      const notification = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
      };
      console.log('🔔 Adding notification:', notification);
      state.notifications.push(notification);
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      console.log('🔕 Removing notification:', action.payload);
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },

    openModal: (state, action: PayloadAction<{ component: string; props?: Record<string, any> }>) => {
      console.log('🪟 Opening modal:', action.payload.component);
      state.modal = {
        open: true,
        component: action.payload.component,
        props: action.payload.props || {},
      };
    },

    closeModal: (state) => {
      console.log('❌ Closing modal');
      state.modal = {
        open: false,
        component: null,
        props: {},
      };
    },

    setFilters: (state, action: PayloadAction<Record<string, any>>) => {
      console.log('🔍 Setting filters:', action.payload);
      state.filters = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      console.log('🔎 Setting search query:', action.payload);
      state.searchQuery = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setLoading,
  setTheme,
  addNotification,
  removeNotification,
  openModal,
  closeModal,
  setFilters,
  setSearchQuery,
} = uiSlice.actions;

export default uiSlice.reducer;
