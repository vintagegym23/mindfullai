import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrainCog } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  if (localStorage.getItem('token')) return <Navigate to="/dashboard" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-card p-8">
        <div className="text-center mb-8">
          <BrainCog className="h-12 w-12 text-primary-500 mx-auto" />
          <h2 className="mt-4 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Log in to Mindful AI</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;