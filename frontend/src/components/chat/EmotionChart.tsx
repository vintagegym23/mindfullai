import React from 'react';
import { EmotionData } from '../types';

interface EmotionChartProps {
  data: EmotionData[];
}

const EmotionChart: React.FC<EmotionChartProps> = ({ data }) => {
  // This is a simplified chart - in a real app, you would use a library like Chart.js or Recharts
  const maxScore = Math.max(...data.map(item => item.score));
  const normalizedData = data.map(item => ({
    ...item,
    normalizedScore: (item.score / maxScore) * 100
  }));

  // Color mapping for emotions
  const getEmotionColor = (emotion: string): string => {
    switch (emotion) {
      case 'joy':
        return 'bg-success-400';
      case 'sadness':
        return 'bg-primary-400';
      case 'anger':
        return 'bg-error-400';
      case 'fear':
        return 'bg-warning-400';
      case 'surprise':
        return 'bg-accent-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Emotion Trends</h3>
      
      <div className="h-64 flex items-end space-x-2">
        {normalizedData.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className={`${getEmotionColor(item.emotion)} rounded-t-sm w-full`} 
              style={{ height: `${item.normalizedScore}%` }}
            ></div>
            <div className="text-xs mt-2 text-gray-600 truncate w-full text-center">
              {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center space-x-4">
        {['joy', 'sadness', 'anger', 'fear', 'surprise', 'neutral'].map(emotion => (
          <div key={emotion} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${getEmotionColor(emotion)} mr-1`}></div>
            <span className="text-xs text-gray-600 capitalize">{emotion}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionChart;