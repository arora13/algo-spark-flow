
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, HelpCircle, CheckCircle, XCircle } from 'lucide-react';
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
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      examples: [
        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
        { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
      ],
      constraints: [
        '2 ≤ nums.length ≤ 10⁴',
        '-10⁹ ≤ nums[i] ≤ 10⁹',
        '-10⁹ ≤ target ≤ 10⁹'
      ],
      template: `function twoSum(nums, target) {
    // Your code here
    
}`
    },
    {
      id: 'reverse-string',
      title: 'Reverse String',
      difficulty: 'Easy',
      description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
      examples: [
        { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
        { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' }
      ],
      constraints: [
        '1 ≤ s.length ≤ 10⁵',
        's[i] is a printable ascii character'
      ],
      template: `function reverseString(s) {
    // Your code here
    
}`
    },
    {
      id: 'binary-search-impl',
      title: 'Binary Search Implementation',
      difficulty: 'Medium',
      description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.',
      examples: [
        { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
        { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' }
      ],
      constraints: [
        '1 ≤ nums.length ≤ 10⁴',
        '-10⁴ < nums[i], target < 10⁴',
        'All integers in nums are unique'
      ],
      template: `function search(nums, target) {
    // Your code here
    
}`
    }
  ];

  const currentProblem = problems.find(p => p.id === selectedProblem) || problems[0];

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    // Simulate code execution
    setTimeout(() => {
      const mockResults = [
        { passed: true, input: 'Test case 1', expected: '[0,1]', actual: '[0,1]' },
        { passed: true, input: 'Test case 2', expected: '[1,2]', actual: '[1,2]' },
        { passed: false, input: 'Test case 3', expected: '[2,3]', actual: '[1,3]' }
      ];
      
      setTestResults(mockResults);
      setOutput('Code executed successfully!\nCheck test results below.');
      setIsRunning(false);
    }, 2000);
  };

  const handleGetHint = () => {
    const hints = {
      'two-sum': 'Try using a hash map to store numbers you\'ve seen and their indices. For each number, check if (target - current number) exists in the hash map.',
      'reverse-string': 'You can use two pointers approach - one at the beginning and one at the end, swapping characters as you move them towards each other.',
      'binary-search-impl': 'Remember the key steps: find the middle, compare with target, then eliminate half of the search space.'
    };
    
    setOutput(`💡 Hint: ${hints[selectedProblem as keyof typeof hints] || 'Think about the algorithm step by step!'}`);
  };

  const handleSubmit = () => {
    if (testResults.length > 0 && testResults.every(test => test.passed)) {
      updateProgress('problem', selectedProblem);
      setOutput('🎉 Congratulations! All test cases passed. Problem marked as solved!');
    } else {
      setOutput('❌ Some test cases failed. Please review your solution and try again.');
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
            Coding Practice
          </h1>
          <p className="text-xl text-gray-600">
            Solve problems in our terminal-style editor with AI-powered assistance.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Problem Selection Sidebar */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-poppins text-lg">Problems</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {problems.map((problem) => (
                    <button
                      key={problem.id}
                      onClick={() => {
                        setSelectedProblem(problem.id);
                        setCode(problem.template);
                        setOutput('');
                        setTestResults([]);
                      }}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                        selectedProblem === problem.id
                          ? 'bg-gradient-primary text-white'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{problem.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        } ${selectedProblem === problem.id ? 'bg-white/20 text-white' : ''}`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        selectedProblem === problem.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {problem.description.substring(0, 80)}...
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Problem Details */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="font-poppins text-lg">Problem Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-4">
                    <div className="space-y-4">
                      <p className="text-gray-700">{currentProblem.description}</p>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Constraints:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
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
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Example {index + 1}:</h4>
                          <div className="space-y-2">
                            <div>
                              <span className="font-medium text-gray-700">Input: </span>
                              <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                                {example.input}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Output: </span>
                              <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                                {example.output}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor and Output */}
          <div className="lg:col-span-3 space-y-6">
            {/* Code Editor */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-poppins text-xl">Code Editor</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleGetHint}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <HelpCircle className="h-4 w-4" />
                      Help Me Debug
                    </Button>
                    <Button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="bg-gradient-primary hover:opacity-90 text-white flex items-center space-x-2"
                    >
                      <Play className="h-4 w-4" />
                      {isRunning ? 'Running...' : 'Run Code'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-4 font-mono">
                  <Textarea
                    value={code || currentProblem.template}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-[300px] bg-transparent border-0 text-green-400 font-mono resize-none focus-visible:ring-0"
                    placeholder="Write your solution here..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Output and Test Results */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Console Output */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-poppins text-lg">Console Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm min-h-[150px]">
                    <pre className="text-green-400 whitespace-pre-wrap">
                      {output || 'Click "Run Code" to see output...'}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Test Results */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-poppins text-lg">Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  {testResults.length > 0 ? (
                    <div className="space-y-3">
                      {testResults.map((test, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border-l-4 ${
                            test.passed
                              ? 'border-green-500 bg-green-50'
                              : 'border-red-500 bg-red-50'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            {test.passed ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )}
                            <span className="font-medium">
                              {test.input}
                            </span>
                          </div>
                          {!test.passed && (
                            <div className="text-sm space-y-1">
                              <div>Expected: <span className="font-mono">{test.expected}</span></div>
                              <div>Got: <span className="font-mono">{test.actual}</span></div>
                            </div>
                          )}
                        </div>
                      ))}
                      <Button
                        onClick={handleSubmit}
                        className="w-full bg-gradient-primary hover:opacity-90 text-white"
                        disabled={!user}
                      >
                        {user ? 'Submit Solution' : 'Login to Submit'}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-center py-8">
                      Run your code to see test results
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
