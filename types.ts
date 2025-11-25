export enum Difficulty {
  Beginner = 'Iniciante',
  Intermediate = 'Intermediário',
  Advanced = 'Avançado',
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  repsOrTime: string;
  videoUrl?: string;
  muscleGroup: string;
}

export interface Workout {
  id: string;
  name: string;
  goal: string;
  difficulty: Difficulty;
  exercises: Exercise[];
  muscleGroup: string;
}

export interface ScheduledWorkout {
  instanceId: string;
  workoutId: string;
}

export interface WorkoutSchedule {
  [date: string]: ScheduledWorkout[]; // "YYYY-MM-DD": [ScheduledWorkout, ...]
}

export interface WorkoutHistory {
  [instanceId: string]: boolean; // "instance-1629302..." : true
}