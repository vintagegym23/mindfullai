import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, MessageCircle, BarChart2 } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary-600 font-semibold text-xl">
          <Brain className="h-6 w-6" />
          <span>Mindful AI</span>
        </Link>
        
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link 
                to="/"
                className={`flex items-center gap-1 ${location.pathname === '/' ? 'text-primary-500 font-medium' : 'text-gray-600 hover:text-primary-500'}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/chat"
                className={`flex items-center gap-1 ${location.pathname === '/chat' ? 'text-primary-500 font-medium' : 'text-gray-600 hover:text-primary-500'}`}
              >
                <MessageCircle className="h-4 w-4" />
                Chat
              </Link>
            </li>
            <li>
              <Link 
                to="/dashboard"
                className={`flex items-center gap-1 ${location.pathname === '/dashboard' ? 'text-primary-500 font-medium' : 'text-gray-600 hover:text-primary-500'}`}
              >
                <BarChart2 className="h-4 w-4" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/reports"
                className={`flex items-center gap-1 ${location.pathname === '/reports' ? 'text-primary-500 font-medium' : 'text-gray-600 hover:text-primary-500'}`}
              >
                <MessageCircle className="h-4 w-4" />
                View Reports
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;