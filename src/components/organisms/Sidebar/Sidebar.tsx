
import React from 'react';
import { Home, Calendar, Truck, Users, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const menuItems = [
    { icon: Home, label: 'Home', active: false },
    { icon: Calendar, label: 'Trip Execution Management', active: true },
    { icon: Truck, label: 'Fleet Management', active: false },
    { icon: Users, label: 'Driver Management', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <aside className={cn(
      "bg-white border-r border-gray-200 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo Area */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          {!collapsed && <span className="font-semibold">Logistics</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  item.active 
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600" 
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
