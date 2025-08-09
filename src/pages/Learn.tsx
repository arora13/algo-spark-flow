import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FloatingElements from '@/components/FloatingElements';
import { Play, Pause, RotateCcw, ChevronRight, Clock, HardDrive, Zap, CheckCircle } from 'lucide-react';

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const barItem = {
  hidden: { y: 40, opacity: 0, scale: 0.96 },
  show: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 20 } },
};

const Learn = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('merge-sort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const controls = useAnimation();
  const [runKey, setRunKey] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const algorithms = [
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      emoji: '📊',
      category: 'Sorting',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      description:
        'Merge Sort is a divide-and-conquer algorithm that works by recursively breaking down a problem into smaller, more manageable sub-problems. It divides the array into two halves, sorts them separately, and then merges them back together in sorted order.',
      detailedExplanation:
        'The beauty of Merge Sort lies in its guaranteed performance. Unlike some other sorting algorithms that can degrade to O(n²) in worst-case scenarios, Merge Sort consistently delivers O(n log n) performance regardless of the input data. This makes it incredibly reliable for production systems where consistent performance is crucial.',
      realWorldUse:
        "Used extensively in database systems, external sorting when data doesn't fit in memory, and as the foundation for many hybrid algorithms like Timsort used in Python's sort().",
      steps: [
        'Divide the array into two equal halves',
        'Recursively sort the left half',
        'Recursively sort the right half',
        'Merge the two sorted halves back together',
        'Compare elements from both halves and place in correct order',
      ],
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      emoji: '⚡',
      category: 'Sorting',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n) avg, O(n²) worst',
      spaceComplexity: 'O(log n)',
      description:
        "Quick Sort is an efficient, in-place sorting algorithm that uses a divide-and-conquer approach. It works by selecting a 'pivot' element and partitioning the array so that elements smaller than the pivot come before it, and elements greater come after.",
      detailedExplanation:
        'Quick Sort has excellent average-case performance and low memory overhead. After each partition step, the pivot is in its final position.',
      realWorldUse:
        "Default sorting algorithm in many languages due to cache friendliness and low memory overhead. Used in C's qsort and many JS Array.sort implementations.",
      steps: [
        'Choose a pivot element',
        'Partition left smaller, right larger',
        'Recursively sort the left subarray',
        'Recursively sort the right subarray',
        'Array is sorted after partitions converge',
      ],
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      emoji: '🎯',
      category: 'Search',
      difficulty: 'Easy',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      description:
        'Binary Search finds a value in a sorted array by repeatedly halving the search interval.',
      detailedExplanation:
        'Logarithmic comparisons make it extremely fast even on large inputs.',
      realWorldUse:
        'Core of indexing, search engines, and many algorithms.',
      steps: [
        'Start with the entire sorted array',
        'Find the middle element',
        'Compare target with middle',
        'If smaller, search left; if larger, search right',
        'Repeat until found or interval empty',
      ],
    },
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      emoji: '🔄',
      category: 'Sorting',
      difficulty: 'Easy',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      description:
        'Bubble Sort repeatedly compares adjacent elements and swaps them if out of order.',
      detailedExplanation:
        'Simple to implement and good for teaching fundamentals.',
      realWorldUse:
        'Education and very small arrays.',
      steps: [
        'Start at the beginning',
        'Compare adjacent elements',
        'Swap if left larger than right',
        'Largest moves to the end each pass',
        'Repeat until no swaps are needed',
      ],
    },
    {
      id: 'insertion-sort',
      name: 'Insertion Sort',
      emoji: '📖',
      category: 'Sorting',
      difficulty: 'Easy',
      timeComplexity: 'O(n²) worst, O(n) best',
      spaceComplexity: 'O(1)',
      description:
        'Insertion Sort builds the final array by inserting each element into the correct position in the already sorted portion.',
      detailedExplanation:
        'Adaptive and efficient on nearly sorted data.',
      realWorldUse:
        'Used for small arrays and as a subroutine inside faster sorts.',
      steps: [
        'Assume first element sorted',
        'Pick next element as key',
        'Shift larger elements right',
        'Insert key at correct position',
        'Repeat for all elements',
      ],
    },
    {
      id: 'selection-sort',
      name: 'Selection Sort',
      emoji: '✅',
      category: 'Sorting',
      difficulty: 'Easy',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      description:
        'Repeatedly select the minimum from the unsorted portion and place it at the start.',
      detailedExplanation:
        'Performs few swaps, useful when writes are costly.',
      realWorldUse:
        'Predictable behavior on small arrays.',
      steps: [
        'Find the minimum in the unsorted portion',
        'Swap with the first unsorted index',
        'Move boundary one step right',
        'Repeat until fully sorted',
        'Each pass fixes one element',
      ],
    },
  ];

  const currentAlgorithm =
    algorithms.find((algo) => algo.id === selectedAlgorithm) || algorithms[0];

  useEffect(() => {
    // cleanup any running interval if algorithm changes or component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [selectedAlgorithm]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // restart animation tree
    setRunKey((k) => k + 1);
    setIsPlaying(true);

    // kick off stagger-in
    requestAnimationFrame(async () => {
      await controls.start('show');
    });

    // drive the step text
    intervalRef.current = window.setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= currentAlgorithm.steps.length - 1) {
          setIsPlaying(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return prev;
        }
        return prev + 1;
      });
    }, 2500);
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentStep(0);
    setRunKey((k) => k + 1);
    controls.set('hidden');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'from-emerald-400 to-emerald-600';
      case 'Medium':
        return 'from-amber-400 to-orange-500';
      case 'Hard':
        return 'from-red-400 to-red-600';
      default:
        return 'from-slate-400 to-slate-600';
    }
  };

  return (
    <div className="min-h-screen relative">
      <FloatingElements />

      <div className="relative z-10 pt-24 pb-16">
        <div className="container-width">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-dm-sans">
              Interactive{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Algorithm Learning
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Master algorithms through step-by-step visualizations and comprehensive explanations
              designed specifically for AP Computer Science students.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <Card className="glass-panel border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="font-dm-sans text-xl text-slate-900 flex items-center">
                    <span className="mr-3 h-6 w-6 flex items-center justify-center text-lg">🧠</span>
                    Algorithms
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2 p-6">
                    {algorithms.map((algo) => {
                      const isSelected = selectedAlgorithm === algo.id;
                      return (
                        <button
                          key={algo.id}
                          onClick={() => {
                            setSelectedAlgorithm(algo.id);
                            setCurrentStep(0);
                            handleReset();
                          }}
                          className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                            isSelected
                              ? 'bg-gradient-primary text-white shadow-lg scale-105'
                              : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <span
                                role="img"
                                aria-label="algo-icon"
                                className={`h-5 w-5 flex items-center justify-center text-base ${
                                  isSelected ? 'text-white' : 'text-primary'
                                }`}
                              >
                                {algo.emoji}
                              </span>
                              <h3 className="font-semibold">{algo.name}</h3>
                            </div>
                            <ChevronRight
                              className={`h-4 w-4 transition-transform ${
                                isSelected
                                  ? 'rotate-90 text-white'
                                  : 'group-hover:translate-x-1 text-slate-400'
                              }`}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`${isSelected ? 'text-white/80' : 'text-slate-500'} text-sm`}>
                              {algo.category}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                isSelected
                                  ? 'bg-white/20 text-white'
                                  : `bg-gradient-to-r ${getDifficultyColor(algo.difficulty)} text-white`
                              }`}
                            >
                              {algo.difficulty}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main */}
            <div className="lg:col-span-9 space-y-8">
              {/* Overview */}
              <Card className="glass-panel border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-xl">
                      {currentAlgorithm.emoji}
                    </div>
                    <div>
                      <CardTitle className="font-dm-sans text-3xl text-slate-900">
                        {currentAlgorithm.name}
                      </CardTitle>
                      <p className="text-slate-600 mt-1">{currentAlgorithm.category} Algorithm</p>
                    </div>
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-700 leading-relaxed mb-4">
                      {currentAlgorithm.description}
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                      <p className="text-slate-700 text-sm leading-relaxed">
                        <strong className="text-blue-700">Deep Dive:</strong>{' '}
                        {currentAlgorithm.detailedExplanation}
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-slate-700 text-sm">
                        <strong className="text-green-700">Real-World Applications:</strong>{' '}
                        {currentAlgorithm.realWorldUse}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="glass-panel p-4 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold text-slate-900">Time Complexity</h4>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-mono">
                        {currentAlgorithm.timeComplexity}
                      </span>
                    </div>
                    <div className="glass-panel p-4 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <HardDrive className="h-5 w-5 text-purple-600" />
                        <h4 className="font-semibold text-slate-900">Space Complexity</h4>
                      </div>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-mono">
                        {currentAlgorithm.spaceComplexity}
                      </span>
                    </div>
                    <div className="glass-panel p-4 rounded-xl">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="h-5 w-5 text-pink-600" />
                        <h4 className="font-semibold text-slate-900">Difficulty</h4>
                      </div>
                      <span
                        className={`px-3 py-1 bg-gradient-to-r ${getDifficultyColor(
                          currentAlgorithm.difficulty
                        )} text-white rounded-full text-sm font-medium`}
                      >
                        {currentAlgorithm.difficulty}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Visualization */}
              <Card className="glass-panel border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-dm-sans text-xl text-slate-900">
                      Step-by-Step Visualization
                    </CardTitle>
                    <div className="flex space-x-3">
                      <Button onClick={handlePlayPause} className="btn-primary" size="sm">
                        {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                        {isPlaying ? 'Pause' : 'Play'}
                      </Button>
                      <Button onClick={handleReset} className="btn-secondary" size="sm">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Bars or Tiles */}
                  <div className="glass-panel rounded-xl p-8 relative overflow-hidden">
                    <div className="bg-pattern" />

                    {/* Sorting bars */}
                    {selectedAlgorithm.includes('sort') && (
                      <motion.div
                        key={runKey}
                        className="flex items-end gap-4 z-10 justify-center"
                        variants={container}
                        initial="hidden"
                        animate={controls}
                      >
                        {[64, 34, 25, 12, 22, 11, 90, 48].map((value, index) => {
                          const active = index <= currentStep;
                          return (
                            <motion.div
                              key={index}
                              variants={barItem}
                              className="relative flex items-end justify-center rounded-xl"
                              style={{ width: 48, height: 280 }}
                            >
                              <div
                                className={`w-full rounded-xl transition-all duration-500 ${
                                  active
                                    ? 'bg-gradient-primary shadow-lg scale-105'
                                    : 'bg-gradient-to-t from-slate-400 to-slate-300'
                                }`}
                                style={{ height: Math.max(24, (value / 100) * 240) }}
                              />
                              <span className="absolute -bottom-7 text-xs font-semibold bg-slate-800 text-white px-2 py-1 rounded-md">
                                {value}
                              </span>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}

                    {/* Binary search tiles */}
                    {selectedAlgorithm === 'binary-search' && (
                      <motion.div
                        key={runKey}
                        className="flex items-center gap-3 z-10 justify-center"
                        variants={container}
                        initial="hidden"
                        animate={controls}
                      >
                        {[1, 3, 5, 7, 9, 11, 13, 15, 17, 19].map((value, index) => {
                          const mid = Math.floor(10 / 2);
                          const active = index <= currentStep;
                          const isMid = index === mid && currentStep >= 1;
                          return (
                            <motion.div
                              key={index}
                              variants={barItem}
                              className={`w-14 h-14 flex items-center justify-center rounded-xl font-bold transition-all duration-500
                                ${isMid ? 'bg-gradient-primary text-white shadow-lg scale-110'
                                  : active ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                                  : 'bg-slate-100 text-slate-500 border border-slate-300'}`}
                            >
                              {value}
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>

                  {/* Caption moved below to avoid overlap */}
                  <div className="mt-4 glass-panel p-4 rounded-xl">
                    <p className="text-sm font-medium text-slate-900 mb-1">
                      <span className="text-primary">
                        Step {currentStep + 1} of {currentAlgorithm.steps.length}
                      </span>
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {currentAlgorithm.steps[currentStep]}
                    </p>
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="steps" className="w-full mt-6">
                    <TabsList className="grid w-full grid-cols-2 glass-panel">
                      <TabsTrigger
                        value="steps"
                        className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
                      >
                        Step-by-Step
                      </TabsTrigger>
                      <TabsTrigger
                        value="pseudocode"
                        className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
                      >
                        Pseudocode
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="steps" className="mt-6">
                      <div className="space-y-4">
                        {currentAlgorithm.steps.map((step, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-xl border-l-4 transition-all duration-300 ${
                              index <= currentStep
                                ? 'border-primary bg-blue-50 text-slate-900'
                                : 'border-slate-300 bg-slate-50 text-slate-600'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                  index <= currentStep ? 'bg-gradient-primary text-white' : 'bg-slate-400 text-white'
                                }`}
                              >
                                {index + 1}
                              </span>
                              <span className="flex-1">{step}</span>
                              {index <= currentStep && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="pseudocode" className="mt-6">
                      <div className="code-editor p-6 font-mono text-sm">
                        <pre className="text-emerald-400 leading-relaxed">
{selectedAlgorithm === 'merge-sort' && `MERGE_SORT(array, left, right):
    IF left < right:
        middle = (left + right) / 2
        MERGE_SORT(array, left, middle)
        MERGE_SORT(array, middle + 1, right)
        MERGE(array, left, middle, right)

MERGE(array, left, middle, right):
    Create temp arrays for left and right
    Copy data to temps
    WHILE both have elements:
        IF left_element <= right_element:
            Place left_element
        ELSE:
            Place right_element
    Copy remaining elements`}
{selectedAlgorithm === 'quick-sort' && `QUICK_SORT(array, low, high):
    IF low < high:
        pivot_index = PARTITION(array, low, high)
        QUICK_SORT(array, low, pivot_index - 1)
        QUICK_SORT(array, pivot_index + 1, high)

PARTITION(array, low, high):
    pivot = array[high]
    i = low - 1
    FOR j = low TO high - 1:
        IF array[j] <= pivot:
            i = i + 1
            SWAP array[i], array[j]
    SWAP array[i + 1], array[high]
    RETURN i + 1`}
{selectedAlgorithm === 'binary-search' && `BINARY_SEARCH(array, target):
    left = 0
    right = n - 1
    WHILE left <= right:
        mid = (left + right) / 2
        IF array[mid] = target:
            RETURN mid
        ELSE IF array[mid] < target:
            left = mid + 1
        ELSE:
            right = mid - 1
    RETURN -1`}
{selectedAlgorithm === 'bubble-sort' && `BUBBLE_SORT(array):
    n = length
    FOR i = 0 TO n - 2:
        swapped = false
        FOR j = 0 TO n - 2 - i:
            IF array[j] > array[j + 1]:
                SWAP array[j], array[j + 1]
                swapped = true
        IF swapped = false: BREAK`}
{selectedAlgorithm === 'insertion-sort' && `INSERTION_SORT(array):
    FOR i = 1 TO n - 1:
        key = array[i]
        j = i - 1
        WHILE j >= 0 AND array[j] > key:
            array[j + 1] = array[j]
            j = j - 1
        array[j + 1] = key`}
{selectedAlgorithm === 'selection-sort' && `SELECTION_SORT(array):
    n = length
    FOR i = 0 TO n - 2:
        min_index = i
        FOR j = i + 1 TO n - 1:
            IF array[j] < array[min_index]:
                min_index = j
        IF min_index ≠ i:
            SWAP array[i], array[min_index]`}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
