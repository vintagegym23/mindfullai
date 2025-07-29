export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Report {
  id: string;
  userId: string;
  date: string;
  score: number;
  mood: 'excellent' | 'good' | 'neutral' | 'poor' | 'critical';
  summary: string;
  insights: string[];
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: string;
}

export interface EmotionData {
  date: string;
  score: number;
  emotion: 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'neutral';
}

export interface SummaryReport {
  id: string;
  title: string;
  date: string;
  insights: string[];
  emotionSummary: {
    dominant: string;
    improvement: boolean;
  };
}