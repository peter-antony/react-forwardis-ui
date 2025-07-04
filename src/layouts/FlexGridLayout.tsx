
import React from 'react';
import { cn } from '@/lib/utils';

interface FlexGridSection {
  id: string;
  content: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
}

interface FlexGridLayoutProps {
  top?: FlexGridSection;
  left?: FlexGridSection;
  center: FlexGridSection;
  right?: FlexGridSection;
  bottom?: FlexGridSection;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}

export const FlexGridLayout: React.FC<FlexGridLayoutProps> = ({
  top,
  left,
  center,
  right,
  bottom,
  className,
  gap = 'md',
}) => {
  const gapClass = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  }[gap];

  const renderSection = (section: FlexGridSection) => (
    <div
      key={section.id}
      className={cn(
        'bg-white rounded-lg border border-gray-200 shadow-sm',
        section.className,
        section.collapsed && 'hidden'
      )}
    >
      {section.collapsible && (
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900">{section.id}</h3>
          <button
            onClick={section.onToggle}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {section.collapsed ? '▼' : '▲'}
          </button>
        </div>
      )}
      <div className={cn('p-4', section.collapsible && 'pt-0')}>
        {section.content}
      </div>
    </div>
  );

  return (
    <div className={cn('h-full flex flex-col', gapClass, className)}>
      {top && renderSection(top)}
      
      <div className={cn('flex-1 flex', gapClass)}>
        {left && (
          <div className="w-1/4 min-w-0">
            {renderSection(left)}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          {renderSection(center)}
        </div>
        
        {right && (
          <div className="w-1/4 min-w-0">
            {renderSection(right)}
          </div>
        )}
      </div>
      
      {bottom && renderSection(bottom)}
    </div>
  );
};
