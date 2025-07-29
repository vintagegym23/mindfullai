import React from 'react';
import { User } from '../../types';
import Card from '../ui/Card';

interface WelcomePanelProps {
  user: User | null;
  date?: Date;
}

const WelcomePanel: React.FC<WelcomePanelProps> = ({ 
  user, 
  date = new Date() 
}) => {
  // Format the date nicely
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Get appropriate greeting based on time of day
  const getGreeting = () => {
    const hour = date.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (!user) return null;

  return (
    <Card className="bg-white dark:bg-gray-800 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="heading-2 text-gray-900 dark:text-white">
            {getGreeting()}, {user.name.split(' ')[0]}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {formattedDate}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
            Streak: 7 days
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WelcomePanel;