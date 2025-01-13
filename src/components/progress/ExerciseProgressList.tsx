import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ExerciseStats } from '../../types';

interface ExerciseProgressListProps {
  exerciseStats: ExerciseStats[];
  onSelectExercise: (name: string) => void;
}

export function ExerciseProgressList({ exerciseStats, onSelectExercise }: ExerciseProgressListProps) {
  return (
    <div className="space-y-4">
      {exerciseStats.map(({ name, count }) => (
        <button
          key={name}
          onClick={() => onSelectExercise(name)}
          className="w-full text-left border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {count} {count === 1 ? 'time' : 'times'}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}