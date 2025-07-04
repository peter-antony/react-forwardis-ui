
import React from 'react';
import { Home, Package, MapPinned, Truck, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ 
  collapsed = false,
  onToggle 
}) => {
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Package, label: 'Inventory', path: '/quick-order' },
    { icon: MapPinned, label: 'Route Management', path: '/trip-plans-search-hub' },
    { icon: Truck, label: 'Fleet Management', path: '/create-new-trip' },
  ];

  return (
    <div className={cn(
      'h-full bg-white border-r border-gray-200 flex flex-col items-center py-4 transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className="w-8 h-8 flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2.5 10H12.5M2.5 5H17.5M2.5 15H17.5" stroke="#475467" />
        </svg>
      </div>
      
      {/* Menu Items */}
      <div className="flex flex-col space-y-3 flex-1 w-full px-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center rounded-lg transition-colors',
                collapsed ? 'w-10 h-10 justify-center' : 'w-full h-10 px-3',
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              )
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={20} />
            {!collapsed && (
              <span className="ml-3 text-sm font-medium">{item.label}</span>
            )}
          </NavLink>
        ))}
      </div>
      
      {/* Bottom Icons */}
      <div className="flex flex-col space-y-3 mt-auto w-full px-2">
        {onToggle && (
          <button
            onClick={onToggle}
            className={cn(
              'flex items-center rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors',
              collapsed ? 'w-10 h-10 justify-center' : 'w-full h-10 px-3'
            )}
            title={collapsed ? 'Settings' : undefined}
          >
            <Settings size={20} />
            {!collapsed && (
              <span className="ml-3 text-sm font-medium">Settings</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
