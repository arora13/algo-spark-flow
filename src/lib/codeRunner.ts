// Code runner for Vivan's algorithm problems
// This simulates the functionality of Vivan's CLI tool in the browser

interface TestResult {
  passed: boolean;
  input: any;
  expected: any;
  actual: any;
  error?: string;
}

type Language = 'python' | 'javascript' | 'java' | 'cpp';

interface ProblemTest {
  input: any;
  output: any;
  explanation?: string;
}

// Test cases for each problem type
const problemTests: Record<string, Record<number, ProblemTest[]>> = {
  bubble_sort: {
    1: [ // Bubble Sort Basic Algorithm
      { input: [6, 3, 2, 5, 9], output: [2, 3, 5, 6, 9] },
      { input: [75, 89, 35, 12, 9, 100], output: [9, 12, 35, 75, 89, 100] }
    ],
    2: [ // Count swaps in Bubble Sort
      { input: [6, 3, 2, 5, 9], output: 4 },
      { input: [75, 89, 35, 12, 9, 100], output: 9 }
    ],
    3: [ // Bubble Sort Strings
      { input: ["banana", "apple", "cherry"], output: ["apple", "banana", "cherry"] },
      { input: ["dog", "zebra", "cat", "ant", "hippo"], output: ["ant", "cat", "dog", "hippo", "zebra"] }
    ],
    4: [ // Bubble Sort Iteration Counter
      { input: [6, 3, 2, 5, 9], output: 3 },
      { input: [75, 89, 35, 12, 9, 100], output: 5 }
    ],
    5: [ // Custom Bubble Sort
      { input: [4, 3, 2, 1, 9], output: [3, 1, 4, 2, 9] },
      { input: [68, 11, 46, 35, 28, 51], output: [11, 35, 28, 46, 51, 68] }
    ]
  },
  merge_sort: {
    1: [ // Merge Two Sorted Arrays
      { input: [[1, 3, 5], [2, 4, 6]], output: [1, 2, 3, 4, 5, 6] },
      { input: [[10, 20], [5, 15, 25]], output: [5, 10, 15, 20, 25] }
    ],
    2: [ // Recursive Maximum of an Array
      { input: [3, 1, 7, 4], output: 7 },
      { input: [10, 2, 5, 8, 6], output: 10 }
    ],
    3: [ // Merge Sort Basic Algorithm
      { input: [8, 3, 1, 7, 0, 10, 2], output: [0, 1, 2, 3, 7, 8, 10] },
      { input: [15, 9, 27, 6, 12], output: [6, 9, 12, 15, 27] }
    ],
    4: [ // Count Inversions using Merge Sort
      { input: [2, 4, 1, 3, 5], output: 3 },
      { input: [5, 4, 3, 2, 1], output: 10 }
    ],
    5: [ // Counting Reverse Pairs
      { input: [1, 3, 2, 3, 1], output: 2 },
      { input: [2, 4, 3, 5, 1], output: 3 }
    ]
  },
  selection_sort: {
    1: [ // Find the Minimum Index
      { input: [5, 2, 9, 1, 5, 6], output: 3 },
      { input: [10, 7, 8, 3, 2, 1], output: 5 }
    ],
    2: [ // Selection Sort Basic Algorithm
      { input: [5, 2, 9, 1, 5, 6], output: [1, 2, 5, 5, 6, 9] },
      { input: [10, 7, 8, 3, 2, 1], output: [1, 2, 3, 7, 8, 10] }
    ],
    3: [ // Custom Selection Sort Comparison
      { input: [5, 2, 9, 1, 4, 6], output: [2, 4, 6, 1, 5, 9] },
      { input: [10, 7, 8, 3, 2, 1], output: [2, 8, 10, 1, 3, 7] }
    ],
    4: [ // Selection Sort Students by Score
      { 
        input: [
          {"name": "Alice", "score": 85},
          {"name": "Bob", "score": 92},
          {"name": "Charlie", "score": 85}
        ], 
        output: [
          {"name": "Bob", "score": 92},
          {"name": "Alice", "score": 85},
          {"name": "Charlie", "score": 85}
        ]
      }
    ]
  }
};

