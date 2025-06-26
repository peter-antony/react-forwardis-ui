
import React from 'react';
import { Settings, Printer } from 'lucide-react';

export const AppFooter: React.FC = () => {
  return (
    <footer className="h-16 bg-white border-t border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <button className="w-9 h-9 bg-white-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-300">
          <Printer size={16} className="text-gray-600" />
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors">
          Cancel
        </button>
        <button className="px-4 py-2 text-blue-600 border border-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
          Save Draft
        </button>
        <button className="px-4 py-2 bg-blue-200 text-blue-800 font-medium rounded-lg hover:bg-blue-300 transition-colors">
          Confirm Trip
        </button>
      </div>
    </footer>
  );
};