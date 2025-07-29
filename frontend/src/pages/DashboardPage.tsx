import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Plus, ChevronRight } from 'lucide-react';
import WelcomePanel from '../components/dashboard/WelcomePanel';
import ReportSummary from '../components/dashboard/ReportSummary';
import QuoteOfDay from '../components/dashboard/QuoteOfDay';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { fetchDashboardStats, fetchLatestReport } from '../services/api';

// Types
interface DashboardStats {
  sessions: number;
  messages: number;
}

interface Report {
  id: string;
  content: string;
  created_at: string;
  // Add more fields based on your actual API response
}

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [report, setReport] = useState<Report | null>(null);
  const [stats, setStats] = useState<DashboardStats>({ sessions: 0, messages: 0 });

  useEffect(() => {
    fetchDashboardStats()
      .then(setStats)
      .catch((err) => console.error('Error fetching stats:', err));

    fetchLatestReport()
      .then(setReport)
      .catch((err) => console.error('Error fetching latest report:', err));
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 pt-24 pb-12 min-h-screen">
      <div className="container-custom">
        <WelcomePanel user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            <ReportSummary latestReport={report} />


            <Card className="bg-white dark:bg-gray-800">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="heading-4 text-gray-900 dark:text-white">Quick Actions</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { to: "/checkin", label: "New Check-in", sub: "Record your current mental state", color: "primary" },
                    { to: "/goals", label: "Wellness Goals", sub: "Set and track your progress", color: "secondary" },
                    { to: "/mindfulness", label: "Mindfulness Session", sub: "Start a guided meditation", color: "accent" },
                    { to: "/journal", label: "Journal Entry", sub: "Write about your day", color: "success" },
                  ].map(({ to, label, sub, color }) => (
                    <Button
                      key={to}
                      to={to}
                      variant="outline"
                      className="h-auto py-3 justify-start hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center w-full">
                        <div className={`bg-${color}-100 dark:bg-${color}-900/30 p-2 rounded-full mr-3`}>
                          <Plus className={`h-5 w-5 text-${color}-500`} />
                        </div>
                        <div className="text-left">
                          <span className="block font-medium text-gray-900 dark:text-white">{label}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{sub}</span>
                        </div>
                        <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            <QuoteOfDay />

            <Card className="bg-white dark:bg-gray-800">
              <div className="flex flex-col space-y-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Wellness Tips</h3>
                <ul className="space-y-3">
                  {[
                    'Try a 5-minute breathing exercise when feeling stressed.',
                    'Stay hydrated throughout the day for better mental clarity.',
                    "Practice gratitude by noting three things you're thankful for each day.",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 mr-2 flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <div className="flex flex-col space-y-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Weekly Progress</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Sleep Quality', percent: 75, color: 'primary' },
                    { label: 'Stress Management', percent: 60, color: 'secondary' },
                    { label: 'Mindfulness Practice', percent: 45, color: 'accent' },
                  ].map(({ label, percent, color }, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</span>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{percent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className={`bg-${color}-500 h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
