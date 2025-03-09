export interface Habit {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

export interface NewHabitInput {
  name: string;
  description: string;
} 