
import React from 'react';
import { ErrorBoundary } from '../components/molecules/ErrorBoundary/ErrorBoundary';
import { Header } from '../components/organisms/Header/Header';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { APP_CONFIG } from '../config/app.config';
import { AppLayout } from '@/components/AppLayout';

const Dashboard: React.FC = () => {
  const { user } = useTypedSelector(state => state.auth);

  console.log('📊 Dashboard component rendered for user:', user?.name);

  return (
    <AppLayout>
      <ErrorBoundary>
        <div className="min-h-screen bg-background">
          {/* <Header /> */}
          
          <main className="container mx-auto px-4 py-6">
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-card rounded-lg border p-6">
                <h1 className="text-2xl font-bold mb-2">
                  Welcome back, {user?.name || 'User'}! 👋
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your tasks and projects today.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-card rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Tasks</h3>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-xs text-green-600">+2 from yesterday</p>
                </div>
                
                <div className="bg-card rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">In Progress</h3>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-blue-600">3 due today</p>
                </div>
                
                <div className="bg-card rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Completed</h3>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-green-600">+5 this week</p>
                </div>
                
                <div className="bg-card rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Overdue</h3>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-xs text-red-600">Needs attention</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 bg-muted/50 rounded">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">Task "Review API documentation" was completed</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </ErrorBoundary>
    </AppLayout>
  );
};

export default Dashboard;
