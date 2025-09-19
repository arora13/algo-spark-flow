// Backend API Integration for AlgoFlow 🚀
// This file handles all communication with the Flask backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://Algoflow-backend-env.eba-mbk6m5u4.us-east-2.elasticbeanstalk.com/api';

// Types for our API responses
interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  last_login?: string;
}

interface UserProgress {
  completed_algorithms: string[];
  solved_problems: string[];
  total_study_time: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date?: string;
}

interface UserActivity {
  id: number;
  type: string;
  name: string;
  score: number;
  time_spent: number;
  created_at: string;
}

interface AuthResponse {
  message: string;
  user: User;
  access_token: string;
}

interface ProfileResponse {
  user: User;
  progress: UserProgress;
}

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Helper function to make authenticated requests
const apiRequest = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAuthToken();
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }
  
  return response;
};

// Authentication API functions
export const authAPI = {
  // Register a new user - welcome to the family! 🎉
  register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    
    const data = await response.json();
    
    // Store the token for future requests
    if (data.access_token) {
      localStorage.setItem('auth_token', data.access_token);
    }
    
    return data;
  },

  // Login existing user - welcome back! 👋
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    // Store the token for future requests
    if (data.access_token) {
      localStorage.setItem('auth_token', data.access_token);
    }
    
    return data;
  },

  // Logout user - see ya! 👋
  logout: (): void => {
    localStorage.removeItem('auth_token');
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return !!getAuthToken();
  },
};

// User profile API functions
export const userAPI = {
  // Get current user's profile and progress 📊
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await apiRequest('/user/profile');
    return response.json();
  },
};

// Progress tracking API functions
export const progressAPI = {
  // Update user's learning progress - keep going! 💪
  updateProgress: async (activityData: {
    activity_type: 'algorithm' | 'problem' | 'study_session';
    algorithm_id?: string;
    problem_id?: string;
    activity_name?: string;
    score?: number;
    time_spent?: number;
  }): Promise<{ message: string; progress: UserProgress }> => {
    const response = await apiRequest('/progress/update', {
      method: 'POST',
      body: JSON.stringify(activityData),
    });
    
    return response.json();
  },

  // Get user's recent activities - see how awesome you are! 📈
  getActivities: async (limit: number = 10): Promise<{ activities: UserActivity[] }> => {
    const response = await apiRequest(`/activities?limit=${limit}`);
    return response.json();
  },
};

// Health check API function
export const healthAPI = {
  // Check if the API is alive 💓
  checkHealth: async (): Promise<{ status: string; message: string; timestamp: string }> => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },
};

// Utility functions for common operations
export const apiUtils = {
  // Mark an algorithm as completed
  markAlgorithmCompleted: async (algorithmId: string, algorithmName: string): Promise<void> => {
    await progressAPI.updateProgress({
      activity_type: 'algorithm',
      algorithm_id: algorithmId,
      activity_name: algorithmName,
      score: 100,
    });
  },

  // Mark a problem as solved
  markProblemSolved: async (problemId: string, problemName: string, score: number): Promise<void> => {
    await progressAPI.updateProgress({
      activity_type: 'problem',
      problem_id: problemId,
      activity_name: problemName,
      score,
    });
  },

  // Record study session time
  recordStudyTime: async (timeSpent: number, activityName: string = 'Study Session'): Promise<void> => {
    await progressAPI.updateProgress({
      activity_type: 'study_session',
      activity_name: activityName,
      time_spent: timeSpent,
    });
  },
};

// Error handling utility
export const handleAPIError = (error: any): string => {
  if (error.message) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// Export the base URL for other uses
export { API_BASE_URL };
