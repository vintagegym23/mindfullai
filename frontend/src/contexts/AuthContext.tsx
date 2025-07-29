import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { User, AuthContextType, ChildrenProps } from '../types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  refreshToken: async () => {},
});

const API_BASE = 'https://mindfullai.onrender.com/api';

export const AuthProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTokens = () => ({
    access: localStorage.getItem('access_token'),
    refresh: localStorage.getItem('refresh_token'),
  });

  const saveTokens = (access: string, refresh: string) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  };

  const removeTokens = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  };

  const fetchUserProfile = async (accessToken: string): Promise<User | null> => {
    try {
      const res = await fetch(`${API_BASE}/user/profile/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch user profile');
      const data = await res.json();
      return {
        id: data.id.toString(),
        name: data.username,
        email: data.email,
        avatar: data.avatar || undefined,
      };
    } catch {
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || 'Login failed');
      }

      const data = await res.json();
      saveTokens(data.access, data.refresh);
      const userData = await fetchUserProfile(data.access);
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/user/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(
          errData.email?.join(' ') ||
            errData.username?.join(' ') ||
            'Signup failed'
        );
      }

      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeTokens();
    if (user !== null) {
      setUser(null);
    }
  };

  const refreshToken = async () => {
    const tokens = getTokens();
    if (!tokens.refresh) {
      logout();
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });

      if (!res.ok) throw new Error('Failed to refresh token');

      const data = await res.json();
      localStorage.setItem('access_token', data.access);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const tokens = getTokens();

      if (tokens.access) {
        const payload = parseJwt(tokens.access);
        if (payload && payload.exp * 1000 > Date.now()) {
          const userData = await fetchUserProfile(tokens.access);
          setUser(userData);
        } else if (tokens.refresh) {
          await refreshToken();
          const newAccess = localStorage.getItem('access_token');
          if (newAccess) {
            const userData = await fetchUserProfile(newAccess);
            setUser(userData);
          }
        } else {
          if (user !== null) logout();
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
