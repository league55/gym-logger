import React from 'react';
import { Button } from '../common/Button';

interface ParameterToggleProps {
  name: string;
  label: string;
  unit: string;
  value: string;
  isEnabled: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}

export function ParameterToggle({
  name,
  label,
  unit,
  value,
  isEnabled,
  onToggle,
  onChange
}: ParameterToggleProps) {
  return (
    <div className="space-y-2">
      <Button
        variant={isEnabled ? 'primary' : 'secondary'}
        onClick={onToggle}
      >
        {label}
      </Button>
      
      {isEnabled && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.1"
            placeholder="0"
          />
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
      )}
    </div>
  );
}