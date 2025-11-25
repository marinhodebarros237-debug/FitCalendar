import React from 'react';
import { BodyIcon } from './icons/BodyIcon';

interface ExerciseIllustrationProps {
  exerciseName: string;
}

export const ExerciseIllustration: React.FC<ExerciseIllustrationProps> = ({ 
  exerciseName
}) => {
  // Fallback placeholder is now the only content
  return (
    <div className="aspect-video bg-gray-700/50 rounded-lg flex flex-col items-center justify-center text-center p-4">
      <BodyIcon className="w-10 h-10 text-gray-500 mb-2" />
      <p className="text-sm text-gray-400 font-semibold">{exerciseName}</p>
    </div>
  );
};
