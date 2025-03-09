import { useEffect, useState } from 'react';
import { HabitForm } from './HabitForm';
import { HabitList } from './HabitList';
import { Community } from './Community';
import { HabitTips } from './HabitTips';
import { Habit, NewHabitInput } from '../types';
import { fetchHabits, createHabit, completeHabit } from '../api/habitsApi';

export const HabitsPage = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        setIsLoading(true);
        const data = await fetchHabits();
        setHabits(data);
        setError(null);
      } catch (err) {
        setError('Failed to load habits. Please try again later.');
        console.error('Error loading habits:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHabits();
  }, []);

  const handleAddHabit = async (newHabitInput: NewHabitInput) => {
    try {
      const createdHabit = await createHabit(newHabitInput);
      setHabits(prevHabits => [...prevHabits, createdHabit]);
    } catch (err) {
      setError('Failed to create habit. Please try again.');
      console.error('Error creating habit:', err);
    }
  };

  const handleCompleteHabit = async (id: string) => {
    try {
      await completeHabit(id);
      setHabits(prevHabits => prevHabits.map(habit =>
        habit.id === id ? { ...habit, completed: true } : habit
      ));
    } catch (err) {
      setError('Failed to complete habit. Please try again.');
      console.error('Error completing habit:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        <HabitForm onSubmit={handleAddHabit} />
        
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            Loading habits...
          </div>
        ) : (
          <HabitList habits={habits} onComplete={handleCompleteHabit} />
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Community onShareStory={() => alert('Share your story feature coming soon!')} />
        <HabitTips />
      </div>
    </div>
  );
}; 