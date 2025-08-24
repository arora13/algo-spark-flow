import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, Clock, HardDrive, Zap, CheckCircle } from 'lucide-react';
import { generateAlgorithmSteps } from '@/lib/algorithms';

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
      'The beauty of Merge Sort lies in its guaranteed performance. Unlike some other sorting algorithms that can degrade to O(n²) in worst-case scenarios, Merge Sort consistently delivers O(n log n) performance regardless of the input data.',
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
];

const Learn = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('merge-sort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationState, setAnimationState] = useState('hidden');
  const [runKey, setRunKey] = useState(0);
  const [sortedArray, setSortedArray] = useState([64, 34, 25, 12, 22, 11, 90, 48]);
  const [searchArray] = useState([1, 3, 5, 7, 9, 11, 13, 15, 17, 19]);
  const [targetFound, setTargetFound] = useState(-1);
  const [searchMid, setSearchMid] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentAlgorithm = algorithms.find((algo) => algo.id === selectedAlgorithm) || algorithms[0];

  // Build steps using shared generators
  const buildSteps = (algoId: string) => {
    const initialArray = [64, 34, 25, 12, 22, 11, 90, 48];
    if (algoId === 'binary-search') {
      const sorted = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
      return generateAlgorithmSteps(algoId, sorted, 9);
    }
    return generateAlgorithmSteps(algoId, initialArray);
  };

  useEffect(() => {
    // Reset array when algorithm changes
    setSortedArray([64, 34, 25, 12, 22, 11, 90, 48]);
    setTargetFound(-1);
    setCurrentStep(0);
  }, [selectedAlgorithm]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Reset and start animation
    setRunKey((k) => k + 1);
    setIsPlaying(true);
    setAnimationState('show');
    setCurrentStep(0);

    const initialArray = [64, 34, 25, 12, 22, 11, 90, 48];

    if (selectedAlgorithm === 'binary-search') {
      const searchSteps = generateAlgorithmSteps('binary-search', searchArray, 9) as any[];
      let stepIndex = 0;
      setSearchMid(searchSteps[0]?.mid ?? -1);
      setTargetFound(-1);

      intervalRef.current = setInterval(() => {
        if (stepIndex < searchSteps.length) {
          setCurrentStep(stepIndex);
          setSearchMid(searchSteps[stepIndex].mid);
          if (searchSteps[stepIndex].found !== -1) {
            setTargetFound(searchSteps[stepIndex].found);
          }
          stepIndex++;
        } else {
          setIsPlaying(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 1500);
      return;
    }

    // Sorting algorithms
    const sortSteps = generateAlgorithmSteps(selectedAlgorithm, initialArray) as any[];
    let stepIndex = 0;
    setSortedArray(sortSteps[0]?.array ?? initialArray);

    intervalRef.current = setInterval(() => {
      stepIndex++;
      if (stepIndex < sortSteps.length) {
        setSortedArray(sortSteps[stepIndex].array);
        setCurrentStep(stepIndex);
      } else {
        setIsPlaying(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, 1500);
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentStep(0);
    setRunKey((k) => k + 1);
    setAnimationState('hidden');
    setSortedArray([64, 34, 25, 12, 22, 11, 90, 48]);
    setTargetFound(-1);
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
    <div className="min-h-screen bg-[#0b1f24] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Interactive{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Algorithm Learning
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-white/85 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Master algorithms through step-by-step visualizations and comprehensive explanations
            designed specifically for AP Computer Science students.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <motion.div 
              className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <span className="mr-3">🧠</span>
                Algorithms
              </h2>
              <div className="space-y-3">
                {algorithms.map((algo, index) => {
                  const isSelected = selectedAlgorithm === algo.id;
                  return (
                    <motion.button
                      key={algo.id}
                      onClick={() => {
                        setSelectedAlgorithm(algo.id);
                        setCurrentStep(0);
                        handleReset();
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                          : 'hover:bg-white/[0.08] text-white/85 bg-white/[0.04] border border-white/10'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{algo.emoji}</span>
                          <h3 className="font-semibold">{algo.name}</h3>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            isSelected ? 'rotate-90 text-white' : 'group-hover:translate-x-1 text-white/50'
                          }`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`${isSelected ? 'text-white/80' : 'text-white/60'} text-sm`}>
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
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-8">
            {/* Algorithm Overview */}
            <motion.div 
              className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-xl">
                  {currentAlgorithm.emoji}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{currentAlgorithm.name}</h2>
                  <p className="text-white/70 mt-1">{currentAlgorithm.category} Algorithm</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-lg text-white/85 leading-relaxed mb-4">
                  {currentAlgorithm.description}
                </p>
                <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4 mb-4">
                  <p className="text-white/90 text-sm leading-relaxed">
                    <strong className="text-blue-200">Deep Dive:</strong>{' '}
                    {currentAlgorithm.detailedExplanation}
                  </p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-4">
                  <p className="text-white/90 text-sm">
                    <strong className="text-emerald-200">Real-World Applications:</strong>{' '}
                    {currentAlgorithm.realWorldUse}
                  </p>
                </div>
              </div>

              {/* Complexity Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/[0.05] p-4 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-5 w-5 text-blue-300" />
                    <h4 className="font-semibold">Time Complexity</h4>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm font-mono">
                    {currentAlgorithm.timeComplexity}
                  </span>
                </div>
                <div className="bg-white/[0.05] p-4 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <HardDrive className="h-5 w-5 text-purple-300" />
                    <h4 className="font-semibold">Space Complexity</h4>
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm font-mono">
                    {currentAlgorithm.spaceComplexity}
                  </span>
                </div>
                <div className="bg-white/[0.05] p-4 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-5 w-5 text-pink-300" />
                    <h4 className="font-semibold">Difficulty</h4>
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
            </motion.div>

            {/* Visualization */}
            <motion.div 
              className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Step-by-Step Visualization</h3>
                <div className="flex space-x-3">
                  <motion.button
                    onClick={handlePlayPause}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </motion.button>
                  <motion.button
                    onClick={handleReset}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200 border border-white/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Visualization Area */}
              <div className="bg-[#0c121b] rounded-xl p-8 relative overflow-hidden min-h-[300px] flex items-center justify-center border border-white/10">
                <AnimatePresence>
                  {/* Sorting bars */}
                  {selectedAlgorithm.includes('sort') && (
                    <motion.div
                      key={`sort-${runKey}`}
                      className="flex items-end gap-4"
                      variants={container}
                      initial="hidden"
                      animate={animationState}
                    >
                      {sortedArray.map((value, index) => {
                        return (
                          <motion.div
                            key={`${value}-${index}-${runKey}`}
                            variants={barItem}
                            className="relative flex items-end justify-center"
                            layout
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                          >
                            <motion.div
                              className="w-12 rounded-t-lg bg-gradient-to-t from-blue-600 to-purple-600 shadow-lg"
                              style={{ height: Math.max(24, (value / 100) * 200) }}
                              animate={{ 
                                scale: [1, 1.05, 1],
                              }}
                              transition={{ duration: 0.6, repeat: 0 }}
                            />
                            <span className="absolute -bottom-8 text-xs font-semibold bg-black/60 text-white px-2 py-1 rounded-md">
                              {value}
                            </span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}

                  {/* Binary search visualization */}
                  {selectedAlgorithm === 'binary-search' && (
                    <motion.div
                      key={`search-${runKey}`}
                      className="flex items-center gap-3"
                      variants={container}
                      initial="hidden"
                      animate={animationState}
                    >
                      {searchArray.map((value, index) => {
                        const isTarget = value === 9; // Looking for 9
                        const isFound = targetFound === index;
                        const isMid = index === searchMid;
                        
                        return (
                          <motion.div
                            key={index}
                            variants={barItem}
                            className={`w-14 h-14 flex items-center justify-center rounded-xl font-bold transition-all duration-500 ${
                              isFound
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                                : isMid
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                : isTarget
                                ? 'bg-yellow-400/20 text-yellow-200 border border-yellow-400/30'
                                : 'bg-white/5 text-white/70 border border-white/10'
                            }`}
                            animate={
                              isFound 
                                ? { scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] } 
                                : isMid 
                                ? { scale: [1, 1.2, 1] } 
                                : { scale: 1 }
                            }
                            transition={{ duration: 0.6 }}
                          >
                            {value}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                  
                  {/* Target indicator for binary search */}
                  {selectedAlgorithm === 'binary-search' && (
                    <div className="absolute top-4 left-4 bg-yellow-400/15 border border-yellow-400/30 rounded-lg px-3 py-2">
                      <span className="text-sm font-medium text-yellow-200">
                        🎯 Target: 9
                      </span>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step Description */}
              <motion.div 
                className="mt-6 bg-white/[0.05] p-4 rounded-xl border border-white/10"
                key={`step-${currentStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-medium mb-1">
                  <span className="text-blue-300">
                    Step {Math.min(currentStep + 1, currentAlgorithm.steps.length)} of {currentAlgorithm.steps.length}
                  </span>
                </p>
                <p className="text-white/85 text-sm leading-relaxed">
                  {currentAlgorithm.steps[Math.min(currentStep, currentAlgorithm.steps.length - 1)]}
                </p>
              </motion.div>

              {/* Steps List */}
              <div className="mt-6 space-y-3">
                <h4 className="font-semibold mb-4">Algorithm Steps:</h4>
                {currentAlgorithm.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-xl border-l-4 transition-all duration-300 ${
                      index <= currentStep
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-white/10 bg-white/[0.04] text-white/75'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index <= currentStep
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-white/20 text-white'
                        }`}
                        animate={index <= currentStep ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {index + 1}
                      </motion.span>
                      <span className="flex-1">{step}</span>
                      {index <= currentStep && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <CheckCircle className="h-5 w-5 text-emerald-300" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
