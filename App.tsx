import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { WeeklyScheduleView } from './components/WeeklyScheduleView';
import { WorkoutDetailModal } from './components/WorkoutDetailModal';
import { WorkoutGeneratorModal } from './components/WorkoutGeneratorModal';
import { ProgressTracker } from './components/ProgressTracker';
import { AddWorkoutToDayModal } from './AddWorkoutToDayModal';
import { ALL_WORKOUTS, WEEKLY_WORKOUT_MAPPING } from './constants';
import type { Workout, WorkoutSchedule, WorkoutHistory, ScheduledWorkout } from './types';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workouts, setWorkouts] = useState<Workout[]>(ALL_WORKOUTS);
  const [schedule, setSchedule] = useState<WorkoutSchedule>({});
  const [history, setHistory] = useState<WorkoutHistory>({});
  
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
  const [selectedDateForModal, setSelectedDateForModal] = useState<Date | null>(null);

  const [isGeneratorOpen, setGeneratorOpen] = useState(false);
  const [isAddWorkoutModalOpen, setAddWorkoutModalOpen] = useState(false);
  const [dateToAddWorkout, setDateToAddWorkout] = useState<Date | null>(null);


  const getWorkoutsForDate = useCallback((date: Date): ScheduledWorkout[] => {
    const dateKey = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay();

    // Priority 1: User-defined/modified schedule
    if (schedule[dateKey]) {
      return schedule[dateKey];
    }

    // Priority 2: Default weekly schedule
    const defaultWorkoutIds = WEEKLY_WORKOUT_MAPPING[dayOfWeek] || [];
    return defaultWorkoutIds.map(workoutId => ({
        instanceId: `${dateKey}-${workoutId}`, // Create a predictable instanceId for default workouts
        workoutId: workoutId,
    }));
  }, [schedule]);

  const selectedWorkoutInstance = useMemo(() => {
    if (!selectedInstanceId || !selectedDateForModal) return null;
    const workoutsForDay = getWorkoutsForDate(selectedDateForModal);
    return workoutsForDay.find(w => w.instanceId === selectedInstanceId) || null;
  }, [selectedInstanceId, selectedDateForModal, getWorkoutsForDate]);

  const selectedWorkout = useMemo(() => {
    if (!selectedWorkoutInstance) return null;
    return workouts.find(w => w.id === selectedWorkoutInstance.workoutId) || null;
  }, [selectedWorkoutInstance, workouts]);


  const handleWorkoutSelect = useCallback((instanceId: string, date: Date) => {
    setSelectedInstanceId(instanceId);
    setSelectedDateForModal(date);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedInstanceId(null);
    setSelectedDateForModal(null);
  }, []);
  
  const handleAddGeneratedWorkout = useCallback((newWorkout: Workout, date: Date) => {
    if (!workouts.find(w => w.id === newWorkout.id)) {
      setWorkouts(prev => [...prev, newWorkout]);
    }
    const dateKey = date.toISOString().split('T')[0];
    const newScheduledWorkout: ScheduledWorkout = {
        instanceId: `instance-${Date.now()}`,
        workoutId: newWorkout.id,
    };
    setSchedule(prev => ({ 
        ...prev, 
        [dateKey]: [...(prev[dateKey] || getWorkoutsForDate(date)), newScheduledWorkout]
    }));
    setGeneratorOpen(false);
  }, [workouts, getWorkoutsForDate]);

  const handleAddWorkoutToDay = useCallback((workoutId: string) => {
    if (!dateToAddWorkout) return;
    const dateKey = dateToAddWorkout.toISOString().split('T')[0];
    const newScheduledWorkout: ScheduledWorkout = {
        instanceId: `instance-${Date.now()}`,
        workoutId: workoutId,
    };
    
    // Ensure default workouts are added to schedule before adding a new one
    const existingWorkouts = schedule[dateKey] || getWorkoutsForDate(dateToAddWorkout);

    setSchedule(prev => ({
        ...prev,
        [dateKey]: [...existingWorkouts, newScheduledWorkout]
    }));

    setAddWorkoutModalOpen(false);
    setDateToAddWorkout(null);
  }, [dateToAddWorkout, getWorkoutsForDate, schedule]);

  const handleRemoveWorkoutFromDay = useCallback((instanceId: string, date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    
    setSchedule(prev => {
        const daySchedule = prev[dateKey] ? [...prev[dateKey]] : getWorkoutsForDate(date);
        const updatedDaySchedule = daySchedule.filter(w => w.instanceId !== instanceId);
        
        return {
            ...prev,
            [dateKey]: updatedDaySchedule,
        };
    });

    setHistory(prev => {
        const newHistory = { ...prev };
        delete newHistory[instanceId];
        return newHistory;
    });
  }, [getWorkoutsForDate]);

  const openAddWorkoutModal = useCallback((date: Date) => {
    setDateToAddWorkout(date);
    setAddWorkoutModalOpen(true);
  }, []);

  const toggleWorkoutComplete = useCallback((instanceId: string) => {
    setHistory(prev => ({...prev, [instanceId]: !prev[instanceId]}));
  }, []);

  const handleUpdateWorkout = useCallback((updatedWorkout: Workout) => {
    setWorkouts(prevWorkouts => 
      prevWorkouts.map(w => w.id === updatedWorkout.id ? updatedWorkout : w)
    );
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header 
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          onGenerateClick={() => setGeneratorOpen(true)}
        />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WeeklyScheduleView
              currentDate={currentDate}
              history={history}
              workouts={workouts}
              getWorkoutsForDate={getWorkoutsForDate}
              onWorkoutSelect={handleWorkoutSelect}
              onAddWorkoutClick={openAddWorkoutModal}
              onRemoveWorkout={handleRemoveWorkoutFromDay}
            />
          </div>
          <div className="lg:col-span-1">
            <ProgressTracker 
              history={history} 
              currentDate={currentDate} 
              getWorkoutsForDate={getWorkoutsForDate} 
            />
          </div>
        </main>
      </div>

      {selectedWorkout && selectedWorkoutInstance && selectedDateForModal && (
        <WorkoutDetailModal
          workout={selectedWorkout}
          instanceId={selectedWorkoutInstance.instanceId}
          date={selectedDateForModal}
          isCompleted={!!history[selectedWorkoutInstance.instanceId]}
          onClose={closeModal}
          onToggleComplete={toggleWorkoutComplete}
          onUpdateWorkout={handleUpdateWorkout}
        />
      )}

      {isGeneratorOpen && (
        <WorkoutGeneratorModal
          onClose={() => setGeneratorOpen(false)}
          onAddWorkout={handleAddGeneratedWorkout}
        />
      )}

      {isAddWorkoutModalOpen && (
          <AddWorkoutToDayModal
            onClose={() => setAddWorkoutModalOpen(false)}
            onAddWorkout={handleAddWorkoutToDay}
          />
      )}
    </div>
  );
};

export default App;