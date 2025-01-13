import React from 'react';
import { Dumbbell } from 'lucide-react';
import { NavBar } from './NavBar';
import { ActiveTab } from '../../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">GymTracker Pro</h1>
        </div>
        <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </header>
  );
}