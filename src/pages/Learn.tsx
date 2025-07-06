
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FloatingElements from '@/components/FloatingElements';
import { 
  Play, Pause, RotateCcw, ChevronRight, Clock, HardDrive, Zap, 
  CheckCircle, Brain, BarChart3, Target, Code, BookOpen 
} from 'lucide-react';

const Learn = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('merge-sort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const algorithms = [
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      icon: BarChart3,
      category: 'Sorting',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      description: 'Merge Sort is a divide-and-conquer algorithm that works by recursively breaking down a problem into smaller, more manageable sub-problems. It divides the array into two halves, sorts them separately, and then merges them back together in sorted order.',
      detailedExplanation: 'The beauty of Merge Sort lies in its guaranteed performance. Unlike some other sorting algorithms that can degrade to O(n²) in worst-case scenarios, Merge Sort consistently delivers O(n log n) performance regardless of the input data. This makes it incredibly reliable for production systems where consistent performance is crucial.',
      realWorldUse: 'Used extensively in database systems, external sorting (when data doesn\'t fit in memory), and as the foundation for many hybrid algorithms like Timsort (used in Python\'s sort()).',
      steps: [
        'Divide the array into two equal halves',
        'Recursively sort the left half',
        'Recursively sort the right half', 
        'Merge the two sorted halves back together',
        'Compare elements from both halves and place in correct order'
      ]
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      icon: Zap,
      category: 'Sorting',
      difficulty: 'Medium',
      timeComplexity: 'O(n log n) avg, O(n²) worst',
      spaceComplexity: 'O(log n)',
      description: 'Quick Sort is an efficient, in-place sorting algorithm that uses a divide-and-conquer approach. It works by selecting a \'pivot\' element and partitioning the array so that elements smaller than the pivot come before it, and elements greater come after.',
      detailedExplanation: 'What makes Quick Sort special is its in-place nature and excellent average-case performance. By cleverly choosing pivots and partitioning around them, it can sort data without needing extra memory proportional to the input size. The key insight is that after each partition step, the pivot is in its final sorted position.',
      realWorldUse: 'Default sorting algorithm in many programming languages and libraries due to its excellent cache performance and low memory overhead. Used in C\'s qsort() and many implementations of JavaScript\'s Array.sort().',
      steps: [
        'Choose a pivot element (commonly the last element)',
        'Partition: rearrange array so smaller elements go left, larger go right',
        'Recursively apply Quick Sort to the left subarray',
        'Recursively apply Quick Sort to the right subarray',
        'The array is now sorted (no merge step needed)'
      ]
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      icon: Target,
      category: 'Search',
      difficulty: 'Easy',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      description: 'Binary Search is a highly efficient algorithm for finding a specific value in a sorted array. It works by repeatedly dividing the search interval in half, eliminating half of the remaining elements with each comparison.',
      detailedExplanation: 'The power of Binary Search comes from its logarithmic time complexity. While a linear search might need to check every element (n comparisons), Binary Search can find any element in at most log₂(n) comparisons. For an array of 1 million elements, this means at most 20 comparisons instead of potentially 1 million!',
      realWorldUse: 'Foundation of database indexing, search engines, and countless algorithms. Used in everything from finding entries in phone books to optimizing game AI decision trees.',
      steps: [
        'Start with the entire sorted array',
        'Find the middle element',
        'Compare target with middle element',
        'If equal, found! If target is smaller, search left half; if larger, search right half',
        'Repeat until element is found or search space is empty'
      ]
    },
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      icon: Code,
      category: 'Sorting',
      difficulty: 'Easy',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      description: 'Bubble Sort is one of the simplest sorting algorithms to understand and implement. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they\'re in the wrong order.',
      detailedExplanation: 'While Bubble Sort isn\'t efficient for large datasets, it\'s excellent for learning fundamental sorting concepts. The algorithm gets its name because smaller elements "bubble" to the beginning of the list, just like air bubbles rising to the surface of water. Each pass through the array guarantees that the largest unsorted element reaches its correct position.',
      realWorldUse: 'Primarily used for educational purposes and very small datasets where simplicity is more important than efficiency. Sometimes used as a subroutine in hybrid algorithms.',
      steps: [
        'Start with the first element of the array',
        'Compare each pair of adjacent elements',
        'Swap them if they are in wrong order (left > right)',
        'Continue until the end of array (largest element is now in place)',
        'Repeat for the remaining unsorted portion until no swaps are needed'
      ]
    },
    {
      id: 'insertion-sort',
      name: 'Insertion Sort',
      icon: BookOpen,
      category: 'Sorting',
      difficulty: 'Easy',
      timeComplexity: 'O(n²) worst, O(n) best',
      spaceComplexity: 'O(1)',
      description: 'Insertion Sort builds the final sorted array one element at a time. It\'s similar to how you might sort playing cards in your hands - you pick up cards one by one and insert each into its proper position among the previously sorted cards.',
      detailedExplanation: 'Insertion Sort is remarkably efficient for small datasets and nearly sorted data. Its best-case performance of O(n) occurs when the array is already sorted, making it adaptive. This characteristic makes it valuable as a subroutine in more complex algorithms like Quicksort for small subarrays.',
      realWorldUse: 'Used for small arrays, nearly sorted data, and as a subroutine in hybrid algorithms like Introsort. Also used in online algorithms where data arrives one piece at a time.',
      steps: [
        'Start with the second element (assume first element is sorted)',
        'Compare current element with previous elements in sorted portion',
        'Shift larger elements one position to the right',
        'Insert current element in its correct position',
        'Repeat for all remaining elements'
      ]
    },
    {
      id: 'selection-sort',
      name: 'Selection Sort',
      icon: CheckCircle,
      category: 'Sorting',
      difficulty: 'Easy',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      description: 'Selection Sort works by finding the minimum element from the unsorted portion and placing it at the beginning. It maintains two subarrays: the sorted portion at the beginning and the unsorted portion at the end.',
      detailedExplanation: 'Selection Sort is notable for making the minimum number of swaps - at most n-1 swaps for an array of n elements. This makes it useful when the cost of swapping is very high, such as when sorting large records where only a small key field determines the order.',
      realWorldUse: 'Useful when memory writes are expensive, for sorting small arrays, or when simplicity and predictable behavior are more important than optimal performance.',
      steps: [
        'Find the minimum element in the unsorted portion of array',
        'Swap it with the first element of unsorted portion',
        'Move the boundary between sorted and unsorted portions one position right',
        'Repeat until the entire array is sorted',
        'Each iteration places one more element in its final position'
      ]
    }
  ];

  const currentAlgorithm = algorithms.find(algo => algo.id === selectedAlgorithm) || algorithms[0];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentStep < currentAlgorithm.steps.length - 1) {
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'from-emerald-400 to-emerald-600';
      case 'Medium': return 'from-amber-400 to-orange-500';
      case 'Hard': return 'from-red-400 to-red-600';
      default: return 'from-slate-400 to-slate-600';
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
              Interactive <span className="bg-gradient-primary bg-clip-text text-transparent">Algorithm Learning</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Master algorithms through step-by-step visualizations and comprehensive explanations 
              designed specifically for AP Computer Science students.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Algorithm Sidebar */}
            <div className="lg:col-span-3">
              <Card className="glass-panel border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="font-dm-sans text-xl text-slate-900 flex items-center">
                    <Brain className="mr-3 h-6 w-6 text-primary" />
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
                            setIsPlaying(false);
                          }}
                          className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                            isSelected
                              ? 'bg-gradient-primary text-white shadow-lg scale-105'
                              : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <algo.icon className={`h-5 w-5 ${isSelected ? 'text-white' : 'text-primary'}`} />
                              <h3 className="font-semibold">{algo.name}</h3>
                            </div>
                            <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? 'rotate-90 text-white' : 'group-hover:translate-x-1 text-slate-400'}`} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                              {algo.category}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              isSelected 
                                ? 'bg-white/20 text-white' 
                                : `bg-gradient-to-r ${getDifficultyColor(algo.difficulty)} text-white`
                            }`}>
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
            <div className="lg:col-span-9 space-y-8">
              {/* Algorithm Overview */}
              <Card className="glass-panel border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <currentAlgorithm.icon className="h-6 w-6 text-white" />
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
                        <strong className="text-blue-700">Deep Dive:</strong> {currentAlgorithm.detailedExplanation}
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-slate-700 text-sm">
                        <strong className="text-green-700">Real-World Applications:</strong> {currentAlgorithm.realWorldUse}
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
                      <span className={`px-3 py-1 bg-gradient-to-r ${getDifficultyColor(currentAlgorithm.difficulty)} text-white rounded-full text-sm font-medium`}>
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
                    <CardTitle className="font-dm-sans text-xl text-slate-900">Step-by-Step Visualization</CardTitle>
                    <div className="flex space-x-3">
                      <Button
                        onClick={handlePlayPause}
                        className="btn-primary"
                        size="sm"
                      >
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
                  {/* Visualization Area */}
                  <div className="h-80 glass-panel rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
                    <div className="bg-pattern" />
                    
                    {/* Algorithm Visualization */}
                    {selectedAlgorithm.includes('sort') && (
                      <div className="flex items-end space-x-3 z-10">
                        {[64, 34, 25, 12, 22, 11, 90, 48].map((value, index) => (
                          <div
                            key={index}
                            className={`w-12 rounded-t-lg transition-all duration-700 flex flex-col items-center justify-end ${
                              index <= currentStep 
                                ? 'bg-gradient-primary shadow-lg transform scale-110' 
                                : 'bg-gradient-to-t from-slate-400 to-slate-300'
                            }`}
                            style={{ height: `${value * 2}px` }}
                          >
                            <div className="text-xs text-white font-bold mb-2 bg-slate-900/70 px-2 py-1 rounded">
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedAlgorithm === 'binary-search' && (
                      <div className="flex items-center space-x-3 z-10">
                        {[1, 3, 5, 7, 9, 11, 13, 15, 17, 19].map((value, index) => (
                          <div
                            key={index}
                            className={`w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-700 font-bold ${
                              index === Math.floor(10/2) && currentStep >= 1 
                                ? 'bg-gradient-primary text-white shadow-lg transform scale-110' :
                              index <= currentStep 
                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' :
                                'bg-slate-100 text-slate-500 border border-slate-300'
                            }`}
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 glass-panel p-4 rounded-xl max-w-md">
                      <p className="text-sm font-medium text-slate-900 mb-1">
                        <span className="text-primary">Step {currentStep + 1} of {currentAlgorithm.steps.length}</span>
                      </p>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {currentAlgorithm.steps[currentStep]}
                      </p>
                    </div>
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="steps" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 glass-panel">
                      <TabsTrigger value="steps" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
                        Step-by-Step
                      </TabsTrigger>
                      <TabsTrigger value="pseudocode" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white">
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
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                index <= currentStep
                                  ? 'bg-gradient-primary text-white'
                                  : 'bg-slate-400 text-white'
                              }`}>
                                {index + 1}
                              </span>
                              <span className="flex-1">{step}</span>
                              {index <= currentStep && (
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                              )}
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
    Create temporary arrays for left and right subarrays
    Copy data to temporary arrays
    
    WHILE both temporary arrays have elements:
        IF left_element <= right_element:
            Place left_element in main array
        ELSE:
            Place right_element in main array
    
    Copy remaining elements from both temporary arrays`}
                          
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
            SWAP array[i] and array[j]
    
    SWAP array[i + 1] and array[high]
    RETURN i + 1`}
                          
                          {selectedAlgorithm === 'binary-search' && `BINARY_SEARCH(array, target):
    left = 0
    right = length of array - 1
    
    WHILE left <= right:
        middle = (left + right) / 2
        
        IF array[middle] = target:
            RETURN middle
        ELSE IF array[middle] < target:
            left = middle + 1
        ELSE:
            right = middle - 1
    
    RETURN -1 (not found)`}
                          
                          {selectedAlgorithm === 'bubble-sort' && `BUBBLE_SORT(array):
    n = length of array
    
    FOR i = 0 TO n - 2:
        swapped = false
        
        FOR j = 0 TO n - 2 - i:
            IF array[j] > array[j + 1]:
                SWAP array[j] and array[j + 1]
                swapped = true
        
        IF swapped = false:
            BREAK (array is sorted)`}
                          
                          {selectedAlgorithm === 'insertion-sort' && `INSERTION_SORT(array):
    FOR i = 1 TO length of array - 1:
        key = array[i]
        j = i - 1
        
        WHILE j >= 0 AND array[j] > key:
            array[j + 1] = array[j]
            j = j - 1
        
        array[j + 1] = key`}
                          
                          {selectedAlgorithm === 'selection-sort' && `SELECTION_SORT(array):
    n = length of array
    
    FOR i = 0 TO n - 2:
        min_index = i
        
        FOR j = i + 1 TO n - 1:
            IF array[j] < array[min_index]:
                min_index = j
        
        IF min_index ≠ i:
            SWAP array[i] and array[min_index]`}
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
