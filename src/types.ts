// ... existing types ...

export type ActiveTab = 'workout' | 'history' | 'progress' | 'profile';

export interface ExerciseStats {
  name: string;
  count: number;
  parameters: Exercise['parameters'];
  history: Array<{ date: string; parameters: ExerciseParameters }>;
}