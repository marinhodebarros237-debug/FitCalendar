import React from 'react';
import type { WorkoutHistory, Workout, ScheduledWorkout } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { MinusCircleIcon } from './icons/MinusCircleIcon';

interface WeeklyScheduleViewProps {
  currentDate: Date;
  history: WorkoutHistory;
  workouts: Workout[];
  getWorkoutsForDate: (date: Date) => ScheduledWorkout[];
  onWorkoutSelect: (instanceId: string, date: Date) => void;
  onAddWorkoutClick: (date: Date) => void;
  onRemoveWorkout: (instanceId: string, date: Date) => void;
}

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const WeeklyScheduleView: React.FC<WeeklyScheduleViewProps> = ({ currentDate, history, workouts, getWorkoutsForDate, onWorkoutSelect, onAddWorkoutClick, onRemoveWorkout }) => {
  
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  return (
    <div className="bg-gray-800/50 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
      <div className="flex flex-col p-2 space-y-2">
        {weekDays.map(day => {
          const scheduledWorkouts = getWorkoutsForDate(day);
          const isToday = new Date().toDateString() === day.toDateString();

          return (
            <div
              key={day.toISOString()}
              className={`
                flex gap-4 p-4 rounded-lg transition-all duration-300
                ${isToday ? 'bg-gray-700/80' : 'bg-gray-800'}
              `}
            >
              <div className={`flex flex-col items-center w-12 flex-shrink-0 ${isToday ? 'text-indigo-400' : 'text-gray-400'}`}>
                <span className="text-sm font-semibold uppercase">{daysOfWeek[day.getDay()]}</span>
                <span className="text-2xl font-bold">{day.getDate()}</span>
              </div>
              <div className="flex-grow min-w-0">
                {scheduledWorkouts.length > 0 ? (
                    <ul className="space-y-2">
                        {scheduledWorkouts.map(scheduled => {
                            const workout = workouts.find(w => w.id === scheduled.workoutId);
                            if (!workout) return null;
                            const isCompleted = !!history[scheduled.instanceId];
                            const isUserAdded = scheduled.instanceId.startsWith('instance-');
                            return (
                                <li key={scheduled.instanceId}
                                    className={`flex items-center justify-between p-3 rounded-md transition-colors ${isCompleted ? 'bg-green-900/50 hover:bg-green-800/50' : 'bg-gray-700/60 hover:bg-gray-700'}`}
                                >
                                    <div 
                                        onClick={() => onWorkoutSelect(scheduled.instanceId, day)}
                                        className="flex items-center gap-3 flex-grow cursor-pointer min-w-0"
                                    >
                                        {isCompleted ? <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" /> : <div className="w-5 h-5 border-2 border-gray-500 rounded-full flex-shrink-0"></div>}
                                        <div className="truncate">
                                            <span className={`font-semibold ${isCompleted ? 'text-gray-400 line-through' : 'text-white'}`}>{workout.name}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-md hidden sm:block">{workout.muscleGroup}</span>
                                        {isUserAdded && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onRemoveWorkout(scheduled.instanceId, day);
                                                }}
                                                className="text-gray-500 hover:text-red-400 transition-colors p-1"
                                                aria-label={`Remover ${workout.name}`}
                                            >
                                                <MinusCircleIcon className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <div className="flex items-center h-full">
                        <p className="text-gray-500">Descanso</p>
                    </div>
                )}
              </div>
              <div className="flex-shrink-0 flex items-center">
                <button onClick={() => onAddWorkoutClick(day)} className="text-gray-500 hover:text-indigo-400 transition-colors p-1" aria-label={`Adicionar treino ao dia ${day.getDate()}`}>
                    <PlusCircleIcon className="w-7 h-7" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};