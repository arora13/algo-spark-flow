// Problem test specifications and function names per problem id
// Keep cases simple but meaningful; extendable later

export const problemSpecs: Record<string, { functionName: string; tests: { input: any[]; expected: any }[] }> = {
  // Merge Sort group
  'merge-intervals': {
    functionName: 'merge',
    tests: [
      { input: [[[1,3],[2,6],[8,10],[15,18]]], expected: [[1,6],[8,10],[15,18]] },
      { input: [[[1,4],[4,5]]], expected: [[1,5]] },
    ],
  },
  'sort-list': {
    functionName: 'sortList',
    tests: [
      // For simplicity, use arrays to represent lists; expect sorted array
      { input: [[4,2,1,3]], expected: [1,2,3,4] },
      { input: [[-1,5,3,4,0]], expected: [-1,0,3,4,5] },
    ],
  },
  'count-inversions': {
    functionName: 'countInversions',
    tests: [
      { input: [[2,3,8,6,1]], expected: 5 },
      { input: [[1,20,6,4,5]], expected: 5 },
    ],
  },

  // Quick Sort group
  'kth-largest': {
    functionName: 'findKthLargest',
    tests: [
      { input: [[3,2,1,5,6,4], 2], expected: 5 },
      { input: [[3,2,3,1,2,4,5,5,6], 4], expected: 4 },
    ],
  },
  'sort-colors': {
    functionName: 'sortColors',
    tests: [
      { input: [[2,0,2,1,1,0]], expected: [0,0,1,1,2,2] },
      { input: [[0,1,2,2,1,0]], expected: [0,0,1,1,2,2] },
    ],
  },
  'partition-labels': {
    functionName: 'partitionLabels',
    tests: [
      { input: ["ababcbacadefegdehijhklij"], expected: [9,7,8] },
      { input: ["eccbbbbdec"], expected: [10] },
    ],
  },

  // Binary Search group
  'search-insert': {
    functionName: 'searchInsert',
    tests: [
      { input: [[1,3,5,6], 5], expected: 2 },
      { input: [[1,3,5,6], 2], expected: 1 },
      { input: [[1,3,5,6], 7], expected: 4 },
    ],
  },
  'find-peak': {
    functionName: 'findPeakElement',
    tests: [
      { input: [[1,2,3,1]], expected: 2 },
      { input: [[1,2,1,3,5,6,4]], expected: 5 },
    ],
  },
  'search-rotated': {
    functionName: 'search',
    tests: [
      { input: [[4,5,6,7,0,1,2], 0], expected: 4 },
      { input: [[6,7,0,1,2,4,5], 3], expected: -1 },
    ],
  },

  // Sorting Fundamentals group
  'bubble-sort-implementation': {
    functionName: 'bubbleSort',
    tests: [
      { input: [[64,34,25,12,22,11,90]], expected: [11,12,22,25,34,64,90] },
      { input: [[3,2,1]], expected: [1,2,3] },
    ],
  },
  'insertion-sort-implementation': {
    functionName: 'insertionSort',
    tests: [
      { input: [[5,2,4,6,1,3]], expected: [1,2,3,4,5,6] },
      { input: [[1,2,3]], expected: [1,2,3] },
    ],
  },
  'selection-sort-implementation': {
    functionName: 'selectionSort',
    tests: [
      { input: [[29,10,14,37,13]], expected: [10,13,14,29,37] },
      { input: [[3,1,2]], expected: [1,2,3] },
    ],
  },
  'sort-comparison': {
    functionName: 'compareSortingAlgorithms',
    tests: [
      // Simple sanity: return an object with keys for algorithms
      { input: [[3,1,4,1,5], ["bubble","insertion","selection"]], expected: { bubble: {}, insertion: {}, selection: {} } },
    ],
  },
};
