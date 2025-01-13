import React from 'react';
import { X } from 'lucide-react';
import { ExerciseProgress } from './ExerciseProgress';
import { ExerciseStats } from '../../types';

interface ProgressModalProps {
  exerciseStats: ExerciseStats;
  onClose: () => void;
}

export function ProgressModal({ exerciseStats, onClose }: ProgressModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">{exerciseStats.name} Progress</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <ExerciseProgress
          history={exerciseStats.history}
          exerciseParameters={exerciseStats.parameters}
        />
      </div>
    </div>
  );
}