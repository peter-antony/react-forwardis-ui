
import React from 'react';
import { cn } from '@/lib/utils';

interface FlexGridLayoutProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
  responsive?: boolean;
}

export const FlexGridLayout: React.FC<FlexGridLayoutProps> = ({
  children,
  className,
  cols = 12,
  gap = 'md',
  responsive = true,
}) => {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-1 md:grid-cols-6 lg:grid-cols-12',
  };

  return (
    <div className={cn(
      'grid',
      responsive ? colClasses[cols] : `grid-cols-${cols}`,
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};
