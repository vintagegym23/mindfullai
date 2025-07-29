import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { signup, isAuthenticated, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      await signup(username, email, password);
      // navigation handled in useEffect below
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-100 text-red-600 p-3 rounded-md">{error}</div>}
      <div className="space-y-4">
        <div className="relative">
          <Input
            id="username"
            type="text"
            label="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <User className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
        </div>
        <div className="relative">
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Mail className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
        </div>
        <div className="relative">
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Lock className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
        </div>
        <div className="relative">
          <Input
            id="confirm-password"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Lock className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <Button type="submit" fullWidth isLoading={isSubmitting || isLoading}>
        Create Account
      </Button>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-500">
          Log in
        </Link>
      </div>
    </form>
  );
};

export default SignupForm;
