import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import FloatingElements from '@/components/FloatingElements';
import { 
  Play, Code, ArrowLeft, CheckCircle, XCircle, Target, 
  Brain, HelpCircle, Trophy, Lightbulb, ChevronRight
} from 'lucide-react';
import { problemSpecs } from '@/lib/tests';

const Practice = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{passed: boolean, input: string, expected: string, actual: string}>>([]);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const w = new Worker(new URL('../workers/codeRunner.ts', import.meta.url), { type: 'module' });
    workerRef.current = w;
    w.onmessage = (e: MessageEvent) => {
      if (e.data?.error) {
        setOutput(sanitize(`Error: ${e.data.error}`));
        setTestResults([]);
        setIsRunning(false);
        return;
      }
      const results = (e.data?.results || []).map((r: any) => ({
        passed: !!r.passed,
        input: String(r.input),
        expected: String(r.expected),
        actual: String(r.actual),
      }));
      const passedCount = results.filter((r: any) => r.passed).length;
      setTestResults(results);
      setOutput(sanitize(`Execution completed!\nResults: ${passedCount}/${results.length} test cases passed`));
      setIsRunning(false);
    };
    return () => { w.terminate(); workerRef.current = null; };
  }, []);

  const sanitize = (s: string) =>
    s
      .replace(/([\u2190-\u21FF]|\p{Extended_Pictographic})/gu, '') // strip arrows and emoji
      .replace(/\s{2,}/g, ' ')
      .trim();

  const algorithms = [
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      description: 'Master divide and conquer with these challenging problems',
      problemCount: 3,
      difficulty: 'Medium',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 'quick-sort', 
      name: 'Quick Sort',
      description: 'Practice partitioning and pivot selection strategies',
      problemCount: 3,
      difficulty: 'Medium',
      color: 'from-purple-400 to-pink-400'
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      description: 'Perfect your search skills with these curated challenges',
      problemCount: 3,
      difficulty: 'Easy',
      color: 'from-green-400 to-emerald-400'
    },
    {
      id: 'sorting-basics',
      name: 'Sorting Fundamentals',
      description: 'Build foundation with bubble, insertion, and selection sort',
      problemCount: 4,
      difficulty: 'Easy',
      color: 'from-amber-400 to-orange-400'
    }
  ];

  const problems = {
    'merge-sort': [
      {
        id: 'merge-intervals',
        title: 'Merge Intervals',
        difficulty: 'Medium',
        description: 'Given an array of intervals, merge all overlapping intervals and return an array of non-overlapping intervals.',
        detailedDescription: 'This problem tests your understanding of the merge process in merge sort. You need to sort intervals by start time, then merge overlapping ones, similar to how merge sort combines sorted subarrays.',
        keyPoints: ['Sorting by start time', 'Merging overlapping intervals', 'Array manipulation'],
        hints: [
          'Sort the intervals by their start times first',
          'Use a result array to store merged intervals',
          'Compare the end of the last merged interval with the start of the current interval'
        ],
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
        description: 'Sort a linked list using merge sort with O(n log n) time and O(1) extra space.',
        detailedDescription: 'Apply merge sort to a linked list. Implement the divide and conquer approach without using extra arrays.',
        keyPoints: ['Linked list manipulation', 'Divide and conquer', 'Space optimization'],
        hints: [
          'Use fast and slow pointers to find the middle',
          'Recursively sort the left and right halves',
          'Merge the two sorted halves together'
        ],
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
        detailedDescription: 'Use merge sort to count inversions during the merge step.',
        keyPoints: ['Inversion counting', 'Modified merge sort', 'Divide and conquer'],
        hints: [
          'Use the merge sort framework and count during merging',
          'When taking from the right array, count inversions',
          'The added inversions equal the number of elements remaining in the left array'
        ],
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
    'quick-sort': [
      {
        id: 'kth-largest',
        title: 'Kth Largest Element',
        difficulty: 'Medium',
        description: 'Find the kth largest element in an unsorted array using quickselect.',
        detailedDescription: 'Use partitioning from quicksort to find kth largest in average O(n) time.',
        keyPoints: ['Quickselect algorithm', 'Partitioning', 'Average O(n) time'],
        hints: [
          'Use the partition function from quicksort',
          'After partitioning, check which side contains the kth largest',
          'Recurse only on the relevant partition'
        ],
        examples: [
          {
            input: 'nums = [3,2,1,5,6,4], k = 2',
            output: '5',
            explanation: 'The second largest element is 5.'
          }
        ],
        template: `function findKthLargest(nums, k) {
  // Use quickselect algorithm
  // Partition and recursively search
  
  return 0;
}`
      },
      {
        id: 'sort-colors',
        title: 'Sort Colors (Dutch Flag)',
        difficulty: 'Medium',
        description: 'Sort an array with only 0s, 1s, and 2s in place using the Dutch National Flag algorithm.',
        detailedDescription: 'Use three way partitioning to group equal keys efficiently.',
        keyPoints: ['Three way partitioning', 'In place sorting', 'Single pass algorithm'],
        hints: [
          'Use three pointers: low, mid, and high',
          'Move 0s to the beginning and 2s to the end',
          'Process elements at the mid pointer'
        ],
        examples: [
          {
            input: 'nums = [2,0,2,1,1,0]',
            output: '[0,0,1,1,2,2]',
            explanation: 'Colors are sorted with 0s first, then 1s, then 2s.'
          }
        ],
        template: `function sortColors(nums) {
  // Implement Dutch National Flag algorithm
  // Use three pointers for partitioning
  
  return nums;
}`
      },
      {
        id: 'partition-labels',
        title: 'Partition Labels',
        difficulty: 'Medium',
        description: 'Partition a string into as many parts as possible so each letter appears in at most one part.',
        detailedDescription: 'Find optimal split points using last occurrences of characters.',
        keyPoints: ['Greedy partitioning', 'Character frequency', 'Optimal splitting'],
        hints: [
          'Find the last occurrence of each character',
          'Extend the current partition to the farthest last occurrence seen',
          'Cut a partition when you reach that farthest index'
        ],
        examples: [
          {
            input: 's = "ababcbacadefegdehijhklij"',
            output: '[9,7,8]',
            explanation: 'The partitions are "ababcbaca", "defegde", "hijhklij".'
          }
        ],
        template: `function partitionLabels(s) {
  // Find last occurrence of each character
  // Use greedy partitioning strategy
  
  return [];
}`
      }
    ],
    'binary-search': [
      {
        id: 'search-insert',
        title: 'Search Insert Position',
        difficulty: 'Easy',
        description: 'Given a sorted array and a target value, return the index where target should be inserted.',
        detailedDescription: 'Binary search variant that returns insertion point when not found.',
        keyPoints: ['Binary search variant', 'Insertion position', 'Sorted array'],
        hints: [
          'Use standard binary search',
          'When target is not found, left pointer is the insertion position',
          'Handle edges where target is smaller or larger than all elements'
        ],
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
        description: 'Find a peak element in an array. A peak element is greater than its neighbors.',
        detailedDescription: 'Binary search on unsorted data by always moving toward a higher neighbor.',
        keyPoints: ['Peak finding', 'Unsorted binary search', 'Neighbor comparison'],
        hints: [
          'Compare middle element with its neighbors',
          'Move toward the side with the higher neighbor',
          'A peak always exists due to boundaries'
        ],
        examples: [
          {
            input: 'nums = [1,2,3,1]',
            output: '2',
            explanation: 'Index 2 is a peak since 3 is greater than both neighbors.'
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
        description: 'Search for a target in a rotated sorted array.',
        detailedDescription: 'Identify which half is sorted and decide which half to search.',
        keyPoints: ['Rotated array', 'Modified binary search', 'Sorted half identification'],
        hints: [
          'Identify which half is sorted',
          'Check if target lies within the sorted half',
          'Search the appropriate half'
        ],
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
    ],
    'sorting-basics': [
      {
        id: 'bubble-sort-implementation',
        title: 'Implement Bubble Sort',
        difficulty: 'Easy',
        description: 'Implement bubble sort to sort an array in ascending order.',
        detailedDescription: 'Bubble sort repeatedly compares adjacent elements and swaps them if needed.',
        keyPoints: ['Adjacent comparisons', 'Swapping elements', 'Multiple passes'],
        hints: [
          'Use nested loops for passes and comparisons',
          'Swap when the left element is greater',
          'Reduce comparisons each pass'
        ],
        examples: [
          {
            input: 'arr = [64, 34, 25, 12, 22, 11, 90]',
            output: '[11, 12, 22, 25, 34, 64, 90]',
            explanation: 'Array is sorted using adjacent swaps.'
          }
        ],
        template: `function bubbleSort(arr) {
  // Implement bubble sort
  // Use nested loops for comparisons
  // Swap adjacent elements if needed
  
  return arr;
}`
      },
      {
        id: 'insertion-sort-implementation',
        title: 'Implement Insertion Sort',
        difficulty: 'Easy',
        description: 'Implement insertion sort to build a sorted portion one element at a time.',
        detailedDescription: 'Insert each element into its correct position among previously sorted elements.',
        keyPoints: ['Building sorted portion', 'Element insertion', 'Shifting elements'],
        hints: [
          'Start from index 1',
          'Shift larger elements right',
          'Insert the key at the correct position'
        ],
        examples: [
          {
            input: 'arr = [5, 2, 4, 6, 1, 3]',
            output: '[1, 2, 3, 4, 5, 6]',
            explanation: 'Each element is inserted into its place.'
          }
        ],
        template: `function insertionSort(arr) {
  // Implement insertion sort
  // Build sorted portion gradually
  // Insert each element in correct position
  
  return arr;
}`
      },
      {
        id: 'selection-sort-implementation',
        title: 'Implement Selection Sort',
        difficulty: 'Easy',
        description: 'Implement selection sort by repeatedly finding the minimum and placing it at the beginning.',
        detailedDescription: 'Divide the array into sorted and unsorted zones and expand the sorted zone.',
        keyPoints: ['Finding minimum', 'Swap with first unsorted', 'Expand sorted portion'],
        hints: [
          'Track index of the minimum in the unsorted zone',
          'Swap with the first unsorted index',
          'Repeat for the rest of the array'
        ],
        examples: [
          {
            input: 'arr = [29, 10, 14, 37, 13]',
            output: '[10, 13, 14, 29, 37]',
            explanation: 'Repeatedly select minimum and place it.'
          }
        ],
        template: `function selectionSort(arr) {
  // Implement selection sort
  // Find minimum in unsorted portion
  // Swap with first unsorted element
  
  return arr;
}`
      },
      {
        id: 'sort-comparison',
        title: 'Sorting Algorithm Analysis',
        difficulty: 'Easy',
        description: 'Compare bubble, insertion, and selection sort on different input arrays.',
        detailedDescription: 'Implement all three and count operations on sorted, reverse, and random inputs.',
        keyPoints: ['Algorithm comparison', 'Performance analysis', 'Best and worst cases'],
        hints: [
          'Count comparisons and swaps',
          'Reset counts per algorithm',
          'Return a summary object'
        ],
        examples: [
          {
            input: 'arr = [3, 1, 4, 1, 5], algorithms = ["bubble", "insertion", "selection"]',
            output: '{"bubble": {"comparisons": 10, "swaps": 5}, "insertion": {"comparisons": 6, "swaps": 4}, "selection": {"comparisons": 10, "swaps": 3}}',
            explanation: 'Example metrics for a small input.'
          }
        ],
        template: `function compareSortingAlgorithms(arr, algorithms) {
  // Implement bubble, insertion, and selection sort
  // Count operations for each
  // Return performance comparison
  
  return {};
}`
      }
    ]
  };

const handleRunCode = async () => {
  if (!selectedProblem) return;
  setIsRunning(true);
  setOutput(sanitize('Running your solution...\nExecuting test cases...'));

  const spec = problemSpecs[selectedProblem];
  if (!spec) {
    setOutput(sanitize('No tests available for this problem yet.'));
    setIsRunning(false);
    return;
  }

  const codeToRun = code || currentProblem?.template || '';
  if (!workerRef.current) {
    setOutput(sanitize('Runner not ready. Please try again.'));
    setIsRunning(false);
    return;
  }
  workerRef.current.postMessage({ code: codeToRun, functionName: spec.functionName, tests: spec.tests, timeoutMs: 2000 });
};

  if (!selectedAlgorithm) {
    // Algorithm Selection View
    return (
      <div className="min-h-screen relative overflow-hidden">
        <FloatingElements />
        
        <div className="relative z-10 pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                Algorithm Practice
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Master computer science algorithms through hands on coding challenges. 
                Each problem is designed to reinforce core concepts and build problem solving intuition.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {algorithms.map((algorithm, index) => (
                <motion.div
                  key={algorithm.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedAlgorithm(algorithm.id)}
                  className="group cursor-pointer"
                >
                  <Card className="glass-panel border-0 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${algorithm.color} flex items-center justify-center shadow-lg`}>
                          <Code className="h-7 w-7 text-white" />
                        </div>
                        <Badge 
                          variant={algorithm.difficulty === 'Easy' ? 'secondary' : 'outline'}
                          className="text-sm font-medium"
                        >
                          {algorithm.difficulty}
                        </Badge>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {algorithm.name}
                      </h3>
                      <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                        {algorithm.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">
                          {algorithm.problemCount} challenges
                        </span>
                        <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                          <span className="font-semibold mr-2">Start Practice</span>
                          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
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
      <div className="min-h-screen relative overflow-hidden">
        <FloatingElements />
        
        <div className="relative z-10 pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Button 
                onClick={() => setSelectedAlgorithm(null)}
                variant="ghost"
                className="mb-6 text-slate-600 hover:text-slate-900 hover:bg-slate-100 p-3 rounded-xl"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Algorithms
              </Button>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                {currentAlgorithm?.name} Challenges
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {currentAlgorithm?.description}
              </p>
            </motion.div>

            <div className="space-y-6">
              {algorithmProblems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedProblem(problem.id)}
                  className="group cursor-pointer"
                >
                  <Card className="glass-panel border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-6">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                              {problem.title}
                            </h3>
                            <p className="text-slate-700 leading-relaxed text-lg mb-4">
                              {problem.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {problem.keyPoints?.map((point, i) => (
                                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                  {point}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={problem.difficulty === 'Easy' ? 'secondary' : problem.difficulty === 'Medium' ? 'outline' : 'destructive'}
                          className="text-sm font-medium"
                        >
                          {problem.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span>{problem.examples?.length || 1} example{(problem.examples?.length || 1) > 1 ? 's' : ''}</span>
                          <span>•</span>
                          <span>{problem.hints?.length || 0} hint{(problem.hints?.length || 0) !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                          <span className="font-semibold mr-2">Solve Challenge</span>
                          <Target className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
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
    <div className="min-h-screen relative overflow-hidden">
      <FloatingElements />
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button 
              onClick={() => setSelectedProblem(null)}
              variant="ghost"
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 p-3 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to {currentAlgorithm?.name} Problems
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Problem Description */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="glass-panel border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-3xl font-bold text-slate-900">
                      {currentProblem.title}
                    </CardTitle>
                    <Badge variant={currentProblem.difficulty === 'Easy' ? 'secondary' : currentProblem.difficulty === 'Medium' ? 'outline' : 'destructive'}>
                      {currentProblem.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed text-lg mb-6">
                      {currentProblem.description}
                    </p>
                    
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 mb-6">
                      <div className="flex items-start space-x-3">
                        <Brain className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-2">Algorithm Connection</h4>
                          <p className="text-blue-800 leading-relaxed">
                            {currentProblem.detailedDescription}
                          </p>
                        </div>
                      </div>
                    </div>

                    {currentProblem.keyPoints && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                          <Target className="h-5 w-5 text-emerald-500 mr-2" />
                          Key Concepts
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentProblem.keyPoints.map((point, index) => (
                            <span key={index} className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
                              {point}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                      <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                      Examples
                    </h4>
                    
                    {currentProblem.examples.map((example, index) => (
                      <div key={index} className="glass-panel p-6 rounded-2xl mb-4 border border-slate-200">
                        <div className="space-y-4">
                          <div className="bg-slate-100 p-4 rounded-xl">
                            <span className="font-semibold text-slate-700 block mb-2">Input:</span>
                            <code className="text-sm bg-white px-3 py-2 rounded-lg border text-slate-800 block">
                              {example.input}
                            </code>
                          </div>
                          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                            <span className="font-semibold text-green-700 block mb-2">Output:</span>
                            <code className="text-sm bg-white px-3 py-2 rounded-lg border text-slate-800 block">
                              {example.output}
                            </code>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                            <span className="font-semibold text-blue-700 block mb-2">Explanation:</span>
                            <p className="text-sm text-slate-700 leading-relaxed">{example.explanation}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {currentProblem.hints && (
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                          <HelpCircle className="h-5 w-5 text-purple-500 mr-2" />
                          Hints
                        </h4>
                        <div className="space-y-2">
                          {currentProblem.hints.map((hint, index) => (
                            <div key={index} className="bg-purple-50 border border-purple-200 p-4 rounded-xl">
                              <p className="text-purple-800 text-sm leading-relaxed">
                                <strong>Hint {index + 1}:</strong> {hint}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Code Editor and Results */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Code Editor */}
              <Card className="glass-panel border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                      <Code className="mr-3 h-6 w-6 text-blue-600" />
                      Code Editor
                    </CardTitle>
                    <div className="flex space-x-3">
                      <Button
                        onClick={() =>
                          setOutput(
                            sanitize(
                              'Hint: ' +
                                (currentProblem.hints?.[0] ||
                                  'Think about the key properties of ' +
                                    (currentAlgorithm?.name.toLowerCase() || 'the algorithm') +
                                    ' and how they apply to this problem.')
                            )
                          )
                        }
                        variant="outline"
                        size="sm"
                        className="border-amber-200 text-amber-700 hover:bg-amber-50"
                      >
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Get Hint
                      </Button>
                      <Button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                      >
                        {isRunning ? (
                          <>
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Run Code
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="code-editor rounded-2xl p-6 bg-slate-900 border">
                    <Textarea
                      value={code || currentProblem.template}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[400px] bg-transparent border-0 text-emerald-400 font-mono text-sm resize-none focus-visible:ring-0 placeholder:text-slate-500"
                      placeholder="Write your solution here..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Console Output */}
              <Card className="glass-panel border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                    <Brain className="mr-2 h-6 w-6 text-purple-600" />
                    Console Output
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm min-h-[150px] border">
                    <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                      {output || 'Welcome to AlgoFlow Practice.\n\nWrite your solution and click "Run Code".\nUse "Get Hint" if you need guidance.\n\nHappy coding!'}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Test Results */}
              {testResults.length > 0 && (
                <Card className="glass-panel border-0 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                      <Trophy className="mr-2 h-6 w-6 text-amber-600" />
                      Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {testResults.map((test, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
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
                            <span className="font-semibold text-slate-900">
                              {test.input}
                            </span>
                          </div>
                          {!test.passed && (
                            <div className="text-sm space-y-2 ml-8">
                              <div className="text-red-600">
                                Expected: <code className="bg-white px-2 py-1 rounded border">{test.expected}</code>
                              </div>
                              <div className="text-red-600">
                                Got: <code className="bg-white px-2 py-1 rounded border">{test.actual}</code>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                      
                      <Button
                        className={`w-full text-lg py-6 mt-6 shadow-lg ${
                          testResults.every(test => test.passed)
                            ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white'
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        }`}
                        disabled={!testResults.every(test => test.passed)}
                      >
                        <Trophy className="mr-2 h-5 w-5" />
                        {testResults.every(test => test.passed) ? 'Submit Solution' : 'Fix Issues to Submit'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
