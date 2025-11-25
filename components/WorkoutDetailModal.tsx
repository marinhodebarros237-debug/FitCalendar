import React, { useState, useEffect } from 'react';
import type { Workout, Exercise } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { ExerciseIllustration } from './ExerciseIllustration';
import { getExerciseIcon } from './icons/ExerciseIcons';
import { PencilIcon } from './icons/PencilIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ReplaceExerciseModal } from './ReplaceExerciseModal';

interface WorkoutDetailModalProps {
  workout: Workout;
  instanceId: string;
  date: Date;
  isCompleted: boolean;
  onClose: () => void;
  onToggleComplete: (instanceId: string) => void;
  onUpdateWorkout: (workout: Workout) => void;
}

export const WorkoutDetailModal: React.FC<WorkoutDetailModalProps> = ({ workout, instanceId, date, isCompleted, onClose, onToggleComplete, onUpdateWorkout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Workout>(workout);
  const [isReplaceModalOpen, setReplaceModalOpen] = useState(false);
  const [exerciseToReplace, setExerciseToReplace] = useState<Exercise | null>(null);

  useEffect(() => {
    setEditedData(workout);
  }, [workout]);

  const dateString = date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  const handleExerciseChange = (exerciseIndex: number, field: keyof Omit<Exercise, 'id' | 'videoUrl' | 'name' | 'description' | 'muscleGroup'>, value: string) => {
    const updatedExercises = editedData.exercises.map((ex, idx) => {
      if (idx === exerciseIndex) {
        return { ...ex, [field]: value };
      }
      return ex;
    });
    setEditedData({ ...editedData, exercises: updatedExercises });
  };
  
  const handleSave = () => {
    onUpdateWorkout(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(workout);
    setIsEditing(false);
  };

  const openReplaceModal = (exercise: Exercise) => {
    setExerciseToReplace(exercise);
    setReplaceModalOpen(true);
  };

  const handleSelectReplacement = (replacementExercise: Exercise) => {
    if (!exerciseToReplace) return;

    const updatedExercises = editedData.exercises.map(ex =>
      ex.id === exerciseToReplace.id ? replacementExercise : ex
    );
    setEditedData({ ...editedData, exercises: updatedExercises });
  };

  const MediaDisplay: React.FC<{ exercise: Workout['exercises'][0] }> = ({ exercise }) => {
    if (exercise.videoUrl) {
      return (
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={exercise.videoUrl}
            title={exercise.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      );
    }
    
    return (
      <ExerciseIllustration 
        exerciseName={exercise.name}
      />
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-700">
          <header className="flex items-center justify-between p-4 border-b border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-indigo-400">{workout.name}</h2>
              <p className="text-sm text-gray-400">{dateString}</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsEditing(!isEditing)} className="text-gray-400 hover:text-white transition-colors">
                <PencilIcon className="w-6 h-6" />
              </button>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
          </header>
          
          <div className="p-6 overflow-y-auto">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-indigo-900 text-indigo-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{workout.goal}</span>
              <span className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{workout.difficulty}</span>
            </div>

            <div className="space-y-6">
              {editedData.exercises.map((exercise, index) => {
                  const ExerciseIcon = getExerciseIcon(exercise.id);
                  return (
                    <div key={exercise.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                       <div className="flex items-start gap-3">
                          {ExerciseIcon && <ExerciseIcon className="w-8 h-8 text-indigo-300 flex-shrink-0 mt-1" />}
                          <div className="flex-grow">
                            {isEditing ? (
                               <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-lg text-white">{exercise.name}</h4>
                                  <button onClick={() => openReplaceModal(exercise)} className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-semibold">Substituir</button>
                                </div>
                                 <p className="text-gray-400 text-sm mt-1">{exercise.description}</p>

                                 <label htmlFor={`reps-${exercise.id}`} className="block text-sm font-medium text-gray-300 pt-2">Repetições ou tempo</label>
                                 <input
                                   id={`reps-${exercise.id}`}
                                   type="text"
                                   value={exercise.repsOrTime}
                                   onChange={(e) => handleExerciseChange(index, 'repsOrTime', e.target.value)}
                                   className="w-full bg-gray-900 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-amber-400 p-2 font-bold"
                                 />
                               </div>
                            ) : (
                              <>
                                <div className="flex items-center gap-2">
                                   {isCompleted && <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />}
                                   <h4 className="font-semibold text-lg text-white">{exercise.name}</h4>
                                </div>
                                <p className="text-gray-400 text-sm mt-1 ml-7">{exercise.description}</p>
                                <p className="text-amber-400 font-bold mt-2 ml-7">{exercise.repsOrTime}</p>
                              </>
                             )}
                          </div>
                        </div>
                      <MediaDisplay exercise={exercise} />
                    </div>
                  );
              })}
            </div>
          </div>

          <footer className="p-4 border-t border-gray-700 mt-auto">
              {isEditing ? (
                <div className="flex justify-end gap-4">
                  <button onClick={handleCancel} className="py-2.5 px-5 font-semibold rounded-lg transition-colors bg-gray-600 hover:bg-gray-500 text-white">
                    Cancelar
                  </button>
                  <button onClick={handleSave} className="py-2.5 px-5 font-semibold rounded-lg transition-colors bg-indigo-600 hover:bg-indigo-500 text-white">
                    Salvar Alterações
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => onToggleComplete(instanceId)}
                  className={`w-full py-2.5 px-5 font-semibold rounded-lg transition-colors ${isCompleted ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
                >
                  {isCompleted ? 'Marcar como não concluído' : 'Concluir Treino'}
                </button>
              )}
          </footer>
        </div>
      </div>
      {isReplaceModalOpen && exerciseToReplace && (
        <ReplaceExerciseModal
          currentExercise={exerciseToReplace}
          onClose={() => setReplaceModalOpen(false)}
          onSelectReplacement={handleSelectReplacement}
        />
      )}
    </>
  );
};