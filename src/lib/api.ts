// API utilities for AlgoFlow
import { sendToGemini, analyzeCode, explainAlgorithm, provideHint } from './gemini';

// Mock API endpoint for development
export const callGeminiAPI = async (message: string, context: string = 'algorithm-learning') => {
  // In development, we'll call the Gemini function directly
  // In production, this would call your backend API
  return await sendToGemini(message, context);
};

export const callCodeAnalysis = async (code: string, algorithm: string) => {
  return await analyzeCode(code, algorithm);
};

export const callAlgorithmExplanation = async (algorithm: string, level: 'beginner' | 'intermediate' | 'advanced' = 'beginner') => {
  return await explainAlgorithm(algorithm, level);
};

export const callHintGeneration = async (problem: string, studentAttempt: string) => {
  return await provideHint(problem, studentAttempt);
};
