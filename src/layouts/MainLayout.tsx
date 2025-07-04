
import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { AppHeader } from '@/components/AppHeader';
import { ErrorBoundary } from '@/components/molecules/ErrorBoundary/ErrorBoundary';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showSidebar = true,
  showHeader = true 
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Toaster />
        <Sonner />
        
        <div className="flex">
          {showSidebar && <AppSidebar />}
          
          <div className={`flex-1 flex flex-col min-w-0 ${showSidebar ? 'ml-16' : ''}`}>
            {showHeader && (
              <div className="fixed top-0 right-0 left-16 z-10">
                <AppHeader />
              </div>
            )}
            
            <main className={`flex-1 overflow-auto ${showHeader ? 'mt-16' : ''}`}>
              {children}
            </main>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};
