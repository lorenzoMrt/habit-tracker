import { Calendar, CheckCircle2 } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { Habit } from '../types';

interface HabitListProps {
  habits: Habit[];
  onComplete: (id: string) => void;
}

export const HabitList = ({ habits, onComplete }: HabitListProps) => {
  return (
    <Card title="Today's Habits" icon={<Calendar className="h-5 w-5 text-gray-500" />}>
      <div className="space-y-4">
        {habits.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No habits added yet</p>
        ) : (
          habits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle2
                  className={`h-6 w-6 ${
                    habit.completed ? 'text-green-500' : 'text-gray-400'
                  }`}
                />
                <div>
                  <p className="font-medium text-gray-900">{habit.name}</p>
                  <p className="text-sm text-gray-500">{habit.description}</p>
                </div>
              </div>
              {!habit.completed && (
                <button 
                  onClick={() => onComplete(habit.id)}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  disabled={habit.completed}
                >
                  Complete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </Card>
  );
}; 