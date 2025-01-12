export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'full body';
export type WorkoutType = 'push' | 'pull' | 'legs' | 'full body' | 'cardio' | 'flexibility';
export type Equipment = 'barbell' | 'dumbbell' | 'machine' | 'bodyweight' | 'cables' | 'kettlebell' | 'resistance bands';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type ExerciseCategory = 'strength' | 'cardio' | 'flexibility';

export interface Set {
  id: string;
  weight: number;
  reps: number;
  restTime: number; // in seconds
  isPersonalRecord: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  notes: string;
  muscleGroups: MuscleGroup[];
  equipment: Equipment[];
  difficulty: Difficulty;
  category: ExerciseCategory;
  formGuide?: {
    instructions: string;
    imageUrl?: string;
    videoUrl?: string;
  };
}

export interface Workout {
  id: string;
  name: string;
  type: WorkoutType;
  exercises: Exercise[];
  date: string;
  duration: number; // in minutes
  notes: string;
}

export interface BodyMeasurements {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  chest: number;
  waist: number;
  hips: number;
  biceps: number;
  thighs: number;
  photoUrls?: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  dateEarned: string;
  icon: string;
}

export interface UserProfile {
  measurements: BodyMeasurements[];
  achievements: Achievement[];
  personalRecords: {
    exerciseId: string;
    weight: number;
    reps: number;
    date: string;
  }[];
}