import React from 'react';
import { Exercise } from '../../types';

interface ExerciseListProps {
  exercises: Exercise[];
}

export function ExerciseList({ exercises }: ExerciseListProps) {
  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="border rounded-lg p-4 hover:bg-gray-50"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">{exercise.name}</h3>
            <span className="text-sm text-gray-500">{exercise.category}</span>
          </div>
          {exercise.notes && (
            <p className="mt-1 text-sm text-gray-500">{exercise.notes}</p>
          )}
        </div>
      ))}
    </div>
  );
}