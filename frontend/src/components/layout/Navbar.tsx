import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import ProfileDropdown from './ProfileDropdown';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}
  `;

  return (
    <nav className={navbarClasses}>
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400">Home</Link>
            <Link to="/features" className="text-sm font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400">Features</Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400">About</Link>
            <Link to="/contact" className="text-sm font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400">Contact</Link>
            {!isLoading && isAuthenticated && (
              
              <Link to="/chatpage" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Chat</Link>
            )}
            {!isLoading && isAuthenticated && (
              <Link to="/dashboard" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Dashboard</Link>
            )}



          </div>

          {/* Right Side */}
          <div className="flex items-center">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Auth Actions */}
            <div className="hidden md:block">
              {!isLoading && isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <ProfileDropdown user={user} />
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                !isLoading && (
                  <div className="flex items-center space-x-4">
                    <Link to="/login">
                      <Button variant="outline" size="sm">Log In</Button>
                    </Link>
                    <Link to="/signup">
                      <Button size="sm">Sign Up</Button>
                    </Link>
                  </div>
                )
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                type="button"
                className="p-2 rounded-md text-gray-700 dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container-custom py-4 space-y-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/features" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            {!isLoading && isAuthenticated && (
              <Link to="/chatpage" onClick={() => setIsMobileMenuOpen(false)}>Chat</Link>
            )}
            {!isLoading && !isAuthenticated && (
              <div className="pt-4 flex flex-col space-y-4">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth>Log In</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button fullWidth>Sign Up</Button>
                </Link>
              </div>
            )}
            {!isLoading && isAuthenticated && (
              <Button variant="ghost" fullWidth onClick={async () => {
                setIsMobileMenuOpen(false);
                await handleLogout();
              }}>
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
