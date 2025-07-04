
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { AppSidebar } from '@/components/AppSidebar';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';

interface BaseLayoutProps {
  className?: string;
  showSidebar?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  className,
  showSidebar = true,
  showHeader = true,
  showFooter = false,
  sidebarCollapsed = false,
  onSidebarToggle,
}) => {
  const [internalSidebarCollapsed, setInternalSidebarCollapsed] = useState(sidebarCollapsed);

  const handleSidebarToggle = () => {
    if (onSidebarToggle) {
      onSidebarToggle();
    } else {
      setInternalSidebarCollapsed(!internalSidebarCollapsed);
    }
  };

  const sidebarWidth = internalSidebarCollapsed ? 'w-16' : 'w-64';
  const mainMargin = showSidebar ? (internalSidebarCollapsed ? 'ml-16' : 'ml-64') : 'ml-0';

  return (
    <div className={cn('min-h-screen bg-gray-50 flex', className)}>
      {showSidebar && (
        <div className={cn('fixed left-0 top-0 h-full z-30 transition-all duration-300', sidebarWidth)}>
          <AppSidebar collapsed={internalSidebarCollapsed} onToggle={handleSidebarToggle} />
        </div>
      )}
      
      <div className={cn('flex-1 flex flex-col min-w-0 transition-all duration-300', mainMargin)}>
        {showHeader && (
          <div className="sticky top-0 z-20">
            <AppHeader onToggleSidebar={handleSidebarToggle} />
          </div>
        )}
        
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>

        {showFooter && (
          <div className="mt-auto">
            <AppFooter />
          </div>
        )}
      </div>
    </div>
  );
};
