import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrainCog } from 'lucide-react';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../contexts/AuthContext';

const SignupPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-card p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <BrainCog className="h-12 w-12 text-primary-500" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            Create an account
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Join Mindful AI and start your wellness journey
          </p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;