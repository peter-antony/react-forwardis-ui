
// Dashboard types
export interface DashboardData {
  id: string;
  title: string;
  metrics: Array<{
    label: string;
    value: number;
    change: number;
  }>;
}
