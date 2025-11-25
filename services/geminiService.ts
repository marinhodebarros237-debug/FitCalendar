import { GoogleGenAI, Type } from "@google/genai";
import type { Exercise, Workout } from '../types';
import { Difficulty } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const workoutGenerationSchema = {
    type: Type.OBJECT,
    properties: {
      workoutName: { 
        type: Type.STRING,
        description: "Nome criativo e motivador para o treino, em português."
      },
      exercises: {
        type: Type.ARRAY,
        description: "Uma lista de 4 a 6 exercícios para o plano de treino.",
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Nome do exercício em português." },
            description: { type: Type.STRING, description: "Uma breve descrição de como realizar o exercício, em português." },
            repsOrTime: { type: Type.STRING, description: "Número de séries e repetições (ex: '3x12') ou duração (ex: '45s')." },
          },
          required: ["name", "description", "repsOrTime"]
        }
      }
    },
    required: ["workoutName", "exercises"]
};


export const generateWorkout = async (goal: string, level: Difficulty, muscleGroup: string): Promise<Workout> => {
    if (!API_KEY) {
        throw new Error("API Key for Gemini is not configured.");
    }
    
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const prompt = `Você é um personal trainer especialista. Crie um plano de treino com base nas seguintes preferências do usuário:
- Objetivo: ${goal}
- Nível de Fitness: ${level}
- Grupo Muscular Foco: ${muscleGroup}

Gere um plano de treino com 4 a 6 exercícios.
O nome do treino deve ser criativo e motivador.
Retorne um único objeto JSON que corresponda estritamente ao schema fornecido. Não inclua nenhum texto, explicações ou formatação markdown fora do objeto JSON.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: workoutGenerationSchema,
      },
    });

    const jsonText = response.text.trim();
    const generatedData = JSON.parse(jsonText);

    const newExercises: Exercise[] = generatedData.exercises.map((ex: any, index: number) => ({
      id: `gen-ex-${Date.now()}-${index}`,
      name: ex.name,
      description: ex.description,
      repsOrTime: ex.repsOrTime,
      muscleGroup: muscleGroup, // Assign the overall muscle group to each exercise
    }));

    const newWorkout: Workout = {
        id: `gen-w-${Date.now()}`,
        name: generatedData.workoutName,
        goal: goal,
        difficulty: level,
        exercises: newExercises,
        muscleGroup: muscleGroup,
    };

    return newWorkout;

  } catch (error) {
    console.error("Error generating workout with Gemini:", error);
    throw new Error("Não foi possível gerar o treino. Tente novamente.");
  }
};