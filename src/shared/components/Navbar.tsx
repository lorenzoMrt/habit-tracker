import { BookOpen } from 'lucide-react';

interface NavbarProps {
  onSignIn?: () => void;
}

export const Navbar = ({ onSignIn }: NavbarProps) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">Atomic Habits</span>
          </div>
          <div className="flex space-x-4">
            <button 
              className="text-gray-600 hover:text-gray-900"
              onClick={onSignIn}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}; 