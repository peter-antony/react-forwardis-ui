
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './api/baseApi';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    // API reducer (single base API)
    [baseApi.reducerPath]: baseApi.reducer,
    
    // Local state reducers
    ui: uiReducer,
    auth: authReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
        ],
      },
    })
      .concat(baseApi.middleware), // Only add base API middleware once
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Console logging for debugging
console.log('🏪 Redux store initialized with middleware:', {
  api: baseApi.reducerPath,
  slices: ['ui', 'auth', 'tasks'],
  timestamp: new Date().toISOString(),
});
