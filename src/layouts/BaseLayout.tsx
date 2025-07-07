
import React from 'react';
import { cn } from '@/lib/utils';

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  className,
  sidebar,
  header,
  footer,
}) => {
  return (
    <div className={cn("min-h-screen bg-gray-50", className)}>
      {header && (
        <header className="sticky top-0 z-50 bg-white border-b">
          {header}
        </header>
      )}
      
      <div className="flex min-h-screen">
        {sidebar && (
          <aside className="flex-shrink-0">
            {sidebar}
          </aside>
        )}
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      
      {footer && (
        <footer className="bg-white border-t">
          {footer}
        </footer>
      )}
    </div>
  );
};
