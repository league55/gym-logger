import React from 'react';
import { ActiveTab } from '../../types';

interface NavBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export function NavBar({ activeTab, setActiveTab }: NavBarProps) {
  const tabs: ActiveTab[] = ['workout', 'history', 'progress', 'profile'];

  return (
    <nav className="flex space-x-4">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </nav>
  );
}