import type { Workout, Exercise } from './types';
import { Difficulty } from './types';

export const ALL_EXERCISES_LIBRARY: Exercise[] = [
  { id: 'e1', name: 'Supino Reto com Barra', description: 'Deite-se no banco, pegue a barra com as mãos um pouco mais afastadas que a largura dos ombros e desça a barra até tocar o peito.', repsOrTime: '', muscleGroup: 'Peito' },
  { id: 'e2', name: 'Flexão de Braço', description: 'Mãos no chão na largura dos ombros, corpo reto. Desça o corpo até o peito quase tocar o chão e suba.', repsOrTime: '', muscleGroup: 'Peito' },
  { id: 'e3', name: 'Tríceps na Polia', description: 'Em pé, segure a barra da polia alta com as duas mãos e puxe para baixo até estender completamente os cotovelos.', repsOrTime: '', muscleGroup: 'Tríceps' },
  { id: 'e4', name: 'Polichinelo', description: 'Salte abrindo e fechando pernas e braços simultaneamente.', repsOrTime: '', muscleGroup: 'Cardio' },
  { id: 'e5', name: 'Corrida Estacionária', description: 'Corra no lugar, elevando os joelhos.', repsOrTime: '', muscleGroup: 'Cardio' },
  { id: 'e6', name: 'Burpee', description: 'Agache, coloque as mãos no chão, jogue os pés para trás, faça uma flexão, volte os pés e salte.', repsOrTime: '', muscleGroup: 'Cardio' },
  { id: 'e7', name: 'Agachamento Livre', description: 'Com a barra nas costas, agache como se fosse sentar em uma cadeira, mantendo a coluna reta.', repsOrTime: '', muscleGroup: 'Pernas' },
  { id: 'e8', name: 'Leg Press 45º', description: 'Sente-se no aparelho, pés na plataforma. Empurre a plataforma até estender as pernas, sem travar os joelhos.', repsOrTime: '', muscleGroup: 'Pernas' },
  { id: 'e9', name: 'Cadeira Extensora', description: 'Sente-se na máquina, ajuste o apoio. Estenda as pernas para cima, contraindo o quadríceps.', repsOrTime: '', muscleGroup: 'Pernas' },
  { id: 'e10', name: 'Alongamento Gato-Vaca', description: 'Em quatro apoios, arqueie e curve a coluna lentamente.', repsOrTime: '', muscleGroup: 'Mobilidade' },
  { id: 'e11', name: 'Rotação Torácica', description: 'Em quatro apoios, coloque uma mão na nuca e gire o tronco, apontando o cotovelo para o teto.', repsOrTime: '', muscleGroup: 'Mobilidade' },
  { id: 'e12', name: 'Supino Inclinado com Halteres', description: 'Deite-se em um banco inclinado, segure os halteres acima do peito e desça-os lentamente.', repsOrTime: '', muscleGroup: 'Peito' },
  { id: 'e13', name: 'Crucifixo com Halteres', description: 'Deite-se no banco, braços estendidos acima do peito, e abra os braços para os lados.', repsOrTime: '', muscleGroup: 'Peito' },
  { id: 'e14', name: 'Afundo (Lunge)', description: 'Dê um passo à frente e flexione ambos os joelhos a 90 graus, mantendo o tronco reto.', repsOrTime: '', muscleGroup: 'Pernas' },
  { id: 'e15', name: 'Agachamento Sumô', description: 'Afaste os pés além da largura dos ombros, com as pontas dos pés para fora, e agache.', repsOrTime: '', muscleGroup: 'Pernas' },
  { id: 'e16', name: 'Tríceps Francês', description: 'Segure um halter com as duas mãos acima da cabeça e flexione os cotovelos, descendo o peso para trás.', repsOrTime: '', muscleGroup: 'Tríceps' },
  { id: 'e17', name: 'Mergulho no Banco', description: 'Com as mãos em um banco, estenda as pernas e desça o corpo flexionando os cotovelos.', repsOrTime: '', muscleGroup: 'Tríceps' },
  { id: 'e18', name: 'Remada Curvada', description: 'Incline o tronco para a frente com a coluna reta e puxe a barra em direção ao abdômen.', repsOrTime: '', muscleGroup: 'Costas' },
  { id: 'e19', name: 'Puxada Frontal (Pulley)', description: 'Sente-se no aparelho e puxe a barra até a altura do peito, contraindo os músculos das costas.', repsOrTime: '', muscleGroup: 'Costas' },
  { id: 'e20', name: 'Desenvolvimento com Halteres', description: 'Sentado, eleve os halteres acima da cabeça até estender os braços.', repsOrTime: '', muscleGroup: 'Ombros' },
  { id: 'e21', name: 'Elevação Lateral', description: 'Em pé, eleve os halteres lateralmente até a altura dos ombros.', repsOrTime: '', muscleGroup: 'Ombros' },
  { id: 'e22', name: 'Rosca Direta com Barra', description: 'Em pé, segure a barra com as palmas para cima e flexione os cotovelos, trazendo a barra até os ombros.', repsOrTime: '', muscleGroup: 'Bíceps' },
  { id: 'e23', name: 'Rosca Alternada com Halteres', description: 'Sentado ou em pé, eleve um halter de cada vez, girando o punho.', repsOrTime: '', muscleGroup: 'Bíceps' },
  { id: 'e24', name: 'Prancha Abdominal', description: 'Apoie os antebraços e as pontas dos pés no chão, mantendo o corpo reto como uma prancha.', repsOrTime: '', muscleGroup: 'Abdômen' },
  { id: 'e25', name: 'Abdominal Supra', description: 'Deitado de costas, flexione o tronco, tirando os ombros do chão.', repsOrTime: '', muscleGroup: 'Abdômen' },
];

