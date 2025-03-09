import { Card } from '../../../shared/components/Card';

export const HabitTips = () => {
  return (
    <Card title="Quick Tips">
      <ul className="space-y-3 text-sm text-gray-600">
        <li>• Make it obvious - Place visual cues in your environment</li>
        <li>• Make it attractive - Pair habits with activities you enjoy</li>
        <li>• Make it easy - Reduce friction for good habits</li>
        <li>• Make it satisfying - Track your progress</li>
      </ul>
    </Card>
  );
}; 