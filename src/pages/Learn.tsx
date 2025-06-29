
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, RotateCcw, ChevronRight, Clock, Memory, Zap, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CosmicBackground from '@/components/CosmicBackground';

const Learn = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('merge-sort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { user, updateProgress } = useAuth();

  const algorithms = [
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      category: 'Sorting',
      difficulty: 'Medium',
      description: 'A stable, divide-and-conquer algorithm that splits arrays in half, sorts them recursively, and merges the results back together.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      realWorldUse: 'Used in external sorting, database operations, and parallel computing.',
      steps: [
        'Divide the array into two equal halves',
        'Recursively sort the left half',
        'Recursively sort the right half',
        'Merge the sorted halves back together',
        'Compare elements and place in correct order'
      ]
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      category: 'Sorting',
      difficulty: 'Medium',
      description: 'An efficient in-place sorting algorithm that selects a pivot element and partitions the array around it.',
      timeComplexity: 'O(n log n) avg, O(n²) worst',
      spaceComplexity: 'O(log n)',
      realWorldUse: 'Default sorting algorithm in many programming languages and systems.',
      steps: [
        'Choose a pivot element (usually last element)',
        'Partition array: elements < pivot go left, > pivot go right',
        'Recursively apply QuickSort to left subarray',
        'Recursively apply QuickSort to right subarray',
        'Combine results (no merge needed)'
      ]
    },
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      category: 'Sorting',
      difficulty: 'Easy',
      description: 'A simple comparison-based algorithm that repeatedly steps through the list and swaps adjacent elements if they\'re in the wrong order.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      realWorldUse: 'Teaching purposes and very small datasets.',
      steps: [
        'Start with the first element of the array',
        'Compare adjacent elements',
        'Swap if they are in wrong order',
        'Continue until end of array',
        'Repeat until no swaps are needed'
      ]
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      category: 'Search',
      difficulty: 'Easy',
      description: 'An efficient algorithm for finding an item in a sorted array by repeatedly dividing the search interval in half.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      realWorldUse: 'Database indexing, searching in sorted collections, and system libraries.',
      steps: [
        'Start with entire sorted array',
        'Find the middle element',
        'Compare target with middle element',
        'Eliminate half of the remaining elements',
        'Repeat until element is found or search space is empty'
      ]
    },
    {
      id: 'insertion-sort',
      name: 'Insertion Sort',
      category: 'Sorting',
      difficulty: 'Easy',
      description: 'Builds the final sorted array one item at a time, similar to how you might sort playing cards in your hands.',
      timeComplexity: 'O(n²) worst, O(n) best',
      spaceComplexity: 'O(1)',
      realWorldUse: 'Small datasets, nearly sorted data, and as a subroutine in hybrid algorithms.',
      steps: [
        'Start with second element (assume first is sorted)',
        'Compare current element with previous elements',
        'Shift larger elements to the right',
        'Insert current element in correct position',
        'Repeat for all remaining elements'
      ]
    },
    {
      id: 'selection-sort',
      name: 'Selection Sort',
      category: 'Sorting',
      difficulty: 'Easy',
      description: 'Finds the minimum element and places it at the beginning, then repeats for the remaining unsorted portion.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      realWorldUse: 'When memory writes are costly, small datasets.',
      steps: [
        'Find minimum element in unsorted portion',
        'Swap it with first element of unsorted portion',
        'Move boundary of sorted portion one position right',
        'Repeat until entire array is sorted',
        'Array is now completely sorted'
      ]
    }
  ];

  const currentAlgorithm = algorithms.find(algo => algo.id === selectedAlgorithm) || algorithms[0];
  const isCompleted = user?.progress.completedAlgorithms.includes(selectedAlgorithm);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= currentAlgorithm.steps.length - 1) {
            setIsPlaying(false);
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleComplete = () => {
    updateProgress('algorithm', selectedAlgorithm);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'from-green-400 to-green-600';
      case 'Medium': return 'from-yellow-400 to-orange-500';
      case 'Hard': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen relative">
      <CosmicBackground />
      
      <div className="relative z-10 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl text-white mb-6">
              Interactive <span className="cosmic-text">Algorithm Learning</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Master algorithms through immersive step-by-step visualizations and detailed explanations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Algorithm Selection Sidebar */}
            <div className="lg:col-span-1">
              <Card className="cosmic-card border-white/20">
                <CardHeader>
                  <CardTitle className="font-poppins text-xl text-white flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-neon-blue" />
                    Algorithms
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-2">
                    {algorithms.map((algo) => {
                      const isSelected = selectedAlgorithm === algo.id;
                      const isAlgoCompleted = user?.progress.completedAlgorithms.includes(algo.id);
                      
                      return (
                        <button
                          key={algo.id}
                          onClick={() => {
                            setSelectedAlgorithm(algo.id);
                            setCurrentStep(0);
                            setIsPlaying(false);
                          }}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-300 group ${
                            isSelected
                              ? 'bg-gradient-primary text-white neon-glow'
                              : 'hover:bg-white/10 text-white/90 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold">{algo.name}</h3>
                              {isAlgoCompleted && (
                                <CheckCircle className="h-4 w-4 text-green-400" />
                              )}
                            </div>
                            <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              isSelected ? 'text-white/80' : 'text-white/60'
                            }`}>
                              {algo.category}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(algo.difficulty)} text-white font-medium`}>
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

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Algorithm Overview */}
              <Card className="cosmic-card border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-poppins text-3xl text-white">
                      {currentAlgorithm.name}
                    </CardTitle>
                    {isCompleted && (
                      <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-green-400 text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">{currentAlgorithm.description}</p>
                  <p className="text-neon-blue text-sm mt-2">💡 <strong>Real-world use:</strong> {currentAlgorithm.realWorldUse}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="cosmic-card p-4 border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-5 w-5 text-neon-blue" />
                        <h4 className="font-semibold text-white">Time Complexity</h4>
                      </div>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-mono border border-green-500/30">
                        {currentAlgorithm.timeComplexity}
                      </span>
                    </div>
                    <div className="cosmic-card p-4 border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <Memory className="h-5 w-5 text-neon-purple" />
                        <h4 className="font-semibold text-white">Space Complexity</h4>
                      </div>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-mono border border-blue-500/30">
                        {currentAlgorithm.spaceComplexity}
                      </span>
                    </div>
                    <div className="cosmic-card p-4 border-white/10">
                      <div className="flex items-center space-x-2 mb-2">
                        <Zap className="h-5 w-5 text-algo-pink" />
                        <h4 className="font-semibold text-white">Difficulty</h4>
                      </div>
                      <span className={`px-3 py-1 bg-gradient-to-r ${getDifficultyColor(currentAlgorithm.difficulty)} text-white rounded-full text-sm font-medium`}>
                        {currentAlgorithm.difficulty}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Visualization Area */}
              <Card className="cosmic-card border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-poppins text-xl text-white">Interactive Visualization</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        onClick={handlePlayPause}
                        className="cosmic-button text-white"
                        size="sm"
                      >
                        {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                        {isPlaying ? 'Pause' : 'Play'}
                      </Button>
                      <Button onClick={handleReset} className="glass-morphism text-white hover:bg-white/20 border-white/30" size="sm">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Enhanced Visualization Container */}
                  <div className="h-80 cosmic-card border-white/10 flex items-center justify-center mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cosmic-purple/20 to-algo-blue/20" />
                    
                    {/* Enhanced visualizations for different algorithms */}
                    {(selectedAlgorithm.includes('sort')) && (
                      <div className="flex items-end space-x-3 z-10">
                        {[64, 34, 25, 12, 22, 11, 90, 48].map((value, index) => (
                          <div
                            key={index}
                            className={`w-12 rounded-t-lg transition-all duration-700 flex flex-col items-center justify-end ${
                              index <= currentStep ? 'bg-gradient-to-t from-neon-blue to-neon-purple neon-glow animate-glow-pulse' : 'bg-gradient-to-t from-gray-600 to-gray-400'
                            }`}
                            style={{ height: `${value * 2}px` }}
                          >
                            <div className="text-xs text-white font-bold mb-2 bg-black/50 px-2 py-1 rounded">{value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Enhanced Binary Search Visualization */}
                    {selectedAlgorithm === 'binary-search' && (
                      <div className="flex items-center space-x-3 z-10">
                        {[1, 3, 5, 7, 9, 11, 13, 15, 17, 19].map((value, index) => (
                          <div
                            key={index}
                            className={`w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-700 font-bold ${
                              index === Math.floor(10/2) && currentStep >= 1 ? 'bg-gradient-primary text-white neon-glow animate-glow-pulse transform scale-110' :
                              index <= currentStep ? 'bg-algo-blue/30 text-neon-blue border-2 border-neon-blue/50' :
                              'bg-gray-700/50 text-white/60 border border-gray-500/30'
                            }`}
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 cosmic-card p-4 border-white/20 max-w-md">
                      <p className="text-sm font-medium text-white mb-1">
                        <span className="text-neon-blue">Step {currentStep + 1} of {currentAlgorithm.steps.length}</span>
                      </p>
                      <p className="text-white/80 text-sm">
                        {currentAlgorithm.steps[currentStep]}
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Step-by-step breakdown */}
                  <Tabs defaultValue="steps" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20">
                      <TabsTrigger value="steps" className="text-white data-[state=active]:bg-gradient-primary">Algorithm Steps</TabsTrigger>
                      <TabsTrigger value="code" className="text-white data-[state=active]:bg-gradient-primary">Pseudocode</TabsTrigger>
                    </TabsList>
                    <TabsContent value="steps" className="mt-6">
                      <div className="space-y-4">
                        {currentAlgorithm.steps.map((step, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-xl border-l-4 transition-all duration-300 ${
                              index <= currentStep
                                ? 'border-neon-blue bg-blue-500/10 text-white backdrop-blur-sm'
                                : 'border-gray-500/30 bg-gray-700/20 text-white/60'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                index <= currentStep
                                  ? 'bg-gradient-primary text-white neon-glow'
                                  : 'bg-gray-600 text-gray-300'
                              }`}>
                                {index + 1}
                              </span>
                              <span className="flex-1">{step}</span>
                              {index <= currentStep && (
                                <CheckCircle className="h-5 w-5 text-green-400" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="code" className="mt-6">
                      <div className="code-editor p-6 font-mono text-sm">
                        <pre className="text-green-400 leading-relaxed">
                          {selectedAlgorithm === 'merge-sort' && `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}`}
                          {selectedAlgorithm === 'quick-sort' && `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    
    swap(arr, i + 1, high);
    return i + 1;
}`}
                          {selectedAlgorithm === 'binary-search' && `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;  // Found target
        }
        
        if (arr[mid] < target) {
            left = mid + 1;  // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1;  // Target not found
}`}
                          {selectedAlgorithm === 'bubble-sort' && `function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                swapped = true;
            }
        }
        
        if (!swapped) break; // Array is sorted
    }
    
    return arr;
}`}
                          {selectedAlgorithm === 'insertion-sort' && `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
    
    return arr;
}`}
                          {selectedAlgorithm === 'selection-sort' && `function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            swap(arr, i, minIndex);
        }
    }
    
    return arr;
}`}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-8 flex justify-end">
                    <Button 
                      onClick={handleComplete}
                      className="cosmic-button text-white px-8 py-3 font-semibold group"
                      disabled={!user}
                    >
                      {user ? (
                        <>
                          <CheckCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                          {isCompleted ? 'Completed ✓' : 'Mark as Complete'}
                        </>
                      ) : (
                        'Login to Track Progress'
                      )}
                    </Button>
                  </div>
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
