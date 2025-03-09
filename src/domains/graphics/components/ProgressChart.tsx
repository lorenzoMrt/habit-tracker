import { BarChart3 } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { ProgressData } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

interface ProgressChartProps {
  progressData?: ProgressData;
  isLoading?: boolean;
}

export const ProgressChart = ({ progressData, isLoading = false }: ProgressChartProps) => {
  if (isLoading) {
    return (
      <Card title="Progress" icon={<BarChart3 className="h-5 w-5 text-gray-500" />}>
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Loading progress data...</p>
        </div>
      </Card>
    );
  }

  if (!progressData || progressData.habits.length === 0) {
    return (
      <Card title="Progress" icon={<BarChart3 className="h-5 w-5 text-gray-500" />}>
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No habits data available</p>
        </div>
      </Card>
    );
  }

  // Calculate the number of days between start and end date
  const daysDiff = Math.floor(
    (progressData.endDate.getTime() - progressData.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Process data for daily completion rates
  const dailyData = Array.from({ length: daysDiff + 1 }, (_, i) => {
    const date = new Date(progressData.startDate);
    date.setDate(date.getDate() + i);
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      ...(daysDiff > 90 && { year: '2-digit' })
    });
    
    const completedHabits = progressData.habits.filter(habit =>
      habit.completionDates.some(d => new Date(d).toDateString() === date.toDateString())
    ).length;

    const completionRate = (completedHabits / progressData.habits.length) * 100;

    return {
      date: formattedDate,
      completionRate,
      completedHabits,
      totalHabits: progressData.habits.length,
    };
  });

  // Process data for streak progress
  const streakData = progressData.habits
    .sort((a, b) => b.streakCount - a.streakCount) // Sort by streak count
    .map(habit => ({
      name: habit.habit.name,
      streak: habit.streakCount,
      completionRate: (habit.completionDates.length / (daysDiff + 1)) * 100,
    }));

  // Calculate overall statistics
  const overallCompletionRate = 
    (dailyData.reduce((sum, day) => sum + day.completionRate, 0) / dailyData.length).toFixed(1);
  const maxStreak = Math.max(...streakData.map(d => d.streak));
  const bestHabit = streakData[0];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Overall Completion" icon={<BarChart3 className="h-5 w-5 text-gray-500" />}>
          <div className="p-4 text-center">
            <div className="text-3xl font-bold text-indigo-600">{overallCompletionRate}%</div>
            <div className="text-sm text-gray-500">Average completion rate</div>
          </div>
        </Card>
        <Card title="Best Streak" icon={<BarChart3 className="h-5 w-5 text-gray-500" />}>
          <div className="p-4 text-center">
            <div className="text-3xl font-bold text-indigo-600">{maxStreak}</div>
            <div className="text-sm text-gray-500">Highest streak achieved</div>
          </div>
        </Card>
        <Card title="Top Habit" icon={<BarChart3 className="h-5 w-5 text-gray-500" />}>
          <div className="p-4 text-center">
            <div className="text-3xl font-bold text-indigo-600">{bestHabit.completionRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-500">{bestHabit.name}</div>
          </div>
        </Card>
      </div>

      {/* Daily Completion Rate Chart */}
      <Card title="Daily Completion Rate" icon={<BarChart3 className="h-5 w-5 text-gray-500" />}>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                interval={Math.floor(dailyData.length / 10)} // Show fewer labels for longer time ranges
              />
              <YAxis label={{ value: 'Completion Rate (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Completion Rate']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Bar 
                dataKey="completionRate" 
                fill="#4f46e5"
                name="Completion Rate"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Habit Streaks Chart */}
      <Card title="Habit Performance" icon={<BarChart3 className="h-5 w-5 text-gray-500" />}>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={streakData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={60} 
              />
              <YAxis yAxisId="left" label={{ value: 'Current Streak', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Completion Rate (%)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="streak" 
                stroke="#4f46e5" 
                name="Current Streak"
                strokeWidth={2}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="completionRate" 
                stroke="#10b981" 
                name="Completion Rate"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}; 