import React from 'react';
import { Dumbbell, Plus } from 'lucide-react';

interface EmptyWorkoutProps {
  onAddExercise: () => void;
}

export function EmptyWorkout({ onAddExercise }: EmptyWorkoutProps) {
  return (
    <div className="text-center py-12">
      <Dumbbell className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No exercises added</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by adding your first exercise.</p>
      <div className="mt-6">
        <button
          onClick={onAddExercise}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Exercise
        </button>
      </div>
    </div>
  );
}