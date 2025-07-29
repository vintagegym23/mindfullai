import React from 'react';
import { BrainCog } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  withText = true,
  className = ''
}) => {
  const sizeMap = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  const textSizeMap = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <BrainCog className={`text-primary-500 ${sizeMap[size]}`} />
      {withText && (
        <span className={`ml-2 font-semibold ${textSizeMap[size]}`}>
          Mindful<span className="text-primary-500">AI</span>
        </span>
      )}
    </div>
  );
};

export default Logo;