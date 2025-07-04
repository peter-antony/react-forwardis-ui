
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Eye, EyeOff, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfigurableSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  configurable?: boolean;
  onConfigClick?: () => void;
  className?: string;
  draggable?: boolean;
  visible?: boolean;
  onVisibilityToggle?: () => void;
}

export const ConfigurableSection: React.FC<ConfigurableSectionProps> = ({
  title,
  children,
  icon,
  collapsible = false,
  defaultCollapsed = false,
  configurable = false,
  onConfigClick,
  className,
  draggable = false,
  visible = true,
  onVisibilityToggle
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  if (!visible) return null;

  return (
    <Card className={cn('border border-gray-200 shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-4 border-b">
        <div className="flex items-center gap-2">
          {draggable && (
            <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
          )}
          {icon && <div className="text-gray-600">{icon}</div>}
          <CardTitle className="text-sm font-semibold text-gray-700">
            {title}
          </CardTitle>
        </div>
        
        <div className="flex items-center gap-1">
          {onVisibilityToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onVisibilityToggle}
              className="h-6 w-6 text-gray-400 hover:text-gray-600"
            >
              {visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            </Button>
          )}
          
          {configurable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onConfigClick}
              className="h-6 w-6 text-gray-400 hover:text-gray-600"
            >
              <Settings className="h-3 w-3" />
            </Button>
          )}
          
          {collapsible && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-6 w-6 text-gray-400 hover:text-gray-600"
            >
              {isCollapsed ? '▼' : '▲'}
            </Button>
          )}
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="px-4 py-4">
          {children}
        </CardContent>
      )}
    </Card>
  );
};
