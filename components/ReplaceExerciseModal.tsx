import React from 'react';
import { ALL_EXERCISES_LIBRARY } from '../constants';
import type { Exercise } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { getExerciseIcon } from './icons/ExerciseIcons';

interface ReplaceExerciseModalProps {
  currentExercise: Exercise;
  onClose: () => void;
  onSelectReplacement: (replacementExercise: Exercise) => void;
}

export const ReplaceExerciseModal: React.FC<ReplaceExerciseModalProps> = ({ currentExercise, onClose, onSelectReplacement }) => {
  const similarExercises = ALL_EXERCISES_LIBRARY.filter(
    (ex) => ex.muscleGroup === currentExercise.muscleGroup && ex.id !== currentExercise.id
  );

  const handleSelect = (exercise: Exercise) => {
    onSelectReplacement({ ...exercise, repsOrTime: currentExercise.repsOrTime });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-md border border-gray-700 max-h-[80vh] flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Substituir Exercício</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 overflow-y-auto">
          <p className="text-sm text-gray-400 mb-4">
            Escolha um exercício alternativo para <span className="font-bold text-indigo-400">{currentExercise.name}</span>.
          </p>
          {similarExercises.length > 0 ? (
            <ul className="space-y-2">
              {similarExercises.map((ex) => {
                const Icon = getExerciseIcon(ex.id);
                return (
                    <li key={ex.id}>
                      <button 
                        onClick={() => handleSelect(ex)} 
                        className="w-full text-left p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors flex items-start gap-4"
                      >
                        {Icon && <Icon className="w-10 h-10 text-indigo-300 flex-shrink-0 mt-1" />}
                        <div className="flex-grow">
                          <h4 className="font-semibold text-white">{ex.name}</h4>
                          <p className="text-sm text-gray-400 mt-1">{ex.description}</p>
                        </div>
                      </button>
                    </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-8">Nenhum exercício similar encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};