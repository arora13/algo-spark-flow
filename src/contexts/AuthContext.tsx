
import React, { createContext, useContext, useState, ReactNode } from 'react';

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

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login - in real app, this would call your backend
    if (email && password) {
      setUser({
        id: '1',
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
    // Simulate signup - in real app, this would call your backend
    if (email && password && name) {
      setUser({
        id: '1',
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
