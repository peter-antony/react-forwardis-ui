
import React from 'react';
import { cn } from '@/lib/utils';

interface FlexGridLayoutProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const FlexGridLayout: React.FC<FlexGridLayoutProps> = ({
  children,
  columns = 1,
  gap = 'md',
  className
}) => {
  const getGridCols = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 lg:grid-cols-2';
      case 3: return 'grid-cols-1 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 6: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6';
      case 12: return 'grid-cols-12';
      default: return 'grid-cols-1';
    }
  };

  const getGap = () => {
    switch (gap) {
      case 'sm': return 'gap-2';
      case 'md': return 'gap-4';
      case 'lg': return 'gap-6';
      case 'xl': return 'gap-8';
      default: return 'gap-4';
    }
  };

  return (
    <div className={cn('grid', getGridCols(), getGap(), className)}>
      {children}
    </div>
  );
};
