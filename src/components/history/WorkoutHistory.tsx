import React from 'react';
import { Workout } from '../../types';

interface WorkoutHistoryProps {
  workouts: Workout[];
}

export function WorkoutHistory({ workouts }: WorkoutHistoryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Workout History</h2>
      {workouts.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No workout history yet.</p>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">{workout.name}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(workout.date).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {workout.exercises.length} exercises · {workout.duration} minutes
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}