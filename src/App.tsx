import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { CurrentWorkout } from './components/workout/CurrentWorkout';
import { WorkoutHistory } from './components/history/WorkoutHistory';
import { ExerciseProgressList } from './components/progress/ExerciseProgressList';
import { ProgressModal } from './components/progress/ProgressModal';
import { Profile } from './components/profile/Profile';
import { ExerciseForm } from './components/exercise/ExerciseForm';
import { Modal } from './components/common/Modal';
import { useWorkouts } from './hooks/useWorkouts';
import { ActiveTab } from './types';
import { ExerciseProgress } from './components/progress/ExerciseProgress';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('workout');
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  
  const {
    workouts,
    currentWorkout,
    exerciseStats,
    handleAddExercise,
    handleFinishWorkout,
    handleUpdateWorkoutDate
  } = useWorkouts();

  const selectedExerciseStats = selectedExercise 
    ? exerciseStats.find(stat => stat.name === selectedExercise)
    : null;

  const renderContent = () => {
    switch (activeTab) {
      case 'workout':
        return (
          <div className="space-y-6">
            <CurrentWorkout
              currentWorkout={currentWorkout}
              onAddExercise={() => setShowExerciseForm(true)}
              onFinishWorkout={handleFinishWorkout}
              onUpdateDate={handleUpdateWorkoutDate}
            />
          </div>
        );
      case 'history':
        return <WorkoutHistory workouts={workouts} />;
      case 'progress':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Exercise Progress</h2>
            <ExerciseProgressList
              exerciseStats={exerciseStats}
              onSelectExercise={setSelectedExercise}
            />
          </div>
        );
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="py-6">
          {renderContent()}

          {showExerciseForm && (
            <Modal onClose={() => setShowExerciseForm(false)}>
              <ExerciseForm
                onSubmit={(exercise) => {
                  handleAddExercise(exercise);
                  setShowExerciseForm(false);
                }}
                onCancel={() => setShowExerciseForm(false)}
              />
            </Modal>
          )}

          {selectedExercise && selectedExerciseStats && (
            <Modal
              title={`${selectedExerciseStats.name} Progress`}
              onClose={() => setSelectedExercise(null)}
              width="w-[800px]"
            >
              <ExerciseProgress
                history={selectedExerciseStats.history}
                exerciseParameters={selectedExerciseStats.parameters}
              />
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}