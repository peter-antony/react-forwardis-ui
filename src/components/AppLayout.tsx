
import React, { useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className=''>
      <div className="min-h-screen bg-gray-50 flex">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0 ml-16">
          <div className="fixed top-0 right-0 left-16 z-10">
            <AppHeader />
          </div>
          
          <main className="flex-1 overflow-auto pb-0 mt-16">
            {children}
          </main>

          <div className="">
            <AppFooter />
          </div>
        </div>
      </div>
    </div>
  );
};
