import React from 'react';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative bg-gradient-to-r from-slate-900 to-gray-900 border-b border-white/10">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center space-x-4">
          {/* Minimal Logo */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>

          {/* Clean Title */}
          <div className="text-center">
            <h1 className="text-3xl font-light bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent tracking-wide">
              True Defect Finder
            </h1>
            <div className="mt-2 w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;