
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: keyof typeof import('../config/app.config').TASK_STATUS;
  priority: keyof typeof import('../config/app.config').TASK_PRIORITY;
  assignee?: User;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'manager';
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  tasks: Task[];
  members: User[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ApiError {
  message: string;
  code: number;
  details?: Record<string, any>;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface GenericFormProps<T> {
  data?: T;
  onSubmit: (data: T) => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  render?: (value: any, record: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

export interface FilterConfig {
  type: 'text' | 'select' | 'date' | 'multiselect';
  label: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
}
