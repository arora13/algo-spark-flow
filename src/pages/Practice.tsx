
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, HelpCircle, CheckCircle, XCircle, Code, Brain, Target, Zap, 
  Clock, ArrowLeft, Lightbulb, Trophy, BookOpen 
} from 'lucide-react';
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
      category: 'Array & Hash Map',
      points: 100,
      description: 'Given an array of integers nums and an integer target, return the indices of two numbers that add up to the target. This is one of the most fundamental problems in computer science and forms the foundation for understanding hash map optimization techniques.',
      detailedExplanation: 'The Two Sum problem teaches you the critical concept of trading space for time complexity. While a brute force approach checking every pair takes O(n²) time, using a hash map allows us to solve it in O(n) time with O(n) space.',
      examples: [
        { 
          input: 'nums = [2,7,11,15], target = 9', 
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1]. The hash map stores each number as we iterate, allowing us to instantly check if the complement exists.'
        },
        { 
          input: 'nums = [3,2,4], target = 6', 
          output: '[1,2]',
          explanation: 'We find that 3 + 3 = 6, but we can\'t use the same element twice. Instead, we use indices 1 and 2 where nums[1] + nums[2] = 2 + 4 = 6.'
        },
        { 
          input: 'nums = [3,3], target = 6', 
          output: '[0,1]',
          explanation: 'Here we have two different elements with the same value, so we can use both indices 0 and 1.'
        }
      ],
      constraints: [
        '2 ≤ nums.length ≤ 10⁴',
        '-10⁹ ≤ nums[i] ≤ 10⁹',
        '-10⁹ ≤ target ≤ 10⁹',
        'Only one valid answer exists for each test case'
      ],
      hints: [
        'Think about what information you need to store as you iterate through the array.',
        'For each number, ask yourself: "What number would I need to pair with this to reach the target?"',
        'Hash maps (objects in JavaScript) allow O(1) average lookup time - perfect for checking if a complement exists.',
        'Remember to check if the complement exists BEFORE adding the current number to your hash map to avoid using the same element twice.'
      ],
      template: `function twoSum(nums, target) {
    // Your solution here
    // Hint: Consider using a Map or object to store values and their indices
    // as you iterate through the array
    
    
    return []; // Return array of two indices
}`,
      relatedConcepts: ['Hash Maps', 'Array Traversal', 'Space-Time Tradeoffs']
    },
    {
      id: 'reverse-string',
      title: 'Reverse String',
      difficulty: 'Easy',
      category: 'Two Pointers',
      points: 75,
      description: 'Write a function that reverses a string in-place. The input string is given as an array of characters. You must modify the input array in-place with O(1) extra memory, demonstrating the two-pointer technique.',
      detailedExplanation: 'This problem introduces the two-pointer technique, one of the most elegant patterns in algorithm design. By using pointers at opposite ends that move toward each other, we can solve problems efficiently without extra space.',
      examples: [
        { 
          input: 's = ["h","e","l","l","o"]', 
          output: '["o","l","l","e","h"]',
          explanation: 'We place one pointer at the start (h) and one at the end (o), swap them, then move inward until the pointers meet.'
        },
        { 
          input: 's = ["H","a","n","n","a","h"]', 
          output: '["h","a","n","n","a","H"]',
          explanation: 'The two-pointer approach works regardless of string length. Each swap operation exchanges characters at symmetric positions.'
        }
      ],
      constraints: [
        '1 ≤ s.length ≤ 10⁵',
        's[i] is a printable ASCII character'
      ],
      hints: [
        'Initialize two pointers: one at the beginning (left) and one at the end (right) of the array.',
        'While left < right, swap the characters at these positions.',
        'After each swap, move left pointer forward and right pointer backward.',
        'The algorithm terminates when the pointers meet or cross each other.'
      ],
      template: `function reverseString(s) {
    // Modify s in-place and return it
    // Hint: Use two pointers from start and end, moving toward center
    
    
    return s;
}`,
      relatedConcepts: ['Two Pointers', 'In-Place Algorithms', 'String Manipulation']
    },
    {
      id: 'binary-search-impl',
      title: 'Binary Search Implementation',
      difficulty: 'Medium',
      category: 'Binary Search',
      points: 150,
      description: 'Given a sorted array of integers and a target value, implement binary search to find the target\'s index. Return -1 if not found. You must achieve O(log n) runtime complexity, demonstrating the power of divide-and-conquer.',
      detailedExplanation: 'Binary search is a cornerstone algorithm that demonstrates the divide-and-conquer paradigm. By eliminating half of the search space in each iteration, we achieve logarithmic time complexity - a massive improvement over linear search.',
      examples: [
        { 
          input: 'nums = [-1,0,3,5,9,12], target = 9', 
          output: '4',
          explanation: 'We start with the middle element (3), realize 9 > 3, so we search the right half. Next middle is 9 - found at index 4!'
        },
        { 
          input: 'nums = [-1,0,3,5,9,12], target = 2', 
          output: '-1',
          explanation: 'We systematically eliminate half the array each time. After checking all possibilities, 2 is not found, so we return -1.'
        }
      ],
      constraints: [
        '1 ≤ nums.length ≤ 10⁴',
        '-10⁴ < nums[i], target < 10⁴',
        'All integers in nums are unique',
        'nums is sorted in ascending order'
      ],
      hints: [
        'Initialize left = 0 and right = nums.length - 1 to define your search boundaries.',
        'While left ≤ right, calculate the middle index: mid = Math.floor((left + right) / 2).',
        'Compare nums[mid] with target to decide which half to search next.',
        'If nums[mid] < target, the target must be in the right half, so set left = mid + 1.',
        'If nums[mid] > target, the target must be in the left half, so set right = mid - 1.'
      ],
      template: `function search(nums, target) {
    // Implement binary search with O(log n) complexity
    // Return index if found, -1 if not found
    
    
    return -1;
}`,
      relatedConcepts: ['Divide and Conquer', 'Logarithmic Time', 'Sorted Arrays']
    },
    {
      id: 'valid-parentheses',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      category: 'Stack',
      points: 100,
      description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. This problem demonstrates the stack data structure and its real-world applications.',
      detailedExplanation: 'The stack\'s Last-In-First-Out (LIFO) property makes it perfect for tracking nested structures. This pattern appears everywhere: from compiler design to web development (HTML tag matching) to mathematical expression evaluation.',
      examples: [
        { 
          input: 's = "()"', 
          output: 'true',
          explanation: 'A simple pair of matching parentheses. The opening \'(\' goes on the stack, and the closing \')\' matches and removes it.'
        },
        { 
          input: 's = "()[]{}"', 
          output: 'true',
          explanation: 'Multiple types of brackets, but each opening bracket is properly closed by its corresponding closing bracket in the correct order.'
        },
        { 
          input: 's = "(]"', 
          output: 'false',
          explanation: 'The opening \'(\' expects a closing \')\', but we encounter \']\' instead. This violates the matching rule.'
        }
      ],
      constraints: [
        '1 ≤ s.length ≤ 10⁴',
        's consists of parentheses only \'()[]{}\''
      ],
      hints: [
        'Use a stack (array) to keep track of opening brackets as you encounter them.',
        'When you see an opening bracket (\'(\', \'[\', \'{\'), push it onto the stack.',
        'When you see a closing bracket, check if it matches the most recent opening bracket.',
        'If the stack is empty when you encounter a closing bracket, the string is invalid.',
        'At the end, the stack should be empty for the string to be valid.'
      ],
      template: `function isValid(s) {
    // Use a stack to track opening brackets
    // Return true if all brackets are properly matched and nested
    
    
    return false;
}`,
      relatedConcepts: ['Stack Data Structure', 'LIFO Principle', 'Pattern Matching']
    }
  ];

  const currentProblem = problems.find(p => p.id === selectedProblem) || problems[0];
  const isCompleted = user?.progress.solvedProblems.includes(selectedProblem);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('🚀 Executing your solution...\n⚡ Running comprehensive test cases...\n📊 Analyzing performance...');
    
    setTimeout(() => {
      const mockResults = [
        { passed: true, input: 'Test case 1', expected: '[0,1]', actual: '[0,1]' },
        { passed: true, input: 'Test case 2', expected: '[1,2]', actual: '[1,2]' },
        { passed: Math.random() > 0.3, input: 'Test case 3', expected: '[2,3]', actual: '[1,3]' }
      ];
      
      setTestResults(mockResults);
      const passedCount = mockResults.filter(r => r.passed).length;
      setOutput(`✅ Execution completed!\n📊 Results: ${passedCount}/${mockResults.length} test cases passed\n${passedCount === mockResults.length ? '🎉 Perfect! All tests passed. Your solution is working correctly!' : '🔍 Some tests failed. Review the specific cases below and refine your approach.'}\n\n💡 Pro tip: Consider the time and space complexity of your solution.`);
      setIsRunning(false);
    }, 2500);
  };

  const handleGetHint = () => {
    const hint = currentProblem.hints[Math.floor(Math.random() * currentProblem.hints.length)];
    setOutput(`💡 AI Debug Assistant: ${hint}\n\n🎯 Implementation tip: ${currentProblem.relatedConcepts.join(', ')}\n\n🚀 Try implementing this approach and run your code to see the results!`);
  };

  const handleSubmit = () => {
    if (testResults.length > 0 && testResults.every(test => test.passed)) {
      updateProgress('problem', selectedProblem);
      setOutput('🎉 Outstanding work! All test cases passed!\n⭐ Problem marked as solved in your progress.\n🏆 You\'re building strong algorithmic thinking skills!\n\n🎯 Ready for your next challenge?');
    } else {
      setOutput('❌ Some test cases didn\'t pass yet. Don\'t worry - debugging is part of learning!\n🔍 Check the test results panel for specific details about what went wrong.\n💪 You\'re on the right track. Keep refining your solution!\n\n💡 Tip: Try working through the examples step by step.');
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
      case 'Array & Hash Map': return Target;
      case 'Two Pointers': return Code;
      case 'Binary Search': return Brain;
      case 'Stack': return Zap;
      default: return Code;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30 relative overflow-hidden">
      {/* Enhanced floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape w-96 h-96 bg-gradient-to-br from-purple-200/20 to-blue-200/15 -top-48 -right-48 blur-3xl" style={{ animationDelay: '0s' }} />
        <div className="floating-shape w-80 h-80 bg-gradient-to-br from-blue-200/15 to-indigo-200/20 top-1/4 -left-40 blur-2xl" style={{ animationDelay: '2s' }} />
        <div className="floating-shape w-64 h-64 bg-gradient-to-br from-pink-200/15 to-purple-200/10 bottom-1/4 right-1/4 blur-2xl" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative z-10 section-padding">
        <div className="content-width">
          {/* Enhanced header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center space-x-3 mb-6 glass-card-soft px-6 py-3">
              <Trophy className="h-6 w-6 text-amber-500" />
              <span className="text-slate-600 font-medium">Practice Arena</span>
            </div>
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl text-slate-900 mb-6">
              Master Algorithms Through <span className="gradient-text">Hands-On Practice</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Solve curated coding challenges with AI-powered assistance and detailed explanations designed for AP CS success
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Enhanced Problem Selection Sidebar - moved further left */}
            <div className="lg:col-span-4">
              <Card className="glass-card border-white/50 mb-6 hover-lift">
                <CardHeader className="pb-4">
                  <CardTitle className="font-poppins text-xl text-slate-900 flex items-center">
                    <BookOpen className="mr-3 h-6 w-6 text-blue-600" />
                    Practice Problems
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-2">Select a problem to start coding</p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-3 p-6">
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
                          className={`w-full text-left p-5 rounded-xl transition-all duration-500 group hover-lift ${
                            isSelected
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white soft-glow scale-105'
                              : 'glass-card-soft text-slate-700 hover:bg-white/80 hover:shadow-lg'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <CategoryIcon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                              <h3 className="font-semibold text-lg">{problem.title}</h3>
                              {isProblemCompleted && (
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                              )}
                            </div>
                            <div className={`text-sm font-bold px-3 py-1 rounded-full ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                            }`}>
                              +{problem.points}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${
                              isSelected ? 'text-white/90' : 'text-slate-600'
                            }`}>
                              {problem.category}
                            </span>
                            <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(problem.difficulty)} text-white font-medium shadow-sm`}>
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
              <Card className="glass-card border-white/50 hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-poppins text-lg text-slate-900 flex items-center">
                      <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
                      Problem Details
                    </CardTitle>
                    {isCompleted && (
                      <div className="flex items-center space-x-2 px-3 py-2 bg-emerald-100 rounded-full border border-emerald-200">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-emerald-700 text-sm font-medium">Solved</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 glass-card-soft border border-white/40">
                      <TabsTrigger value="description" className="text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-sm font-medium">Overview</TabsTrigger>
                      <TabsTrigger value="examples" className="text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-sm font-medium">Examples</TabsTrigger>
                      <TabsTrigger value="hints" className="text-slate-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-sm font-medium">Hints</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3 text-lg">Problem Description</h4>
                          <p className="text-slate-700 leading-relaxed mb-4">{currentProblem.description}</p>
                          <div className="glass-card-soft p-4 border border-blue-100">
                            <p className="text-slate-600 text-sm leading-relaxed">{currentProblem.detailedExplanation}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-blue-600" />
                            Constraints & Requirements:
                          </h4>
                          <ul className="space-y-2">
                            {currentProblem.constraints.map((constraint, index) => (
                              <li key={index} className="text-sm text-slate-600 flex items-start">
                                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {constraint}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="glass-card-soft p-4 border border-purple-100">
                          <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                            <Brain className="mr-2 h-4 w-4 text-purple-600" />
                            Key Concepts:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {currentProblem.relatedConcepts.map((concept, index) => (
                              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="examples" className="mt-6">
                      <div className="space-y-6">
                        {currentProblem.examples.map((example, index) => (
                          <div key={index} className="glass-card-soft p-5 border border-blue-100 hover-lift">
                            <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                              <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                                {index + 1}
                              </span>
                              Example {index + 1}
                            </h4>
                            <div className="space-y-3">
                              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                <span className="font-medium text-blue-700">Input: </span>
                                <code className="text-sm bg-white px-2 py-1 rounded text-slate-800 border">
                                  {example.input}
                                </code>
                              </div>
                              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                <span className="font-medium text-green-700">Output: </span>
                                <code className="text-sm bg-white px-2 py-1 rounded text-slate-800 border">
                                  {example.output}
                                </code>
                              </div>
                              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                                <span className="font-medium text-amber-700">Explanation: </span>
                                <span className="text-sm text-slate-700">{example.explanation}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="hints" className="mt-6">
                      <div className="space-y-4">
                        {currentProblem.hints.map((hint, index) => (
                          <div key={index} className="flex items-start space-x-4 p-4 glass-card-soft border border-green-100 hover-lift">
                            <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                              {index + 1}
                            </span>
                            <p className="text-slate-700 text-sm leading-relaxed">{hint}</p>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Code Editor and Output - more space */}
            <div className="lg:col-span-8 space-y-6">
              {/* Enhanced Code Editor */}
              <Card className="glass-card border-white/50 hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-poppins text-xl text-slate-900 flex items-center">
                      <Code className="mr-3 h-6 w-6 text-blue-600" />
                      Code Editor
                      <span className="ml-3 text-sm font-normal text-slate-500">JavaScript</span>
                    </CardTitle>
                    <div className="flex space-x-3">
                      <Button
                        onClick={handleGetHint}
                        className="glass-card-soft text-slate-700 hover:bg-white/80 border-white/50 text-sm group hover-lift"
                        size="sm"
                      >
                        <HelpCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        AI Debug Assistant
                      </Button>
                      <Button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="premium-button text-white group"
                      >
                        <Play className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        {isRunning ? 'Running...' : 'Run & Test'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="code-editor rounded-xl p-6 font-mono">
                    <Textarea
                      value={code || currentProblem.template}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[500px] bg-transparent border-0 text-emerald-400 font-mono resize-none focus-visible:ring-0 text-sm leading-relaxed"
                      placeholder="Write your solution here..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Output and Test Results */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Enhanced Console Output */}
                <Card className="glass-card border-white/50 hover-lift">
                  <CardHeader>
                    <CardTitle className="font-poppins text-lg text-slate-900 flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-purple-600" />
                      Console Output
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="terminal-output rounded-lg p-5 font-mono text-sm min-h-[300px] max-h-[400px] overflow-y-auto">
                      <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                        {output || '👋 Welcome to AlgoFlow Practice!\n\n🚀 Click "Run & Test" to execute your solution\n💡 Use "AI Debug Assistant" for smart hints\n📚 Review the problem details for guidance\n\n✨ Happy coding!'}
                      </pre>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Test Results */}
                <Card className="glass-card border-white/50 hover-lift">
                  <CardHeader>
                    <CardTitle className="font-poppins text-lg text-slate-900 flex items-center">
                      <Target className="mr-2 h-5 w-5 text-pink-600" />
                      Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {testResults.length > 0 ? (
                      <div className="space-y-4 max-h-[300px] overflow-y-auto">
                        {testResults.map((test, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-xl border-l-4 transition-all duration-500 hover-lift ${
                              test.passed
                                ? 'border-emerald-500 bg-emerald-50/80 glass-card-soft'
                                : 'border-red-500 bg-red-50/80 glass-card-soft'
                            }`}
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              {test.passed ? (
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                              <span className="font-medium text-slate-900">
                                {test.input}
                              </span>
                              {test.passed && (
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                                  PASSED
                                </span>
                              )}
                            </div>
                            {!test.passed && (
                              <div className="text-sm space-y-2 ml-8">
                                <div className="text-red-600">
                                  Expected: <code className="bg-red-100 px-2 py-1 rounded border">{test.expected}</code>
                                </div>
                                <div className="text-red-600">
                                  Got: <code className="bg-red-100 px-2 py-1 rounded border">{test.actual}</code>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        <Button
                          onClick={handleSubmit}
                          className="w-full premium-button text-white font-semibold py-4 group text-lg"
                          disabled={!user}
                        >
                          {user ? (
                            <>
                              <CheckCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                              {isCompleted ? 'Completed ✓' : 'Submit Solution'}
                            </>
                          ) : (
                            'Login to Submit & Track Progress'
                          )}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-slate-500 text-center py-16">
                        <Brain className="h-16 w-16 mx-auto mb-6 opacity-40" />
                        <h3 className="font-semibold text-lg mb-2">Ready to Test?</h3>
                        <p className="mb-2">Run your code to see comprehensive test results</p>
                        <p className="text-sm">Your solution will be evaluated for correctness and efficiency</p>
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
