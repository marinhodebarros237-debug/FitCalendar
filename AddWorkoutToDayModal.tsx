import React from 'react';
import { ALL_WORKOUTS } from './constants';
import type { Workout } from './types';
import { CloseIcon } from './components/icons/CloseIcon';

interface AddWorkoutToDayModalProps {
  onClose: () => void;
  onAddWorkout: (workoutId: string) => void;
}

export const AddWorkoutToDayModal: React.FC<AddWorkoutToDayModalProps> = ({ onClose, onAddWorkout }) => {
  const handleSelect = (workoutId: string) => {
    onAddWorkout(workoutId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md border border-gray-700 max-h-[80vh] flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Adicionar Treino</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          <p className="text-sm text-gray-400 mb-4">
            Selecione um treino da sua biblioteca para adicionar ao dia.
          </p>
          <ul className="space-y-2">
            {ALL_WORKOUTS.map((workout) => (
              <li key={workout.id}>
                <button 
                  onClick={() => handleSelect(workout.id)} 
                  className="w-full text-left p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-semibold text-white">{workout.name}</h4>
                    <p className="text-sm text-gray-400 mt-1">{workout.muscleGroup}</p>
                  </div>
                  <span className="text-xs text-indigo-300 bg-indigo-900 px-2 py-1 rounded-md font-semibold">{workout.goal}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};