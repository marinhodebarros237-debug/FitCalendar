import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { generateWorkout } from '../services/geminiService';
import type { Workout } from '../types';
import { Difficulty } from '../types';

interface WorkoutGeneratorModalProps {
  onClose: () => void;
  onAddWorkout: (workout: Workout, date: Date) => void;
}

export const WorkoutGeneratorModal: React.FC<WorkoutGeneratorModalProps> = ({ onClose, onAddWorkout }) => {
  const [goal, setGoal] = useState('Força');
  const [level, setLevel] = useState<Difficulty>(Difficulty.Beginner);
  const [muscleGroup, setMuscleGroup] = useState('Corpo todo');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const newWorkout = await generateWorkout(goal, level, muscleGroup);
      const targetDate = new Date(date + 'T12:00:00'); // Use noon to avoid timezone issues
      onAddWorkout(newWorkout, targetDate);
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Ocorreu um erro desconhecido.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg border border-gray-700">
        <header className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Gerador de Treino IA</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" disabled={isLoading}>
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {error && <div className="bg-red-900/50 border border-red-700 text-red-300 text-sm rounded-lg p-3">{error}</div>}
            
            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-gray-300">Qual é o seu objetivo?</label>
              <select id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-1 block w-full bg-gray-900 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white p-2.5">
                <option>Força</option>
                <option>Hipertrofia</option>
                <option>Emagrecimento</option>
                <option>Resistência</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-300">Qual é o seu nível?</label>
              <select id="level" value={level} onChange={(e) => setLevel(e.target.value as Difficulty)} className="mt-1 block w-full bg-gray-900 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white p-2.5">
                <option value={Difficulty.Beginner}>Iniciante</option>
                <option value={Difficulty.Intermediate}>Intermediário</option>
                <option value={Difficulty.Advanced}>Avançado</option>
              </select>
            </div>

            <div>
              <label htmlFor="muscleGroup" className="block text-sm font-medium text-gray-300">Grupo muscular foco</label>
              <input type="text" id="muscleGroup" value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)} className="mt-1 block w-full bg-gray-900 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white p-2.5" />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300">Adicionar ao dia</label>
              <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full bg-gray-900 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white p-2.5" />
            </div>
          </div>
          
          <footer className="p-4 bg-gray-800/50 border-t border-gray-700">
            <button type="submit" disabled={isLoading} className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Gerando...
                </>
              ) : 'Gerar Treino'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};