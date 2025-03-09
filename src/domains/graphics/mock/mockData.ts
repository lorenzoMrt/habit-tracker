import { ProgressData } from '../types';

const generateMockData = (days: number): ProgressData => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Mock habits
  const habits = [
    {
      habit: {
        id: '1',
        name: 'Morning Meditation',
        description: 'Start the day with 10 minutes of meditation',
        completed: false
      },
      completionDates: generateCompletionDates(startDate, 0.8), // 80% completion rate
      streakCount: 5
    },
    {
      habit: {
        id: '2',
        name: 'Exercise',
        description: '30 minutes of physical activity',
        completed: false
      },
      completionDates: generateCompletionDates(startDate, 0.65), // 65% completion rate
      streakCount: 3
    },
    {
      habit: {
        id: '3',
        name: 'Read',
        description: 'Read for 20 minutes',
        completed: false
      },
      completionDates: generateCompletionDates(startDate, 0.9), // 90% completion rate
      streakCount: 12
    },
    {
      habit: {
        id: '4',
        name: 'Drink Water',
        description: 'Drink 8 glasses of water',
        completed: false
      },
      completionDates: generateCompletionDates(startDate, 0.75), // 75% completion rate
      streakCount: 7
    },
    {
      habit: {
        id: '5',
        name: 'Journal',
        description: 'Write daily reflections',
        completed: false
      },
      completionDates: generateCompletionDates(startDate, 0.85), // 85% completion rate
      streakCount: 9
    }
  ];

  return {
    habits,
    startDate,
    endDate
  };
};

// Helper function to generate completion dates with a given completion rate
const generateCompletionDates = (startDate: Date, completionRate: number): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date();
  const daysDiff = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  for (let i = 0; i <= daysDiff; i++) {
    // Randomly determine if the habit was completed on this day based on the completion rate
    if (Math.random() < completionRate) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
  }

  return dates;
};

export const getMockProgressData = (timeRange: '30d' | '90d' | '180d'): ProgressData => {
  const days = timeRange === '180d' ? 180 : timeRange === '90d' ? 90 : 30;
  return generateMockData(days);
}; 