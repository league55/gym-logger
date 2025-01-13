import React from 'react';
import { Plus } from 'lucide-react';
import { Exercise, Workout } from '../../types';
import { Timer } from '../Timer';
import { ExerciseList } from './ExerciseList';
import { EmptyWorkout } from './EmptyWorkout';

interface CurrentWorkoutProps {
  currentWorkout: Workout;
  onAddExercise: () => void;
  onFinishWorkout: () => void;
  onUpdateDate: (date: string) => void;
}

export function CurrentWorkout({
  currentWorkout,
  onAddExercise,
  onFinishWorkout,
  onUpdateDate
}: CurrentWorkoutProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Current Workout</h2>
        <Timer defaultTime={90} />
      </div>

      {currentWorkout.exercises.length === 0 ? (
        <EmptyWorkout onAddExercise={onAddExercise} />
      ) : (
        <div className="space-y-4">
          <ExerciseList exercises={currentWorkout.exercises} />
          <div className="flex justify-between mt-4">
            <button
              onClick={onAddExercise}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Exercise
            </button>
            <div className="flex items-center gap-4">
              <input
                type="date"
                id="workoutDate"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => onUpdateDate(e.target.value)}
              />
              <button
                onClick={onFinishWorkout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Finish Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}