export const ALL_WORKOUTS: Workout[] = [
  {
    id: 'w1',
    name: 'Treino de Peito',
    goal: 'Força',
    difficulty: Difficulty.Intermediate,
    muscleGroup: 'Peito',
    exercises: [
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e1')!, repsOrTime: '4x8' },
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e12')!, repsOrTime: '3x10' },
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e2')!, repsOrTime: '3x15' },
    ],
  },
  {
    id: 'w2',
    name: 'Treino de Costas',
    goal: 'Hipertrofia',
    difficulty: Difficulty.Intermediate,
    muscleGroup: 'Costas',
    exercises: [
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e18')!, repsOrTime: '4x10' },
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e19')!, repsOrTime: '3x12' },
    ],
  },
  {
    id: 'w3',
    name: 'Treino de Pernas',
    goal: 'Hipertrofia',
    difficulty: Difficulty.Advanced,
    muscleGroup: 'Pernas',
    exercises: [
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e7')!, repsOrTime: '4x10' },
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e8')!, repsOrTime: '4x12' },
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e9')!, repsOrTime: '3x15' },
    ],
  },
  {
    id: 'w4',
    name: 'Treino de Ombros',
    goal: 'Força',
    difficulty: Difficulty.Intermediate,
    muscleGroup: 'Ombros',
    exercises: [
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e20')!, repsOrTime: '4x10' },
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e21')!, repsOrTime: '3x15' },
    ],
  },
  {
    id: 'w5',
    name: 'Treino de Bíceps e Tríceps',
    goal: 'Hipertrofia',
    difficulty: Difficulty.Intermediate,
    muscleGroup: 'Bíceps & Tríceps',
    exercises: [
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e22')!, repsOrTime: '3x12' },
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e3')!, repsOrTime: '3x12' },
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e16')!, repsOrTime: '3x15' },
    ],
  },
  {
    id: 'w6',
    name: 'Treino de Abdômen / Core',
    goal: 'Resistência',
    difficulty: Difficulty.Beginner,
    muscleGroup: 'Abdômen / Core',
    exercises: [
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e24')!, repsOrTime: '3x 60s' },
      { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e25')!, repsOrTime: '3x20' },
    ],
  },
  {
    id: 'w7',
    name: 'Funcional / Descanso Ativo',
    goal: 'Mobilidade',
    difficulty: Difficulty.Beginner,
    muscleGroup: 'Funcional ou Descanso ativo',
    exercises: [
        { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e10')!, repsOrTime: '2x15' },
        { ...ALL_EXERCISES_LIBRARY.find(e => e.id === 'e11')!, repsOrTime: '2x12 por lado' },
    ],
  }
];

export const WEEKLY_WORKOUT_MAPPING: { [key: number]: string[] } = {
    1: ['w1'], // Segunda: Peito
    2: ['w2'], // Terça: Costas
    3: ['w3'], // Quarta: Pernas
    4: ['w4'], // Quinta: Ombros
    5: ['w5'], // Sexta: Bíceps e Tríceps
    6: ['w6'], // Sábado: Abdômen / Core
    0: ['w7'], // Domingo: Funcional ou Descanso ativo
};