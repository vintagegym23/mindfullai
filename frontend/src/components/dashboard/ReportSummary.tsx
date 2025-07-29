import React from 'react';
import { Smile, BarChart2, Lightbulb, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Report } from '../../types';

interface ReportSummaryProps {
  latestReport?: Report | null;
}

const mockReport: Report = {
  id: '1',
  userId: '1',
  date: new Date().toISOString(),
  score: 75,
  mood: 'good',
  summary: 'Your mental wellness has been mostly positive with some room for improvement.',
  insights: [
    'Your sleep patterns are improving compared to last week.',
    'Consider incorporating more mindfulness practices.',
    'Your stress levels are lower than average.'
  ]
};

const ReportSummary: React.FC<ReportSummaryProps> = ({ latestReport = mockReport }) => {
  if (!latestReport) {
    return (
      <Card className="bg-white dark:bg-gray-800 p-6 text-center text-gray-500 dark:text-gray-400">
        No report data available.
      </Card>
    );
  }

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'excellent':
        return <Smile className="h-6 w-6 text-success-500" />;
      case 'good':
        return <Smile className="h-6 w-6 text-primary-500" />;
      case 'neutral':
        return <Smile className="h-6 w-6 text-gray-500" />;
      case 'poor':
        return <Smile className="h-6 w-6 text-warning-500" />;
      case 'critical':
        return <Smile className="h-6 w-6 text-error-500" />;
      default:
        return <Smile className="h-6 w-6 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <div className="flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="heading-3 text-gray-900 dark:text-white">Recent Wellness Report</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(latestReport.date)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
          <div className="flex items-center space-x-3">
            {getMoodIcon(latestReport.mood)}
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Mood</p>
              <p className="font-medium text-gray-900 dark:text-white capitalize">
                {latestReport.mood}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <BarChart2 className="h-6 w-6 text-secondary-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Wellness Score</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {latestReport.score}/100
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Lightbulb className="h-6 w-6 text-accent-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Insights</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {latestReport.insights.length} new
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/20 p-4 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">
            {latestReport.summary}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Key Insights</h3>
          <ul className="space-y-2">
            {latestReport.insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 mr-2 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2">
          <Button variant="outline" fullWidth className="flex items-center justify-center">
            <span>View Full Report</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ReportSummary;
