import React from 'react';
import { SummaryReport } from '../types';
import { FileText, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardProps {
  report: SummaryReport;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ report }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-primary-100 p-2 rounded-lg mr-3">
              <FileText className="h-5 w-5 text-primary-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{report.title}</h3>
              <p className="text-sm text-gray-500">{report.date}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Dominant Emotion:</span>
            <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 capitalize">
              {report.emotionSummary.dominant}
            </span>
            {report.emotionSummary.improvement ? (
              <span className="ml-2 flex items-center text-xs text-success-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                Improving
              </span>
            ) : (
              <span className="ml-2 flex items-center text-xs text-warning-500">
                <TrendingDown className="h-3 w-3 mr-1" />
                Needs attention
              </span>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Insights:</h4>
          <ul className="space-y-1">
            {report.insights.map((insight, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200 px-5 py-3">
        <button className="text-sm text-primary-500 font-medium flex items-center hover:text-primary-600 transition-colors">
          View Full Report
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SummaryCard;