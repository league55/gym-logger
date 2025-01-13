import { useState, useEffect, useMemo } from 'react';
import { Workout, Exercise, ExerciseStats } from '../types';

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    const saved = localStorage.getItem('workouts');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentWorkout, setCurrentWorkout] = useState<Workout>(() => ({
    id: crypto.randomUUID(),
    name: `Workout ${new Date().toLocaleDateString()}`,
    type: 'push',
    exercises: [],
    date: new Date().toISOString(),
    duration: 0,
    notes: ''
  }));

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const exerciseStats = useMemo(() => {
    const stats = new Map<string, ExerciseStats>();
    
    workouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        const existing = stats.get(exercise.name) || {
          name: exercise.name,
          count: 0,
          parameters: exercise.parameters,
          history: []
        };
        
        stats.set(exercise.name, {
          ...existing,
          count: existing.count + 1,
          history: [...existing.history, {
            date: workout.date,
            parameters: exercise.sets[0]?.parameters || {}
          }]
        });
      });
    });

    return Array.from(stats.values())
      .sort((a, b) => b.count - a.count);
  }, [workouts]);

  const handleAddExercise = (exercise: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exercise,
      id: crypto.randomUUID()
    };
    
    setCurrentWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }));
  };

  const handleFinishWorkout = () => {
    setWorkouts(prev => [...prev, currentWorkout]);
    setCurrentWorkout({
      id: crypto.randomUUID(),
      name: `Workout ${new Date().toLocaleDateString()}`,
      type: 'push',
      exercises: [],
      date: new Date().toISOString(),
      duration: 0,
      notes: ''
    });
  };

  const handleUpdateWorkoutDate = (date: string) => {
    setCurrentWorkout(prev => ({
      ...prev,
      date: new Date(date).toLocaleDateString()
    }));
  };

  return {
    workouts,
    currentWorkout,
    exerciseStats,
    handleAddExercise,
    handleFinishWorkout,
    handleUpdateWorkoutDate
  };
}