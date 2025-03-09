import { useEffect, useState } from 'react';
import { ProgressChart } from './ProgressChart';
import { ProgressData } from '../types';
import { getMockProgressData } from '../mock/mockData';

export const GraphicsPage = () => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '180d'>('30d');

  useEffect(() => {
    const loadProgressData = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));
        const data = getMockProgressData(timeRange);
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
  }, [timeRange]);

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={() => setTimeRange('30d')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            timeRange === '30d'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          30 Days
        </button>
        <button
          onClick={() => setTimeRange('90d')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            timeRange === '90d'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          90 Days
        </button>
        <button
          onClick={() => setTimeRange('180d')}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            timeRange === '180d'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          180 Days
        </button>
      </div>
      
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