import React, { useState, useEffect } from 'react';
import { Dumbbell, Plus, Calendar, ChevronRight, Award, LineChart, User, X } from 'lucide-react';
import { Exercise, Workout, BodyMeasurements, Achievement } from './types';
import { Timer } from './components/Timer';
import { ExerciseForm } from './components/ExerciseForm';
import { ExerciseProgress } from './components/ExerciseProgress';

function App() {
  const [activeTab, setActiveTab] = useState<'workout' | 'history' | 'progress' | 'profile'>('workout');
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    const saved = localStorage.getItem('workouts');
    return saved ? JSON.parse(saved) : [];
  });
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [currentWorkout, setCurrentWorkout] = useState<Workout>({
    id: crypto.randomUUID(),
    name: `Workout ${new Date().toLocaleDateString()}`,
    type: 'push',
    exercises: [],
    date: new Date().toISOString(),
    duration: 0,
    notes: ''
  });

  const exerciseStats = React.useMemo(() => {
    const stats = new Map<string, { count: number; history: Array<{ date: string; weight: number }> }>();
    
    workouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        const existing = stats.get(exercise.name) || { count: 0, history: [] };
        stats.set(exercise.name, {
          count: existing.count + 1,
          history: [...existing.history, {
            date: workout.date,
            weight: exercise.difficulty === 'beginner' ? 10 : exercise.difficulty === 'intermediate' ? 20 : 30
          }]
        });
      });
    });

    return Array.from(stats.entries())
      .map(([name, data]) => ({
        name,
        count: data.count,
        history: data.history
      }))
      .sort((a, b) => b.count - a.count);
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
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
    setShowExerciseForm(false);
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">GymTracker Pro</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('workout')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'workout' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Workout
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'history' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'progress' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Progress
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>
        </header>

        <main className="py-6">
          {activeTab === 'workout' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Current Workout</h2>
                  <Timer defaultTime={90} />
                </div>

                {currentWorkout.exercises.length === 0 ? (
                  <div className="text-center py-12">
                    <Dumbbell className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No exercises added</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding your first exercise.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => setShowExerciseForm(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Exercise
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentWorkout.exercises.map((exercise) => (
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
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setShowExerciseForm(true)}
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
                          onChange={(e) => {
                            setCurrentWorkout({
                              ...currentWorkout,
                              date: new Date(e.target.value).toLocaleDateString()
                            });
                          }}
                        />
                        <button
                          onClick={handleFinishWorkout}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                        >
                        Finish Workout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div> 
              {showExerciseForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                  <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Add Exercise</h3>
                      <button
                        onClick={() => setShowExerciseForm(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <ExerciseForm
                      onSubmit={handleAddExercise}
                      onCancel={() => setShowExerciseForm(false)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
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
          )}

          {activeTab === 'progress' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Exercise Progress</h2>
              <div className="space-y-4">
                {exerciseStats.map(({ name, count, history }) => (
                  <button
                    key={name}
                    onClick={() => setSelectedExercise(name)}
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

              {selectedExercise && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                  <div className="relative top-20 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">{selectedExercise} Progress</h3>
                      <button
                        onClick={() => setSelectedExercise(null)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <ExerciseProgress
                      history={exerciseStats.find(stat => stat.name === selectedExercise)?.history || []}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile</h2>
              <p className="text-gray-500">Profile features coming soon...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;