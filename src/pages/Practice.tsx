
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, HelpCircle, CheckCircle, XCircle, Code, Brain, Target, Zap, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Practice = () => {
  const [selectedProblem, setSelectedProblem] = useState('two-sum');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{passed: boolean, input: string, expected: string, actual: string}>>([]);
  const { user, updateProgress } = useAuth();

  const problems = [
    {
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'Array',
      points: 100,
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
      examples: [
        { 
          input: 'nums = [2,7,11,15], target = 9', 
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
        },
        { 
          input: 'nums = [3,2,4], target = 6', 
          output: '[1,2]',
          explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
        },
        { 
          input: 'nums = [3,3], target = 6', 
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].'
        }
      ],
      constraints: [
        '2 ≤ nums.length ≤ 10⁴',
        '-10⁹ ≤ nums[i] ≤ 10⁹',
        '-10⁹ ≤ target ≤ 10⁹',
        'Only one valid answer exists'
      ],
      hints: [
        'Try using a hash map to store numbers you\'ve seen and their indices.',
        'For each number, check if (target - current number) exists in the hash map.',
        'If it exists, you\'ve found your pair! Return both indices.'
      ],
      template: `function twoSum(nums, target) {
    // Your solution here
    // Hint: Consider using a Map or object to store values and indices
    
    
    return []; // Return array of two indices
}`
    },
    {
      id: 'reverse-string',
      title: 'Reverse String',
      difficulty: 'Easy',
      category: 'String',
      points: 75,
      description: 'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.',
      examples: [
        { 
          input: 's = ["h","e","l","l","o"]', 
          output: '["o","l","l","e","h"]',
          explanation: 'The string "hello" becomes "olleh" when reversed.'
        },
        { 
          input: 's = ["H","a","n","n","a","h"]', 
          output: '["h","a","n","n","a","H"]',
          explanation: 'The string "Hannah" becomes "hannaH" when reversed.'
        }
      ],
      constraints: [
        '1 ≤ s.length ≤ 10⁵',
        's[i] is a printable ASCII character'
      ],
      hints: [
        'Use two pointers approach - one at the beginning and one at the end.',
        'Swap characters at both pointers and move them towards each other.',
        'Continue until the pointers meet in the middle.'
      ],
      template: `function reverseString(s) {
    // Modify s in-place and return it
    // Hint: Use two pointers from start and end
    
    
    return s;
}`
    },
    {
      id: 'binary-search-impl',
      title: 'Binary Search Implementation',
      difficulty: 'Medium',
      category: 'Search',
      points: 150,
      description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.',
      examples: [
        { 
          input: 'nums = [-1,0,3,5,9,12], target = 9', 
          output: '4',
          explanation: '9 exists in nums and its index is 4'
        },
        { 
          input: 'nums = [-1,0,3,5,9,12], target = 2', 
          output: '-1',
          explanation: '2 does not exist in nums so return -1'
        }
      ],
      constraints: [
        '1 ≤ nums.length ≤ 10⁴',
        '-10⁴ < nums[i], target < 10⁴',
        'All integers in nums are unique',
        'nums is sorted in ascending order'
      ],
      hints: [
        'Start with left and right pointers at the beginning and end of the array.',
        'Calculate the middle index and compare the middle element with target.',
        'If middle element equals target, return the index.',
        'If middle element is less than target, search the right half.',
        'If middle element is greater than target, search the left half.'
      ],
      template: `function search(nums, target) {
    // Implement binary search with O(log n) complexity
    // Return index if found, -1 if not found
    
    
    return -1;
}`
    },
    {
      id: 'valid-parentheses',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      category: 'Stack',
      points: 100,
      description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets, and open brackets must be closed in the correct order.',
      examples: [
        { 
          input: 's = "()"', 
          output: 'true',
          explanation: 'The string has valid matching parentheses.'
        },
        { 
          input: 's = "()[]{}"', 
          output: 'true',
          explanation: 'All brackets are properly matched and closed.'
        },
        { 
          input: 's = "(]"', 
          output: 'false',
          explanation: 'The brackets are not properly matched.'
        }
      ],
      constraints: [
        '1 ≤ s.length ≤ 10⁴',
        's consists of parentheses only \'()[]{}\''
      ],
      hints: [
        'Use a stack data structure to keep track of opening brackets.',
        'When you encounter an opening bracket, push it onto the stack.',
        'When you encounter a closing bracket, check if it matches the most recent opening bracket.',
        'The string is valid if the stack is empty at the end.'
      ],
      template: `function isValid(s) {
    // Use a stack to track opening brackets
    // Return true if all brackets are properly matched
    
    
    return false;
}`
    }
  ];

  const currentProblem = problems.find(p => p.id === selectedProblem) || problems[0];
  const isCompleted = user?.progress.solvedProblems.includes(selectedProblem);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('🚀 Running your code...\n⚡ Executing test cases...');
    
    setTimeout(() => {
      const mockResults = [
        { passed: true, input: 'Test case 1', expected: '[0,1]', actual: '[0,1]' },
        { passed: true, input: 'Test case 2', expected: '[1,2]', actual: '[1,2]' },
        { passed: Math.random() > 0.3, input: 'Test case 3', expected: '[2,3]', actual: '[1,3]' }
      ];
      
      setTestResults(mockResults);
      const passedCount = mockResults.filter(r => r.passed).length;
      setOutput(`✅ Execution completed!\n📊 ${passedCount}/${mockResults.length} test cases passed\n${passedCount === mockResults.length ? '🎉 All tests passed! Great job!' : '🔍 Some tests failed. Check the details below.'}`);
      setIsRunning(false);
    }, 2000);
  };

  const handleGetHint = () => {
    const hint = currentProblem.hints[Math.floor(Math.random() * currentProblem.hints.length)];
    setOutput(`💡 AI Debug Helper: ${hint}\n\n🎯 Try implementing this approach and run your code to see how it performs!`);
  };

  const handleSubmit = () => {
    if (testResults.length > 0 && testResults.every(test => test.passed)) {
      updateProgress('problem', selectedProblem);
      setOutput('🎉 Congratulations! All test cases passed!\n⭐ Problem marked as solved!\n🏆 Keep up the excellent work!');
    } else {
      setOutput('❌ Some test cases failed. Please review your solution and try again.\n🔍 Check the test results for specific details.\n💪 You\'re getting close! Keep trying!');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'from-emerald-400 to-emerald-600';
      case 'Medium': return 'from-amber-400 to-orange-500';
      case 'Hard': return 'from-red-400 to-red-600';
      default: return 'from-slate-400 to-slate-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Array': return Target;
      case 'String': return Code;
      case 'Search': return Brain;
      case 'Stack': return Zap;
      default: return Code;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 -top-40 -right-40" style={{ animationDelay: '1s' }} />
        <div className="floating-shape w-56 h-56 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 bottom-20 -left-28" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative z-10 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl text-slate-900 mb-6">
              Coding <span className="gradient-text">Practice Arena</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Sharpen your programming skills with our curated coding challenges and AI-powered debugging assistance
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Enhanced Problem Selection Sidebar */}
            <div className="lg:col-span-2">
              <Card className="glass-card border-white/40 mb-6">
                <CardHeader>
                  <CardTitle className="font-poppins text-xl text-slate-900 flex items-center">
                    <Code className="mr-2 h-5 w-5 text-blue-600" />
                    Practice Problems
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2">
                    {problems.map((problem) => {
                      const isSelected = selectedProblem === problem.id;
                      const isProblemCompleted = user?.progress.solvedProblems.includes(problem.id);
                      const CategoryIcon = getCategoryIcon(problem.category);
                      
                      return (
                        <button
                          key={problem.id}
                          onClick={() => {
                            setSelectedProblem(problem.id);
                            setCode(problem.template);
                            setOutput('');
                            setTestResults([]);
                          }}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-300 group ${
                            isSelected
                              ? 'bg-gradient-primary text-white soft-glow'
                              : 'hover:bg-white/50 text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold text-lg">{problem.title}</h3>
                              {isProblemCompleted && (
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                              )}
                            </div>
                            <span className="text-blue-600 font-bold text-sm">+{problem.points}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <CategoryIcon className="h-4 w-4" />
                              <span className="text-sm">{problem.category}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(problem.difficulty)} text-white font-medium`}>
                              {problem.difficulty}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Problem Details */}
              <Card className="glass-card border-white/40">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-poppins text-lg text-slate-900">Problem Details</CardTitle>
                    {isCompleted && (
                      <div className="flex items-center space-x-2 px-2 py-1 bg-emerald-100 rounded-full border border-emerald-200">
                        <CheckCircle className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-700 text-xs font-medium">Solved</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-white/40 border border-white/30">
                      <TabsTrigger value="description" className="text-slate-700 data-[state=active]:bg-gradient-primary data-[state=active]:text-white text-xs">Description</TabsTrigger>
                      <TabsTrigger value="examples" className="text-slate-700 data-[state=active]:bg-gradient-primary data-[state=active]:text-white text-xs">Examples</TabsTrigger>
                      <TabsTrigger value="hints" className="text-slate-700 data-[state=active]:bg-gradient-primary data-[state=active]:text-white text-xs">Hints</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-4">
                      <div className="space-y-4">
                        <p className="text-slate-700 leading-relaxed">{currentProblem.description}</p>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            Constraints:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                            {currentProblem.constraints.map((constraint, index) => (
                              <li key={index}>{constraint}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="examples" className="mt-4">
                      <div className="space-y-4">
                        {currentProblem.examples.map((example, index) => (
                          <div key={index} className="glass-card p-4 border-white/20">
                            <h4 className="font-semibold text-slate-900 mb-3">Example {index + 1}:</h4>
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium text-blue-600">Input: </span>
                                <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded text-slate-800">
                                  {example.input}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-purple-600">Output: </span>
                                <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded text-slate-800">
                                  {example.output}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-pink-600">Explanation: </span>
                                <span className="text-sm text-slate-600">{example.explanation}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="hints" className="mt-4">
                      <div className="space-y-3">
                        {currentProblem.hints.map((hint, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 glass-card border-white/20">
                            <span className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {index + 1}
                            </span>
                            <p className="text-slate-600 text-sm">{hint}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Code Editor and Output */}
            <div className="lg:col-span-3 space-y-6">
              {/* Enhanced Code Editor */}
              <Card className="glass-card border-white/40">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-poppins text-xl text-slate-900 flex items-center">
                      <Code className="mr-2 h-5 w-5 text-blue-600" />
                      Code Editor
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleGetHint}
                        className="glass-card text-slate-700 hover:bg-white/70 border-white/40 text-sm group"
                        size="sm"
                      >
                        <HelpCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        AI Debug Helper
                      </Button>
                      <Button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="premium-button text-white group"
                      >
                        <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        {isRunning ? 'Running...' : 'Run Code'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="code-editor rounded-xl p-6 font-mono">
                    <Textarea
                      value={code || currentProblem.template}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[400px] bg-transparent border-0 text-emerald-400 font-mono resize-none focus-visible:ring-0 text-sm leading-relaxed"
                      placeholder="Write your solution here..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Output and Test Results */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Enhanced Console Output */}
                <Card className="glass-card border-white/40">
                  <CardHeader>
                    <CardTitle className="font-poppins text-lg text-slate-900 flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-purple-600" />
                      Console Output
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="terminal-output rounded-lg p-4 font-mono text-sm min-h-[200px] max-h-[300px] overflow-y-auto">
                      <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                        {output || '👋 Welcome to AlgoFlow Practice!\n🚀 Click "Run Code" to test your solution\n💡 Use "AI Debug Helper" for intelligent assistance'}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Test Results */}
                <Card className="glass-card border-white/40">
                  <CardHeader>
                    <CardTitle className="font-poppins text-lg text-slate-900 flex items-center">
                      <Target className="mr-2 h-5 w-5 text-pink-600" />
                      Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {testResults.length > 0 ? (
                      <div className="space-y-3 max-h-[250px] overflow-y-auto">
                        {testResults.map((test, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-xl border-l-4 transition-all duration-300 ${
                              test.passed
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-red-500 bg-red-50'
                            }`}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              {test.passed ? (
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                              <span className="font-medium text-slate-900">
                                {test.input}
                              </span>
                            </div>
                            {!test.passed && (
                              <div className="text-sm space-y-1 ml-8">
                                <div className="text-red-600">Expected: <span className="font-mono bg-red-100 px-2 py-1 rounded">{test.expected}</span></div>
                                <div className="text-red-600">Got: <span className="font-mono bg-red-100 px-2 py-1 rounded">{test.actual}</span></div>
                              </div>
                            )}
                          </div>
                        ))}
                        <Button
                          onClick={handleSubmit}
                          className="w-full premium-button text-white font-semibold py-3 group"
                          disabled={!user}
                        >
                          {user ? (
                            <>
                              <CheckCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                              {isCompleted ? 'Completed ✓' : 'Submit Solution'}
                            </>
                          ) : (
                            'Login to Submit'
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-slate-500 text-center py-12">
                        <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Run your code to see test results</p>
                        <p className="text-sm mt-2">Your solution will be evaluated against multiple test cases</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
