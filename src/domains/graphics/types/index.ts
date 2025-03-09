import { Habit } from '../../habits/types';

export interface HabitProgress {
  habit: Habit;
  completionDates: Date[];
  streakCount: number;
}

export interface ProgressData {
  habits: HabitProgress[];
  startDate: Date;
  endDate: Date;
} 