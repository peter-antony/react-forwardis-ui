
import React from 'react';
import { Breadcrumb } from '@/components/Breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  breadcrumbs,
  actions,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto p-4 px-6 space-y-6">
        {breadcrumbs && (
          <div className="hidden md:block">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        
        {(title || actions) && (
          <div className="flex items-center justify-between">
            {title && (
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            )}
            {actions && (
              <div className="flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        )}
        
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};
