import React, { useMemo } from 'react';
import type { WorkoutHistory, ScheduledWorkout, Workout } from '../types';
import { MedalIcon } from './icons/MedalIcon';

interface ProgressTrackerProps {
  history: WorkoutHistory;
  currentDate: Date;
  getWorkoutsForDate: (date: Date) => ScheduledWorkout[];
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ history, currentDate, getWorkoutsForDate }) => {

  const weeklyStats = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    let completed = 0;
    let total = 0;
    
    const allWeekInstances: ScheduledWorkout[] = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const workoutsForDay = getWorkoutsForDate(day);
      allWeekInstances.push(...workoutsForDay);
    }

    total = allWeekInstances.length;
    completed = allWeekInstances.filter(instance => history[instance.instanceId]).length;
    
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  }, [history, currentDate, getWorkoutsForDate]);

  return (
    <div className="bg-gray-800/50 rounded-lg shadow-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white">Progresso Semanal</h3>
      <p className="text-sm text-gray-400 mt-1">Sua consistência é a chave para o sucesso.</p>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-indigo-300">{weeklyStats.completed} de {weeklyStats.total} treinos concluídos</span>
          <span className="text-sm font-medium text-gray-300">{weeklyStats.percentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${weeklyStats.percentage}%` }}
          ></div>
        </div>
      </div>
      
      {weeklyStats.percentage === 100 && weeklyStats.total > 0 && (
        <div className="mt-6 flex items-center gap-4 bg-green-900/50 border border-green-700 text-green-300 p-4 rounded-lg">
          <MedalIcon className="w-10 h-10 flex-shrink-0 text-amber-400"/>
          <div>
            <h4 className="font-bold">Parabéns!</h4>
            <p className="text-sm">Você completou todos os treinos da semana. Continue com o ótimo trabalho!</p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h4 className="text-md font-semibold text-white">Lembrete do Dia</h4>
        <div className="mt-2 bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-300">
            Não se esqueça de se hidratar e fazer um bom aquecimento antes de começar. Bons treinos!
          </p>
        </div>
      </div>
    </div>
  );
};