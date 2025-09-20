
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  progress: {
    completedAlgorithms: string[];
    solvedProblems: string[];
    totalScore: number;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (type: 'algorithm' | 'problem', id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('algoflow_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('algoflow_user');
      }
    }
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('algoflow_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('algoflow_user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://Algoflow-backend-env.eba-mbk6m5u4.us-east-2.elasticbeanstalk.com/api';
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      setUser({
        id: data.user.id.toString(),
        email: data.user.email,
        name: data.user.name,
        progress: {
          completedAlgorithms: data.user.progress?.completed_algorithms || [],
          solvedProblems: data.user.progress?.solved_problems || [],
          totalScore: data.user.progress?.total_study_time || 0
        }
      });
      
      // Store the JWT token
      if (data.access_token) {
        localStorage.setItem('algoflow_token', data.access_token);
      }
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://Algoflow-backend-env.eba-mbk6m5u4.us-east-2.elasticbeanstalk.com/api';
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      
      setUser({
        id: data.user.id.toString(),
        email: data.user.email,
        name: data.user.name,
        progress: {
          completedAlgorithms: [],
          solvedProblems: [],
          totalScore: 0
        }
      });
      
      // Store the JWT token
      if (data.access_token) {
        localStorage.setItem('algoflow_token', data.access_token);
      }
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('algoflow_token');
  };

  const updateProgress = (type: 'algorithm' | 'problem', id: string) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return prev;
      
      const newProgress = { ...prev.progress };
      if (type === 'algorithm' && !newProgress.completedAlgorithms.includes(id)) {
        newProgress.completedAlgorithms.push(id);
        newProgress.totalScore += 100;
      } else if (type === 'problem' && !newProgress.solvedProblems.includes(id)) {
        newProgress.solvedProblems.push(id);
        newProgress.totalScore += 50;
      }
      
      return { ...prev, progress: newProgress };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProgress }}>
      {children}
    </AuthContext.Provider>
  );
};
