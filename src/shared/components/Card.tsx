import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Card = ({ title, icon, children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {icon && icon}
        </div>
      )}
      {children}
    </div>
  );
}; 