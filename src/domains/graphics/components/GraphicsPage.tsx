import { useEffect, useState } from 'react';
import { ProgressChart } from './ProgressChart';
import { ProgressData } from '../types';
import { fetchHabitProgress } from '../api/graphicsApi';

export const GraphicsPage = () => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProgressData = async () => {
      try {
        setIsLoading(true);
        // Get data for the last 30 days
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        
        const data = await fetchHabitProgress(startDate, endDate);
        setProgressData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load progress data. Please try again later.');
        console.error('Error loading progress data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgressData();
  }, []);

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <ProgressChart progressData={progressData || undefined} isLoading={isLoading} />
      
      {/* Future graphics components will be added here */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Habit Streaks</h2>
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Streak visualization coming soon</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Completion Rate</h2>
        <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Completion rate visualization coming soon</p>
        </div>
      </div>
    </div>
  );
}; 