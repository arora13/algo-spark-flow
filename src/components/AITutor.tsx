import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, HelpCircle, Code, Lightbulb, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AITutor = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [showMainHelp, setShowMainHelp] = useState(false);
  const [showPromptHelp, setShowPromptHelp] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hoot hoot! 🦉 I'm Algo, your wise owl tutor! I wear these glasses to see through complex algorithms and help you understand them better. What would you like to learn today?",
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'ai',
      content: "I can help you with sorting algorithms like bubble sort, merge sort, and selection sort! Just ask me anything about computer science concepts.",
      timestamp: new Date()
    },
    {
      id: '3',
      type: 'ai',
      content: "Try asking me: 'How does bubble sort work?' or 'Explain merge sort step by step' - I'm here to help you understand! 🦉",
      timestamp: new Date()
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Send a message to Algo - the magic happens here! ✨
  const sendMessage = async () => {
    if (!userInput.trim() || isThinking) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setUserInput('');
    setIsThinking(true);

    try {
      // Import the API function dynamically to avoid SSR issues
      const { callGeminiAPI } = await import('@/lib/api');
      const result = await callGeminiAPI(userInput, 'algorithm-learning');
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: result.response || "Hoot hoot! Sorry, I'm having trouble thinking right now. Try again in a moment! 🦉",
        timestamp: new Date()
      };

      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Hoot hoot! I'm having trouble connecting right now. Check your internet and try again! 🦉",
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Quick questions for lazy typers (like me! 😅)
  const quickQuestions = [
    "Explain merge sort",
    "Review my code",
    "What's the time complexity?",
    "Give me a hint"
  ];

  // Example prompts to help users know what to ask
  const examplePrompts = [
    "Explain [algorithm name] step by step",
    "What's the difference between [algorithm A] and [algorithm B]?",
    "Review this code: [paste your code]",
    "What's the time complexity of [algorithm]?",
    "I'm stuck on this problem, give me a hint",
    "How does [data structure] work?",
    "Why is my [algorithm] implementation slow?",
    "Show me a simple example of [concept]",
    "What are the pros and cons of [algorithm]?",
    "How can I optimize this code?"
  ];

  // Auto-fill and send quick questions
  const sendQuickQuestion = (question: string) => {
    setUserInput(question);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <>
      {/* AI Tutor Toggle */}
      <motion.div 
        className="bg-white/[0.08] backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="relative">
              <div className="text-2xl">🦉</div>
              <div className="absolute -bottom-1 -right-1 text-xs">👓</div>
            </div>
            <h3 className="text-sm font-semibold ml-2">Algo the Owl</h3>
            <button
              onClick={() => setShowMainHelp(!showMainHelp)}
              className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <HelpCircle className="h-3 w-3 text-white/60" />
            </button>
          </div>
          
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              chatOpen
                ? 'bg-blue-500/20 text-blue-200 hover:bg-blue-500/30'
                : 'bg-blue-500/10 text-blue-300 hover:bg-blue-500/20'
            }`}
          >
            {chatOpen ? '🦉 Hide Algo' : '🦉 Chat with Algo'}
          </button>
        </div>
      </motion.div>

      {/* Help Modal */}
      <AnimatePresence>
        {showMainHelp && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMainHelp(false)}
          >
            <motion.div
              className="bg-white/[0.1] backdrop-blur-md rounded-xl p-6 max-w-md w-full border border-white/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <div className="text-2xl">🦉</div>
                    <div className="absolute -bottom-1 -right-1 text-xs">👓</div>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Meet Algo the Owl</h3>
                </div>
                <button
                  onClick={() => setShowMainHelp(false)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>
              </div>
              <div className="space-y-3 text-sm text-white/80">
                <p>🦉 <strong>Algo's Specialties:</strong> This wise owl with glasses can help explain algorithms, review your code, and answer programming questions!</p>
                <p>💡 <strong>Smart Explanations:</strong> Ask about any algorithm and get clear, step-by-step breakdowns with analogies.</p>
                <p>🔍 <strong>Code Review:</strong> Paste your code and Algo will give you feedback on logic, efficiency, and style.</p>
                <p>📚 <strong>Learning Support:</strong> Get hints, debugging help, and personalized study guidance.</p>
                <p>⚠️ <strong>Note:</strong> Algo only helps with computer science, algorithms, and programming questions.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Help Modal */}
      <AnimatePresence>
        {showPromptHelp && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPromptHelp(false)}
          >
            <motion.div
              className="bg-white/[0.1] backdrop-blur-md rounded-xl p-6 max-w-lg w-full border border-white/20 max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Example Prompts</h3>
                <button
                  onClick={() => setShowPromptHelp(false)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>
              </div>
              <div className="space-y-2 text-sm text-white/80">
                <p className="text-white/60 mb-3">Click any prompt to use it:</p>
                {examplePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setUserInput(prompt);
                      setShowPromptHelp(false);
                    }}
                    className="w-full text-left p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="bg-white/[0.08] backdrop-blur-sm rounded-xl shadow-xl border border-white/10 w-full max-w-sm h-[28rem] flex flex-col"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/10">
              <div className="flex items-center">
                <div className="relative mr-2">
                  <div className="text-lg">🦉</div>
                  <div className="absolute -bottom-0.5 -right-0.5 text-xs">👓</div>
                </div>
                <h4 className="text-sm font-semibold text-blue-200">Algo the Owl</h4>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-3 w-3 text-white/60" />
              </button>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-3" 
              style={{ 
                scrollbarWidth: 'thin', 
                scrollbarColor: 'rgba(255,255,255,0.3) transparent',
                WebkitScrollbar: {
                  width: '6px'
                },
                WebkitScrollbarTrack: {
                  background: 'transparent'
                },
                WebkitScrollbarThumb: {
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '3px'
                }
              }}
            >
              {chatHistory.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded-lg text-xs ${
                      message.type === 'user'
                        ? 'bg-blue-500/20 text-blue-200'
                        : 'bg-white/10 text-white/90'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 text-white/90 p-2 rounded-lg text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-2 sm:p-3 border-t border-white/10">
              <div className="flex flex-wrap gap-1 mb-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => sendQuickQuestion(question)}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 text-white/70 text-xs rounded transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-2 sm:p-3 border-t border-white/10">
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowPromptHelp(true)}
                  className="p-2 bg-white/5 hover:bg-white/10 text-white/60 rounded-lg transition-colors"
                  title="See example prompts"
                >
                  <HelpCircle className="h-3 w-3" />
                </button>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about algorithms..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  disabled={isThinking}
                />
                <button
                  onClick={sendMessage}
                  disabled={!userInput.trim() || isThinking}
                  className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AITutor;
