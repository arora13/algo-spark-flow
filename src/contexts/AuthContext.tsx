
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
    // Temporary: Use simulated login until backend endpoints are fixed
    if (email && password) {
      // Generate unique user ID based on email and timestamp
      const userId = btoa(email + Date.now()).replace(/[^a-zA-Z0-9]/g, '').substring(0, 12);
      
      setUser({
        id: userId,
        email,
        name: email.split('@')[0],
        progress: {
          completedAlgorithms: [],
          solvedProblems: [],
          totalScore: 0
        }
      });
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Temporary: Use simulated signup until backend endpoints are fixed
    if (email && password && name) {
      // Generate unique user ID based on email and timestamp
      const userId = btoa(email + Date.now()).replace(/[^a-zA-Z0-9]/g, '').substring(0, 12);
      
      setUser({
        id: userId,
        email,
        name,
        progress: {
          completedAlgorithms: [],
          solvedProblems: [],
          totalScore: 0
        }
      });
      return true;
    }
    return false;
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
