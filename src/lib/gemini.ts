// Gemini AI integration for AlgoFlow
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface GeminiResponse {
  response: string;
  success: boolean;
  error?: string;
}

export const sendToGemini = async (message: string, context: string = 'algorithm-learning'): Promise<GeminiResponse> => {
  if (!GEMINI_API_KEY) {
    return {
      response: "AI Tutor is not configured. Please add your Gemini API key to use this feature.",
      success: false,
      error: "No API key provided"
    };
  }

  try {
    // Create context-aware prompt
    const systemPrompt = `You are Algo, a wise owl tutor with glasses who specializes in algorithms and data structures. 
    You're helping high school and early college students learn algorithms through AlgoFlow, an interactive learning platform.
    
    Your personality:
    - You're a friendly, wise owl who wears glasses to see through complex algorithms
    - You occasionally say "Hoot hoot!" when excited or making a good point
    - You use owl-themed analogies when explaining concepts
    - You're encouraging, patient, and supportive
    - You love helping students understand algorithms step by step
    
    Your role:
    - Explain algorithms in simple, clear terms with owl wisdom
    - Provide step-by-step breakdowns with analogies
    - Review and improve student code with gentle guidance
    - Give hints without giving away solutions
    - Use examples that relate to your owl perspective when helpful
    - Be encouraging and supportive like a wise mentor
    
    IMPORTANT: If the question is not related to computer science, algorithms, data structures, or programming, 
    respond with: "Hoot hoot! Sorry, I don't know how to respond to this yet. I'm here to help with algorithms and programming questions! 🦉"
    
    Context: ${context}
    
    Keep responses concise but helpful (2-3 paragraphs max). Remember to be Algo the wise owl!`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${systemPrompt}\n\nStudent question: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return {
        response: data.candidates[0].content.parts[0].text,
        success: true
      };
    } else {
      throw new Error('Invalid response format from Gemini API');
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      response: "I'm having trouble connecting to the AI service right now. Please try again in a moment.",
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Specialized functions for different use cases
export const analyzeCode = async (code: string, algorithm: string): Promise<GeminiResponse> => {
  const prompt = `Please review this ${algorithm} implementation and provide feedback:
  
  Code:
  \`\`\`
  ${code}
  \`\`\`
  
  Please provide:
  1. Overall assessment
  2. Any bugs or issues
  3. Suggestions for improvement
  4. Time/space complexity analysis
  
  Be encouraging but thorough.`;

  return sendToGemini(prompt, 'code-review');
};

export const explainAlgorithm = async (algorithm: string, level: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): Promise<GeminiResponse> => {
  const prompt = `Explain ${algorithm} for a ${level} level student. Include:
  1. What it does in simple terms
  2. How it works step-by-step
  3. A real-world analogy
  4. Time and space complexity
  5. When to use it
  
  Make it engaging and easy to understand.`;

  return sendToGemini(prompt, 'algorithm-explanation');
};

export const provideHint = async (problem: string, studentAttempt: string): Promise<GeminiResponse> => {
  const prompt = `A student is working on this problem: "${problem}"
  
  Their current approach: "${studentAttempt}"
  
  Provide a helpful hint that guides them toward the solution without giving it away. 
  Focus on the key insight they're missing.`;

  return sendToGemini(prompt, 'hint-generation');
};
