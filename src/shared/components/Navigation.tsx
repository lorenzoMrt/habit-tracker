import { Calendar, BarChart3 } from 'lucide-react';

interface NavigationProps {
  activePage: 'habits' | 'graphics';
  onNavigate: (page: 'habits' | 'graphics') => void;
}

export const Navigation = ({ activePage, onNavigate }: NavigationProps) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex bg-gray-100 p-1 rounded-lg">
        <button
          className={`flex items-center px-4 py-2 rounded-md ${
            activePage === 'habits'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => onNavigate('habits')}
        >
          <Calendar className="h-5 w-5 mr-2" />
          <span>Habits</span>
        </button>
        <button
          className={`flex items-center px-4 py-2 rounded-md ${
            activePage === 'graphics'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => onNavigate('graphics')}
        >
          <BarChart3 className="h-5 w-5 mr-2" />
          <span>Analytics</span>
        </button>
      </div>
    </div>
  );
}; 