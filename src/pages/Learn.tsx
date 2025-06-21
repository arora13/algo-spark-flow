
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
      description: 'A divide-and-conquer algorithm that divides the array into halves, sorts them, and merges them back.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      steps: [
        'Divide the array into two halves',
        'Recursively sort both halves',
        'Merge the sorted halves back together',
        'Compare elements and place in order'
      ]
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      category: 'Sorting',
      description: 'A divide-and-conquer algorithm that picks a pivot and partitions the array around it.',
      timeComplexity: 'O(n log n) avg, O(n²) worst',
      spaceComplexity: 'O(log n)',
      steps: [
        'Choose a pivot element',
        'Partition array around pivot',
        'Recursively sort left subarray',
        'Recursively sort right subarray'
      ]
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      category: 'Search',
      description: 'Efficiently find an element in a sorted array by repeatedly dividing the search interval in half.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      steps: [
        'Start with entire sorted array',
        'Compare target with middle element',
        'Eliminate half of the search space',
        'Repeat until element is found'
      ]
    }
  ];

  const currentAlgorithm = algorithms.find(algo => algo.id === selectedAlgorithm) || algorithms[0];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate stepping through algorithm
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= currentAlgorithm.steps.length - 1) {
            setIsPlaying(false);
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleComplete = () => {
    updateProgress('algorithm', selectedAlgorithm);
  };

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
            Interactive Algorithm Learning
          </h1>
          <p className="text-xl text-gray-600">
            Master algorithms through step-by-step visualizations and detailed explanations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Algorithm Selection Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-poppins text-lg">Algorithms</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2">
                  {algorithms.map((algo) => (
                    <button
                      key={algo.id}
                      onClick={() => setSelectedAlgorithm(algo.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                        selectedAlgorithm === algo.id
                          ? 'bg-gradient-primary text-white'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{algo.name}</h3>
                          <p className={`text-sm ${
                            selectedAlgorithm === algo.id ? 'text-white/80' : 'text-gray-500'
                          }`}>
                            {algo.category}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Algorithm Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-poppins text-2xl text-gray-900">
                  {currentAlgorithm.name}
                </CardTitle>
                <p className="text-gray-600">{currentAlgorithm.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Time Complexity</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-mono">
                      {currentAlgorithm.timeComplexity}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Space Complexity</h4>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-mono">
                      {currentAlgorithm.spaceComplexity}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Visualization Area */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-poppins text-xl">Interactive Visualization</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handlePlayPause}
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    <Button onClick={handleReset} variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Visualization Container */}
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-algo-blue/10 to-algo-purple/10"></div>
                  
                  {/* Sample Array Bars for Sorting Algorithms */}
                  {(selectedAlgorithm === 'merge-sort' || selectedAlgorithm === 'quick-sort') && (
                    <div className="flex items-end space-x-2 z-10">
                      {[64, 34, 25, 12, 22, 11, 90].map((value, index) => (
                        <div
                          key={index}
                          className={`w-8 bg-gradient-primary rounded-t transition-all duration-500 ${
                            index <= currentStep ? 'animate-glow' : ''
                          }`}
                          style={{ height: `${value}px` }}
                        >
                          <div className="text-xs text-white text-center mt-1">{value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Binary Search Visualization */}
                  {selectedAlgorithm === 'binary-search' && (
                    <div className="flex items-center space-x-2 z-10">
                      {[1, 3, 5, 7, 9, 11, 13, 15, 17, 19].map((value, index) => (
                        <div
                          key={index}
                          className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-500 ${
                            index === Math.floor(10/2) && currentStep >= 1 ? 'bg-gradient-primary text-white animate-glow' :
                            index <= currentStep ? 'bg-algo-blue/20 text-algo-blue' :
                            'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700">
                      Step {currentStep + 1}: {currentAlgorithm.steps[currentStep]}
                    </p>
                  </div>
                </div>

                {/* Step-by-step breakdown */}
                <Tabs defaultValue="steps" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="steps">Algorithm Steps</TabsTrigger>
                    <TabsTrigger value="code">Pseudocode</TabsTrigger>
                  </TabsList>
                  <TabsContent value="steps" className="mt-4">
                    <div className="space-y-3">
                      {currentAlgorithm.steps.map((step, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border-l-4 transition-all duration-200 ${
                            index <= currentStep
                              ? 'border-algo-blue bg-blue-50/50 text-gray-900'
                              : 'border-gray-200 bg-gray-50/50 text-gray-600'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index <= currentStep
                                ? 'bg-algo-blue text-white'
                                : 'bg-gray-300 text-gray-600'
                            }`}>
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="code" className="mt-4">
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                      <pre className="text-green-400">
                        {selectedAlgorithm === 'merge-sort' && `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}`}
                        {selectedAlgorithm === 'quick-sort' && `function quickSort(arr, low, high) {
  if (low < high) {
    const pi = partition(arr, low, high);
    
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`}
                        {selectedAlgorithm === 'binary-search' && `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}`}
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={handleComplete}
                    className="bg-gradient-primary hover:opacity-90 text-white rounded-full px-6 py-2"
                    disabled={!user}
                  >
                    {user ? 'Mark as Complete' : 'Login to Track Progress'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