// Function to check if code uses forbidden functions
function usesForbiddenCalls(code: string, language: Language): boolean {
  const forbiddenByLanguage = {
    python: ['sorted(', '.sort(', 'max(', 'min('],
    javascript: ['.sort(', 'Math.max(', 'Math.min('],
    java: ['Arrays.sort(', 'Collections.sort(', 'Math.max(', 'Math.min('],
    cpp: ['sort(', 'max(', 'min(']
  };
  
  const forbidden = forbiddenByLanguage[language] || forbiddenByLanguage.python;
  return forbidden.some(func => code.includes(func));
}

// Function to run code in different languages
function runCode(code: string, testCases: ProblemTest[], language: Language): TestResult[] {
  const results: TestResult[] = [];
  
  try {
    // Check for forbidden calls
    if (usesForbiddenCalls(code, language)) {
      const forbiddenMessages = {
        python: 'Forbidden function used (sorted(), .sort(), max(), min()). You must implement manually.',
        javascript: 'Forbidden function used (.sort(), Math.max(), Math.min()). You must implement manually.',
        java: 'Forbidden function used (Arrays.sort(), Collections.sort(), Math.max(), Math.min()). You must implement manually.',
        cpp: 'Forbidden function used (sort(), max(), min()). You must implement manually.'
      };
      
      return [{
        passed: false,
        input: 'N/A',
        expected: 'N/A',
        actual: 'N/A',
        error: forbiddenMessages[language]
      }];
    }

    // Create a safe execution environment based on language
    let func: Function;
    
    if (language === 'javascript') {
      // For JavaScript, we can execute directly
      func = new Function('arr', code + '\nreturn bubbleSort ? bubbleSort : mergeSort ? mergeSort : selectionSort ? selectionSort : null;');
    } else {
      // For other languages, we'll simulate Python-like execution
      func = new Function('arr', code + '\nreturn bubble_sort ? bubble_sort : merge_sort ? merge_sort : selection_sort ? selection_sort : null;');
    }
    
    for (const testCase of testCases) {
      try {
        const result = func(testCase.input);
        
        // Deep comparison for arrays and objects
        const passed = JSON.stringify(result) === JSON.stringify(testCase.output);
        
        results.push({
          passed,
          input: testCase.input,
          expected: testCase.output,
          actual: result
        });
      } catch (error) {
        results.push({
          passed: false,
          input: testCase.input,
          expected: testCase.output,
          actual: 'Error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  } catch (error) {
    results.push({
      passed: false,
      input: 'N/A',
      expected: 'N/A',
      actual: 'N/A',
      error: error instanceof Error ? error.message : 'Code execution failed'
    });
  }
  
  return results;
}

// Main function to test a solution
export function testSolution(
  algorithmType: string, 
  problemId: number, 
  userCode: string,
  language: Language = 'python'
): TestResult[] {
  const tests = problemTests[algorithmType]?.[problemId];
  
  if (!tests) {
    return [{
      passed: false,
      input: 'N/A',
      expected: 'N/A',
      actual: 'N/A',
      error: 'No test cases found for this problem'
    }];
  }
  
  return runCode(userCode, tests, language);
}

// Function to get problem template
export function getProblemTemplate(algorithmType: string, problemId: number, language: Language = 'python'): string {
  const templates: Record<Language, Record<string, Record<number, string>>> = {
    python: {
      bubble_sort: {
        1: `def bubble_sort(arr):
    # Implement bubble sort algorithm
    # Return the sorted array
    pass`,
        2: `def bubble_sort(arr):
    # Implement bubble sort and count swaps
    # Return the number of swaps
    pass`,
        3: `def bubble_sort(arr):
    # Implement bubble sort for strings
    # Return the sorted array
    pass`,
        4: `def bubble_sort(arr):
    # Implement bubble sort and count iterations
    # Return the number of iterations
    pass`,
        5: `def bubble_sort(arr):
    # Implement custom bubble sort with even/odd constraint
    # Return the partially sorted array
    pass`
      },
      merge_sort: {
        1: `def merge_sort(arr1, arr2):
    # Merge two sorted arrays
    # Return the merged sorted array
    pass`,
        2: `def find_max(arr):
    # Find maximum using recursion
    # Return the maximum value
    pass`,
        3: `def merge_sort(arr):
    # Implement merge sort algorithm
    # Return the sorted array
    pass`,
        4: `def count_inversions(arr):
    # Count inversions using merge sort concept
    # Return the number of inversions
    pass`,
        5: `def count_reverse_pairs(arr):
    # Count reverse pairs using merge sort
    # Return the number of reverse pairs
    pass`
      },
      selection_sort: {
        1: `def find_min_index(arr):
    # Find the index of minimum element
    # Return the index
    pass`,
        2: `def selection_sort(arr):
    # Implement selection sort algorithm
    # Return the sorted array
    pass`,
        3: `def selection_sort(arr):
    # Implement custom selection sort (even before odd)
    # Return the sorted array
    pass`,
        4: `def selection_sort(students):
    # Sort students by score in descending order
    # Return the sorted array
    pass`
      }
    },
    javascript: {
      bubble_sort: {
        1: `function bubbleSort(arr) {
    // Implement bubble sort algorithm
    // Return the sorted array
    return arr;
}`,
        2: `function bubbleSort(arr) {
    // Implement bubble sort and count swaps
    // Return the number of swaps
    return 0;
}`,
        3: `function bubbleSort(arr) {
    // Implement bubble sort for strings
    // Return the sorted array
    return arr;
}`,
        4: `function bubbleSort(arr) {
    // Implement bubble sort and count iterations
    // Return the number of iterations
    return 0;
}`,
        5: `function bubbleSort(arr) {
    // Implement custom bubble sort with even/odd constraint
    // Return the partially sorted array
    return arr;
}`
      },
      merge_sort: {
        1: `function mergeSort(arr1, arr2) {
    // Merge two sorted arrays
    // Return the merged sorted array
    return [];
}`,
        2: `function findMax(arr) {
    // Find maximum using recursion
    // Return the maximum value
    return 0;
}`,
        3: `function mergeSort(arr) {
    // Implement merge sort algorithm
    // Return the sorted array
    return arr;
}`,
        4: `function countInversions(arr) {
    // Count inversions using merge sort concept
    // Return the number of inversions
    return 0;
}`,
        5: `function countReversePairs(arr) {
    // Count reverse pairs using merge sort
    // Return the number of reverse pairs
    return 0;
}`
      },
      selection_sort: {
        1: `function findMinIndex(arr) {
    // Find the index of minimum element
    // Return the index
    return 0;
}`,
        2: `function selectionSort(arr) {
    // Implement selection sort algorithm
    // Return the sorted array
    return arr;
}`,
        3: `function selectionSort(arr) {
    // Implement custom selection sort (even before odd)
    // Return the sorted array
    return arr;
}`,
        4: `function selectionSort(students) {
    // Sort students by score in descending order
    // Return the sorted array
    return students;
}`
      }
    },
    java: {
      bubble_sort: {
        1: `public class Solution {
    public int[] bubbleSort(int[] arr) {
        // Implement bubble sort algorithm
        // Return the sorted array
        return arr;
    }
}`,
        2: `public class Solution {
    public int bubbleSort(int[] arr) {
        // Implement bubble sort and count swaps
        // Return the number of swaps
        return 0;
    }
}`,
        3: `public class Solution {
    public String[] bubbleSort(String[] arr) {
        // Implement bubble sort for strings
        // Return the sorted array
        return arr;
    }
}`,
        4: `public class Solution {
    public int bubbleSort(int[] arr) {
        // Implement bubble sort and count iterations
        // Return the number of iterations
        return 0;
    }
}`,
        5: `public class Solution {
    public int[] bubbleSort(int[] arr) {
        // Implement custom bubble sort with even/odd constraint
        // Return the partially sorted array
        return arr;
    }
}`
      },
      merge_sort: {
        1: `public class Solution {
    public int[] mergeSort(int[] arr1, int[] arr2) {
        // Merge two sorted arrays
        // Return the merged sorted array
        return new int[0];
    }
}`,
        2: `public class Solution {
    public int findMax(int[] arr) {
        // Find maximum using recursion
        // Return the maximum value
        return 0;
    }
}`,
        3: `public class Solution {
    public int[] mergeSort(int[] arr) {
        // Implement merge sort algorithm
        // Return the sorted array
        return arr;
    }
}`,
        4: `public class Solution {
    public int countInversions(int[] arr) {
        // Count inversions using merge sort concept
        // Return the number of inversions
        return 0;
    }
}`,
        5: `public class Solution {
    public int countReversePairs(int[] arr) {
        // Count reverse pairs using merge sort
        // Return the number of reverse pairs
        return 0;
    }
}`
      },
      selection_sort: {
        1: `public class Solution {
    public int findMinIndex(int[] arr) {
        // Find the index of minimum element
        // Return the index
        return 0;
    }
}`,
        2: `public class Solution {
    public int[] selectionSort(int[] arr) {
        // Implement selection sort algorithm
        // Return the sorted array
        return arr;
    }
}`,
        3: `public class Solution {
    public int[] selectionSort(int[] arr) {
        // Implement custom selection sort (even before odd)
        // Return the sorted array
        return arr;
    }
}`,
        4: `public class Solution {
    public Student[] selectionSort(Student[] students) {
        // Sort students by score in descending order
        // Return the sorted array
        return students;
    }
}`
      }
    },
    cpp: {
      bubble_sort: {
        1: `#include <vector>
using namespace std;

vector<int> bubbleSort(vector<int> arr) {
    // Implement bubble sort algorithm
    // Return the sorted array
    return arr;
}`,
        2: `#include <vector>
using namespace std;

int bubbleSort(vector<int> arr) {
    // Implement bubble sort and count swaps
    // Return the number of swaps
    return 0;
}`,
        3: `#include <vector>
#include <string>
using namespace std;

vector<string> bubbleSort(vector<string> arr) {
    // Implement bubble sort for strings
    // Return the sorted array
    return arr;
}`,
        4: `#include <vector>
using namespace std;

int bubbleSort(vector<int> arr) {
    // Implement bubble sort and count iterations
    // Return the number of iterations
    return 0;
}`,
        5: `#include <vector>
using namespace std;

vector<int> bubbleSort(vector<int> arr) {
    // Implement custom bubble sort with even/odd constraint
    // Return the partially sorted array
    return arr;
}`
      },
      merge_sort: {
        1: `#include <vector>
using namespace std;

vector<int> mergeSort(vector<int> arr1, vector<int> arr2) {
    // Merge two sorted arrays
    // Return the merged sorted array
    return {};
}`,
        2: `#include <vector>
using namespace std;

int findMax(vector<int> arr) {
    // Find maximum using recursion
    // Return the maximum value
    return 0;
}`,
        3: `#include <vector>
using namespace std;

vector<int> mergeSort(vector<int> arr) {
    // Implement merge sort algorithm
    // Return the sorted array
    return arr;
}`,
        4: `#include <vector>
using namespace std;

int countInversions(vector<int> arr) {
    // Count inversions using merge sort concept
    // Return the number of inversions
    return 0;
}`,
        5: `#include <vector>
using namespace std;

int countReversePairs(vector<int> arr) {
    // Count reverse pairs using merge sort
    // Return the number of reverse pairs
    return 0;
}`
      },
      selection_sort: {
        1: `#include <vector>
using namespace std;

int findMinIndex(vector<int> arr) {
    // Find the index of minimum element
    // Return the index
    return 0;
}`,
        2: `#include <vector>
using namespace std;

vector<int> selectionSort(vector<int> arr) {
    // Implement selection sort algorithm
    // Return the sorted array
    return arr;
}`,
        3: `#include <vector>
using namespace std;

vector<int> selectionSort(vector<int> arr) {
    // Implement custom selection sort (even before odd)
    // Return the sorted array
    return arr;
}`,
        4: `#include <vector>
using namespace std;

vector<Student> selectionSort(vector<Student> students) {
    // Sort students by score in descending order
    // Return the sorted array
    return students;
}`
      }
    }
  };
  
  return templates[language]?.[algorithmType]?.[problemId] || 
         `// Write your solution here
function ${algorithmType.replace('_', '_')}(arr) {
    return arr;
}`;
}
