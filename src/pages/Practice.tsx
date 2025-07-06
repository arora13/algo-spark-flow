
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import FloatingElements from '@/components/FloatingElements';
import { 
  Play, Code, ArrowLeft, CheckCircle, XCircle, Target, 
  Brain, Clock, HelpCircle, Trophy, Lightbulb 
} from 'lucide-react';

const Practice = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{passed: boolean, input: string, expected: string, actual: string}>>([]);

  const algorithms = [
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      description: 'Master divide-and-conquer with these challenging problems',
      problemCount: 3,
      difficulty: 'Medium'
    },
    {
      id: 'quick-sort', 
      name: 'Quick Sort',
      description: 'Practice partitioning and pivot selection strategies',
      problemCount: 3,
      difficulty: 'Medium'
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      description: 'Perfect your search skills with these curated challenges',
      problemCount: 3,
      difficulty: 'Easy'
    },
    {
      id: 'sorting-basics',
      name: 'Sorting Fundamentals',
      description: 'Build foundation with bubble, insertion, and selection sort',
      problemCount: 4,
      difficulty: 'Easy'
    }
  ];

  const problems = {
    'merge-sort': [
      {
        id: 'merge-intervals',
        title: 'Merge Intervals',
        difficulty: 'Medium',
        description: 'Given an array of intervals, merge all overlapping intervals and return an array of non-overlapping intervals.',
        detailedDescription: 'This problem tests your understanding of the merge process in merge sort. You\'ll need to sort intervals by start time, then merge overlapping ones - similar to how merge sort combines sorted subarrays.',
        examples: [
          {
            input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
            output: '[[1,6],[8,10],[15,18]]',
            explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].'
          }
        ],
        template: `function merge(intervals) {
    // Sort intervals by start time
    // Merge overlapping intervals
    // Return result
    
    return [];
}`
      },
      {
        id: 'sort-list',
        title: 'Sort Linked List',
        difficulty: 'Medium', 
        description: 'Sort a linked list using merge sort algorithm with O(n log n) time complexity and O(1) space complexity.',
        detailedDescription: 'Apply merge sort to a linked list! This challenges you to implement the divide-and-conquer approach without using extra space for arrays.',
        examples: [
          {
            input: 'head = [4,2,1,3]',
            output: '[1,2,3,4]',
            explanation: 'The linked list is sorted in ascending order.'
          }
        ],
        template: `function sortList(head) {
    // Implement merge sort for linked list
    // Use fast/slow pointers to find middle
    // Recursively sort left and right halves
    // Merge sorted halves
    
    return head;
}`
      },
      {
        id: 'count-inversions',
        title: 'Count Inversions',
        difficulty: 'Hard',
        description: 'Count the number of inversions in an array. An inversion is when a larger element appears before a smaller element.',
        detailedDescription: 'This problem demonstrates how merge sort can solve more than just sorting. During the merge process, you can count how many inversions exist.',
        examples: [
          {
            input: 'arr = [2,3,8,6,1]',
            output: '5',
            explanation: 'Inversions are: (2,1), (3,1), (8,6), (8,1), (6,1)'
          }
        ],
        template: `function countInversions(arr) {
    // Use merge sort approach
    // Count inversions during merge process
    // Return total count
    
    return 0;
}`
      }
    ],
    'binary-search': [
      {
        id: 'search-insert',
        title: 'Search Insert Position',
        difficulty: 'Easy',
        description: 'Given a sorted array and a target value, return the index where target should be inserted to maintain sorted order.',
        detailedDescription: 'This problem is a perfect introduction to binary search variations. Instead of just finding an element, you need to find the correct insertion position.',
        examples: [
          {
            input: 'nums = [1,3,5,6], target = 5',
            output: '2',
            explanation: 'Target 5 is found at index 2.'
          },
          {
            input: 'nums = [1,3,5,6], target = 2',
            output: '1', 
            explanation: 'Target 2 should be inserted at index 1.'
          }
        ],
        template: `function searchInsert(nums, target) {
    // Use binary search
    // Find exact position or insertion point
    
    return 0;
}`
      },
      {
        id: 'find-peak',
        title: 'Find Peak Element',
        difficulty: 'Medium',
        description: 'Find a peak element in an array. A peak element is greater than its neighbors. Array may contain multiple peaks.',
        detailedDescription: 'This problem shows how binary search can work on unsorted data when certain properties hold. The key insight is that you can always move toward the higher neighbor.',
        examples: [
          {
            input: 'nums = [1,2,3,1]',
            output: '2',
            explanation: 'Index 2 is a peak since nums[2] = 3 > nums[1] = 2 and nums[2] = 3 > nums[3] = 1.'
          }
        ],
        template: `function findPeakElement(nums) {
    // Use binary search approach
    // Compare middle with neighbors
    // Move toward higher neighbor
    
    return 0;
}`
      },
      {
        id: 'search-rotated',
        title: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        description: 'Search for a target in a rotated sorted array. The array was originally sorted, then rotated at some pivot.',
        detailedDescription: 'This advanced binary search problem tests your ability to identify which half of the array maintains sorted order, then decide which half to search.',
        examples: [
          {
            input: 'nums = [4,5,6,7,0,1,2], target = 0',
            output: '4',
            explanation: 'Target 0 is found at index 4.'
          }
        ],
        template: `function search(nums, target) {
    // Modified binary search
    // Identify which half is sorted
    // Check if target is in sorted half
    
    return -1;
}`
      }
    ]
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('🚀 Running your solution...\n⚡ Executing test cases...\n📊 Analyzing results...');
    
    setTimeout(() => {
      const mockResults = [
        { passed: true, input: 'Test case 1', expected: '[1,2,3,4]', actual: '[1,2,3,4]' },
        { passed: true, input: 'Test case 2', expected: '[0,1,2]', actual: '[0,1,2]' },
        { passed: Math.random() > 0.3, input: 'Test case 3', expected: '[5,6,7]', actual: '[6,5,7]' }
      ];
      
      setTestResults(mockResults);
      const passedCount = mockResults.filter(r => r.passed).length;
      setOutput(`✅ Execution completed!\n📊 Results: ${passedCount}/${mockResults.length} test cases passed\n${passedCount === mockResults.length ? '🎉 Perfect! All tests passed!' : '🔍 Some tests failed. Check the results below.'}`);
      setIsRunning(false);
    }, 2500);
  };

  if (!selectedAlgorithm) {
    // Algorithm Selection View
    return (
      <div className="min-h-screen relative">
        <FloatingElements />
        
        <div className="relative z-10 pt-24 pb-16">
          <div className="container-width">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-dm-sans">
                Hands-On <span className="bg-gradient-primary bg-clip-text text-transparent">Algorithm Practice</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Apply your algorithm knowledge with carefully crafted coding challenges. 
                Each problem is designed to reinforce key concepts and build problem-solving skills.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {algorithms.map((algorithm) => (
                <Card 
                  key={algorithm.id}
                  className="gradient-card hover-lift cursor-pointer border-0 shadow-xl"
                  onClick={() => setSelectedAlgorithm(algorithm.id)}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <Code className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant={algorithm.difficulty === 'Easy' ? 'secondary' : 'outline'}>
                        {algorithm.difficulty}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{algorithm.name}</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">{algorithm.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        {algorithm.problemCount} problems
                      </span>
                      <div className="flex items-center text-primary">
                        <span className="text-sm font-medium mr-2">Start Practice</span>
                        <Play className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedProblem) {
    // Problem Selection View
    const algorithmProblems = problems[selectedAlgorithm as keyof typeof problems] || [];
    const currentAlgorithm = algorithms.find(a => a.id === selectedAlgorithm);
    
    return (
      <div className="min-h-screen relative">
        <FloatingElements />
        
        <div className="relative z-10 pt-24 pb-16">
          <div className="container-width">
            <div className="mb-8">
              <Button 
                onClick={() => setSelectedAlgorithm(null)}
                className="btn-secondary mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Algorithms
              </Button>
              
              <h1 className="text-4xl font-bold text-slate-900 mb-4 font-dm-sans">
                {currentAlgorithm?.name} <span className="bg-gradient-primary bg-clip-text text-transparent">Practice</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {currentAlgorithm?.description}
              </p>
            </div>

            <div className="grid gap-6">
              {algorithmProblems.map((problem, index) => (
                <Card 
                  key={problem.id}
                  className="gradient-card hover-lift cursor-pointer border-0 shadow-xl"
                  onClick={() => setSelectedProblem(problem.id)}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{problem.title}</h3>
                          <p className="text-slate-600 mt-1">{problem.detailedDescription}</p>
                        </div>
                      </div>
                      <Badge variant={problem.difficulty === 'Easy' ? 'secondary' : problem.difficulty === 'Medium' ? 'outline' : 'destructive'}>
                        {problem.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-700 mb-4 leading-relaxed">{problem.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {problem.examples.slice(0, 2).map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-primary/30 rounded-full" />
                        ))}
                        <span className="text-sm text-slate-500 ml-2">
                          {problem.examples.length} example{problem.examples.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="flex items-center text-primary">
                        <span className="text-sm font-medium mr-2">Solve Problem</span>
                        <Target className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Problem Solving View
  const algorithmProblems = problems[selectedAlgorithm as keyof typeof problems] || [];
  const currentProblem = algorithmProblems.find(p => p.id === selectedProblem);
  const currentAlgorithm = algorithms.find(a => a.id === selectedAlgorithm);

  if (!currentProblem) return null;

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="container-width">
          <div className="mb-6">
            <Button 
              onClick={() => setSelectedProblem(null)}
              className="btn-secondary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {currentAlgorithm?.name} Problems
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Problem Description */}
            <div className="space-y-6">
              <Card className="glass-panel border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-dm-sans text-2xl text-slate-900">
                      {currentProblem.title}
                    </CardTitle>
                    <Badge variant={currentProblem.difficulty === 'Easy' ? 'secondary' : currentProblem.difficulty === 'Medium' ? 'outline' : 'destructive'}>
                      {currentProblem.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed mb-6">
                      {currentProblem.description}
                    </p>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                      <p className="text-slate-700 text-sm leading-relaxed">
                        <strong className="text-blue-700">Algorithm Connection:</strong> {currentProblem.detailedDescription}
                      </p>
                    </div>

                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                      <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                      Examples
                    </h4>
                    
                    {currentProblem.examples.map((example, index) => (
                      <div key={index} className="glass-panel p-4 rounded-xl mb-4">
                        <div className="space-y-3">
                          <div className="bg-slate-100 p-3 rounded-lg">
                            <span className="font-medium text-slate-700">Input: </span>
                            <code className="text-sm bg-white px-2 py-1 rounded">
                              {example.input}
                            </code>
                          </div>
                          <div className="bg-green-100 p-3 rounded-lg">
                            <span className="font-medium text-green-700">Output: </span>
                            <code className="text-sm bg-white px-2 py-1 rounded">
                              {example.output}
                            </code>
                          </div>
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <span className="font-medium text-blue-700">Explanation: </span>
                            <span className="text-sm text-slate-700">{example.explanation}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Code Editor and Results */}
            <div className="space-y-6">
              {/* Code Editor */}
              <Card className="glass-panel border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-dm-sans text-xl text-slate-900 flex items-center">
                      <Code className="mr-3 h-5 w-5 text-primary" />
                      Code Editor
                    </CardTitle>
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => setOutput('💡 Hint: Think about the key properties of ' + currentAlgorithm?.name.toLowerCase() + ' and how they apply to this problem!')}
                        className="btn-secondary"
                        size="sm"
                      >
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Hint
                      </Button>
                      <Button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="btn-primary"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {isRunning ? 'Running...' : 'Run Code'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="code-editor rounded-xl p-4">
                    <Textarea
                      value={code || currentProblem.template}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[400px] bg-transparent border-0 text-emerald-400 font-mono resize-none focus-visible:ring-0"
                      placeholder="Write your solution here..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Output and Test Results */}
              <div className="grid gap-6">
                {/* Console Output */}
                <Card className="glass-panel border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="font-dm-sans text-lg text-slate-900 flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-purple-600" />
                      Console Output
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-950 rounded-xl p-4 font-mono text-sm min-h-[150px]">
                      <pre className="text-emerald-400 whitespace-pre-wrap">
                        {output || '👋 Welcome to AlgoFlow Practice!\n\n🚀 Write your solution and click "Run Code"\n💡 Use "Hint" if you need guidance\n\n✨ Happy coding!'}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Test Results */}
                {testResults.length > 0 && (
                  <Card className="glass-panel border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="font-dm-sans text-lg text-slate-900 flex items-center">
                        <Trophy className="mr-2 h-5 w-5 text-amber-600" />
                        Test Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {testResults.map((test, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-xl border-l-4 ${
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
                                <div className="text-red-600">
                                  Expected: <code className="bg-white px-2 py-1 rounded">{test.expected}</code>
                                </div>
                                <div className="text-red-600">
                                  Got: <code className="bg-white px-2 py-1 rounded">{test.actual}</code>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        <Button
                          className="w-full btn-primary text-lg py-4"
                          disabled={!testResults.every(test => test.passed)}
                        >
                          <Trophy className="mr-2 h-5 w-5" />
                          {testResults.every(test => test.passed) ? 'Submit Solution' : 'Fix Issues to Submit'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
