import { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { NewHabitInput } from '../types';

interface HabitFormProps {
  onSubmit: (habit: NewHabitInput) => void;
}

export const HabitForm = ({ onSubmit }: HabitFormProps) => {
  const [newHabit, setNewHabit] = useState<NewHabitInput>({ name: '', description: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewHabit(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newHabit);
    setNewHabit({ name: '', description: '' }); // Reset form after submission
  };

  return (
    <Card title="Add New Habit">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Habit Name"
          value={newHabit.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Habit Description"
          value={newHabit.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button 
          type="submit" 
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Add Habit
        </button>
      </form>
    </Card>
  );
}; 