import { Users } from 'lucide-react';
import { Card } from '../../../shared/components/Card';

interface CommunityProps {
  onShareStory?: () => void;
}

export const Community = ({ onShareStory }: CommunityProps) => {
  return (
    <Card title="Community" icon={<Users className="h-5 w-5 text-gray-500" />}>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            "Small habits make a big difference. Started meditation last month, now can't
            imagine starting my day without it!"
          </p>
          <p className="text-sm font-medium text-gray-900 mt-2">- Sarah M.</p>
        </div>
        <button 
          onClick={onShareStory}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Share Your Story
        </button>
      </div>
    </Card>
  );
}; 