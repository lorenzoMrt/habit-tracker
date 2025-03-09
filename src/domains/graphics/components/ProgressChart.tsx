import { BarChart3 } from 'lucide-react';
import { Card } from '../../../shared/components/Card';
import { ProgressData } from '../types';

interface ProgressChartProps {
  progressData?: ProgressData;
  isLoading?: boolean;
}

export const ProgressChart = ({ progressData, isLoading = false }: ProgressChartProps) => {
  return (
    <Card title="Progress" icon={<BarChart3 className="h-5 w-5 text-gray-500" />}>
      <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
        {isLoading ? (
          <p className="text-gray-500">Loading progress data...</p>
        ) : !progressData || progressData.habits.length === 0 ? (
          <p className="text-gray-500">Progress visualization coming soon</p>
        ) : (
          <p className="text-gray-500">
            You have {progressData.habits.length} habits being tracked
          </p>
        )}
      </div>
    </Card>
  );
}; 