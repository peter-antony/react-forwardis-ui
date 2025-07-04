
import React from 'react';
import { cn } from '@/lib/utils';

interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftWidth?: 'narrow' | 'balanced' | 'wide';
  className?: string;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  left,
  right,
  leftWidth = 'balanced',
  className
}) => {
  const getLeftWidth = () => {
    switch (leftWidth) {
      case 'narrow': return 'w-1/3';
      case 'balanced': return 'w-1/2';
      case 'wide': return 'w-2/3';
      default: return 'w-1/2';
    }
  };

  const getRightWidth = () => {
    switch (leftWidth) {
      case 'narrow': return 'w-2/3';
      case 'balanced': return 'w-1/2';
      case 'wide': return 'w-1/3';
      default: return 'w-1/2';
    }
  };

  return (
    <div className={cn('flex gap-6', className)}>
      <div className={getLeftWidth()}>
        {left}
      </div>
      <div className={getRightWidth()}>
        {right}
      </div>
    </div>
  );
};
