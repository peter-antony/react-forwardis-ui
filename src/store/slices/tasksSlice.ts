
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../../types';
import { TASK_STATUS, TASK_PRIORITY } from '../../config/app.config';

interface TasksState {
  selectedTasks: string[];
  taskFilters: {
    status: string[];
    priority: string[];
    assignee: string[];
    tags: string[];
  };
  sortBy: keyof Task;
  sortOrder: 'asc' | 'desc';
  viewMode: 'list' | 'kanban' | 'calendar';
}

const initialState: TasksState = {
  selectedTasks: [],
  taskFilters: {
    status: [],
    priority: [],
    assignee: [],
    tags: [],
  },
  sortBy: 'createdAt',
  sortOrder: 'desc',
  viewMode: 'list',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    selectTask: (state, action: PayloadAction<string>) => {
      console.log('✅ Selecting task:', action.payload);
      if (!state.selectedTasks.includes(action.payload)) {
        state.selectedTasks.push(action.payload);
      }
    },

    deselectTask: (state, action: PayloadAction<string>) => {
      console.log('❌ Deselecting task:', action.payload);
      state.selectedTasks = state.selectedTasks.filter(id => id !== action.payload);
    },

    toggleTaskSelection: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      console.log('🔀 Toggling task selection:', taskId);
      
      if (state.selectedTasks.includes(taskId)) {
        state.selectedTasks = state.selectedTasks.filter(id => id !== taskId);
      } else {
        state.selectedTasks.push(taskId);
      }
    },

    selectAllTasks: (state, action: PayloadAction<string[]>) => {
      console.log('📋 Selecting all tasks:', action.payload.length);
      state.selectedTasks = action.payload;
    },

    clearSelectedTasks: (state) => {
      console.log('🧹 Clearing selected tasks');
      state.selectedTasks = [];
    },

    setTaskFilters: (state, action: PayloadAction<Partial<TasksState['taskFilters']>>) => {
      console.log('🔍 Setting task filters:', action.payload);
      state.taskFilters = { ...state.taskFilters, ...action.payload };
    },

    setSortBy: (state, action: PayloadAction<keyof Task>) => {
      console.log('📊 Setting sort by:', action.payload);
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload;
        state.sortOrder = 'asc';
      }
    },

    setViewMode: (state, action: PayloadAction<'list' | 'kanban' | 'calendar'>) => {
      console.log('👁️ Setting view mode:', action.payload);
      state.viewMode = action.payload;
    },

    resetFilters: (state) => {
      console.log('🔄 Resetting task filters');
      state.taskFilters = initialState.taskFilters;
      state.sortBy = initialState.sortBy;
      state.sortOrder = initialState.sortOrder;
    },
  },
});

export const {
  selectTask,
  deselectTask,
  toggleTaskSelection,
  selectAllTasks,
  clearSelectedTasks,
  setTaskFilters,
  setSortBy,
  setViewMode,
  resetFilters,
} = tasksSlice.actions;

export default tasksSlice.reducer;
