import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import FloatingElements from "@/components/FloatingElements";

const PracticeCoding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState(['Welcome to AlgoFlow! Ready to help you solve this problem.']);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (location.state?.problem) {
      setProblem(location.state.problem);
      setCode(location.state.initialCode || '');
      setConsoleOutput([
        'Welcome to AlgoFlow! Ready to help you solve this problem.',
        'Tip: Click "Run Code" to test your solution!',
        `Focus on the algorithm: ${location.state.problem.categoryKey?.toUpperCase().replace('_', ' ')}`
      ]);
    } else {
      // If no problem data, redirect back to practice
      navigate('/practice');
    }
  }, [location.state, navigate]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case 'medium':
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case 'hard':
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const runCode = async () => {
    if (!problem || !code.trim()) return;
    
    setIsRunning(true);
    setConsoleOutput(prev => [...prev, 'Running your code with AlgoFlow CLI...']);
    
    try {
      // Create a temporary solution file
      const solutionContent = code;
      const tempFileName = `temp_solution_${Date.now()}.py`;
      
      // Write the solution to a temporary file
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/run-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: solutionContent,
          algorithm: problem.categoryKey,
          problemId: problem.id,
          fileName: tempFileName
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to run code');
      }
      
      const results = await response.json();
      
      // Update console with results
      const newOutput = [...consoleOutput, 'Test Results:'];
      
      if (results.results && results.results.length > 0) {
        results.results.forEach((result, index) => {
          if (result.passed) {
            if (result.swaps !== undefined) {
              newOutput.push(`✅ Test ${index + 1}: PASSED - swaps=${result.swaps} → output=${JSON.stringify(result.output)}`);
            } else {
              newOutput.push(`✅ Test ${index + 1}: PASSED - output=${JSON.stringify(result.output)}`);
            }
          } else {
            const errorMsg = result.error || 'Test failed';
            newOutput.push(`❌ Test ${index + 1}: FAILED - ${errorMsg}`);
          }
        });
        
        // Add feedback
        const passedTests = results.results.filter(r => r.passed).length;
        const totalTests = results.results.length;
        
        if (passedTests === totalTests) {
          newOutput.push('Great job! All tests passed!');
        } else {
          newOutput.push(`Progress: ${passedTests}/${totalTests} tests passed`);
        }
      } else if (results.error) {
        newOutput.push(`Error: ${results.error}`);
      } else {
        newOutput.push('No results returned from CLI tool');
      }
      
      setConsoleOutput(newOutput);
      
    } catch (error) {
      setConsoleOutput(prev => [...prev, `Error: ${error.message}`]);
    } finally {
      setIsRunning(false);
    }
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#0b1f24] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0b1f24] text-white">
      <FloatingElements />
      
      {/* Header */}
      <div className="relative z-10 pt-24 pb-8 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{problem.title}</h1>
            <p className="text-slate-400">Algorithm: {problem.categoryKey?.toUpperCase().replace('_', ' ')}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className={`${getDifficultyColor(problem.difficulty)} border`}>
              {problem.difficulty}
            </Badge>
            <Button 
              onClick={() => navigate('/practice')}
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              ← Back to Practice
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
          {/* Left Side - Problem Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6 overflow-y-auto"
          >
            <div className="space-y-6">
              {/* Problem Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">📝 Problem Description</h3>
                <p className="text-slate-300 leading-relaxed">{problem.description}</p>
              </div>

              {/* Input/Output */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">🔧 Input/Output</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-1">Input:</h4>
                    <p className="text-slate-400 text-sm">{problem.input_desc}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-1">Output:</h4>
                    <p className="text-slate-400 text-sm">{problem.output_desc}</p>
                  </div>
                </div>
              </div>

              {/* Examples */}
              {problem.examples && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">💡 Examples</h3>
                  <div className="space-y-3">
                    {problem.examples.map((example, idx) => (
                      <div key={idx} className="bg-slate-800/30 rounded-lg p-4">
                        <div className="mb-2">
                          <span className="text-sm font-medium text-slate-300">Input: </span>
                          <code className="text-emerald-400 text-sm">{JSON.stringify(example.input)}</code>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-300">Output: </span>
                          <code className="text-blue-400 text-sm">{JSON.stringify(example.output)}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Constraints */}
              {problem.constraints && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">⚠️ Constraints</h3>
                  <ul className="space-y-2">
                    {problem.constraints.map((constraint, idx) => (
                      <li key={idx} className="text-slate-400 text-sm flex items-start">
                        <span className="text-yellow-400 mr-2">•</span>
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Side - Code Editor & Console */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            {/* Code Editor */}
            <div className="flex-1 bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">💻 Code Editor</h3>
              <div className="bg-slate-900/50 rounded-lg p-4 h-full">
                <textarea
                  className="w-full h-full bg-transparent text-green-400 font-mono text-sm resize-none outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`def solve(input_data):
    # Your solution here
    # Example: ${problem.examples?.[0]?.input ? JSON.stringify(problem.examples[0].input) : 'input_data'}
    return result`}
                />
              </div>
            </div>

            {/* Console */}
            <div className="h-80 bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">AlgoFlow Console</h3>
              <div className="bg-black/50 rounded-lg p-4 h-full overflow-y-auto">
                <div className="text-green-400 font-mono text-sm space-y-2">
                  {consoleOutput.map((line, index) => (
                    <div key={index} className={
                      line.includes('✅') ? 'text-green-400' : 
                      line.includes('❌') ? 'text-red-400' : 
                      line.includes('Test Results:') ? 'text-yellow-400' : 
                      'text-slate-400'
                    }>
                      {line}
                    </div>
                  ))}
                  {isRunning && (
                    <div className="text-blue-400 animate-pulse">
                      Processing...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-3">
                <Button 
                  onClick={runCode}
                  disabled={isRunning || !code.trim()}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 flex-1"
                >
                  {isRunning ? '⏳ Running...' : '🚀 Run Code'}
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  💾 Save Solution
                </Button>
                <Button 
                  onClick={() => {
                    setCode(`def solve(input_data):
    # Your solution here
    # Example: ${problem.examples?.[0]?.input ? JSON.stringify(problem.examples[0].input) : 'input_data'}
    return result`);
                    setConsoleOutput([
                      'Welcome to AlgoFlow! Ready to help you solve this problem.',
                      'Tip: Click "Run Code" to test your solution!',
                      `Focus on the algorithm: ${problem.categoryKey?.toUpperCase().replace('_', ' ')}`
                    ]);
                  }}
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  🔄 Reset
                </Button>
              </div>
              
              {/* Help message */}
              <div className="text-center">
                <p className="text-slate-400 text-sm">
                  If you feel like your code is still right, ask Algo the owl on the left
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PracticeCoding;
