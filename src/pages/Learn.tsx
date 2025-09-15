import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, Clock, HardDrive, Zap, CheckCircle, Timer, Coffee, Brain, BookOpen, HelpCircle, Code, Database, Network, Shield } from 'lucide-react';
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
    apTags: ['AP CSA', 'AP CSP'],
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
    apTags: ['AP CSA', 'AP CSP'],
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
    apTags: ['AP CSA', 'AP CSP'],
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
    emoji: '🫧',
    category: 'Sorting',
    difficulty: 'Easy',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    apTags: ['AP CSA', 'AP CSP'],
    description:
      'Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    detailedExplanation:
      'Bubble Sort gets its name because smaller elements "bubble" to the top of the list like bubbles in water. While not efficient for large datasets, it\'s excellent for learning sorting concepts.',
    realWorldUse:
      'Used in educational contexts and for sorting small datasets where simplicity is more important than efficiency.',
    steps: [
      'Compare adjacent elements in the array',
      'Swap if they are in wrong order',
      'Continue until no more swaps needed',
      'Largest element "bubbles" to the end',
      'Repeat for remaining elements',
    ],
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    emoji: '📝',
    category: 'Sorting',
    difficulty: 'Easy',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    apTags: ['AP CSA', 'AP CSP'],
    description:
      'Insertion Sort builds the final sorted array one item at a time, taking each element and inserting it into its correct position in the already sorted portion.',
    detailedExplanation:
      'Like sorting a hand of cards, you pick up one card at a time and insert it into the correct position among the cards you\'ve already sorted.',
    realWorldUse:
      'Used in hybrid sorting algorithms like Timsort and for sorting small datasets. Also used in online algorithms where data arrives one element at a time.',
    steps: [
      'Start with the first element (already sorted)',
      'Pick the next element',
      'Compare with elements in sorted portion',
      'Insert in correct position',
      'Repeat until all elements sorted',
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
    apTags: ['AP CSA', 'AP CSP'],
    description:
      'Selection Sort repeatedly finds the minimum element from the unsorted portion and moves it to the beginning of the sorted portion.',
    detailedExplanation:
      'Selection Sort maintains two subarrays: one sorted and one unsorted. It repeatedly selects the smallest element from the unsorted subarray and moves it to the end of the sorted subarray.',
    realWorldUse:
      'Used when memory writes are costly, as it makes the minimum number of swaps. Also used in educational contexts to teach sorting concepts.',
    steps: [
      'Find minimum element in unsorted array',
      'Swap with first element of unsorted array',
      'Move boundary of sorted array one position right',
      'Repeat until entire array is sorted',
      'Each iteration places one element in final position',
    ],
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    emoji: '🔍',
    category: 'Search',
    difficulty: 'Easy',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    apTags: ['AP CSA', 'AP CSP'],
    description:
      'Linear Search checks each element in the array sequentially until the target element is found or the end of the array is reached.',
    detailedExplanation:
      'Linear Search is the simplest search algorithm. It works on both sorted and unsorted arrays, making it very versatile.',
    realWorldUse:
      'Used when data is unsorted, for small datasets, or when you need to find all occurrences of a value.',
    steps: [
      'Start from the first element',
      'Compare with target element',
      'If match found, return position',
      'If not, move to next element',
      'Repeat until found or end of array',
    ],
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers Technique',
    emoji: '👆👆',
    category: 'Algorithm Pattern',
    difficulty: 'Medium',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    apTags: ['AP CSA', 'AP CSP'],
    description:
      'Two Pointers is a technique where you use two pointers to traverse an array or list, often from opposite ends or at different speeds.',
    detailedExplanation:
      'This technique is particularly useful for problems involving sorted arrays, palindromes, or finding pairs that meet certain criteria.',
    realWorldUse:
      'Used in problems like finding pairs that sum to a target, checking palindromes, removing duplicates, and many array manipulation problems.',
    steps: [
      'Initialize two pointers (usually start and end)',
      'Move pointers based on problem conditions',
      'Process elements at pointer positions',
      'Continue until pointers meet or condition satisfied',
      'Return result based on pointer positions',
    ],
  },
];

// AP CSP Topics - Comprehensive Curriculum
const apCspTopics = [
  {
    id: 'creative-development',
    name: 'Creative Development',
    emoji: '🎨',
    category: 'Big Idea 1',
    difficulty: 'Easy',
    examWeight: '10-13%',
    description: 'How programs are designed and developed through collaboration, iteration, and user-centered design principles.',
    detailedExplanation: 'Creative development emphasizes the human aspect of programming - how developers work together, iterate on designs, and create user-friendly interfaces. This includes understanding the development process, importance of collaboration, and designing effective user interfaces.',
    realWorldUse: 'Used in all software development teams, from startups to large tech companies, to create user-friendly applications and systems.',
    keyConcepts: [
      'Program design and development process',
      'Collaboration in software development',
      'Iterative development and testing',
      'User interface design principles',
      'Error correction and debugging',
      'Documentation and code comments',
      'Version control and collaboration tools'
    ],
    examples: [
      'Designing a mobile app interface',
      'Collaborative coding on GitHub',
      'User testing and feedback loops',
      'Agile development methodologies',
      'Creating accessible web applications',
      'Design thinking in software development'
    ],
    studyTips: [
      'Practice pair programming with classmates',
      'Learn about user experience (UX) design principles',
      'Understand the software development lifecycle',
      'Practice writing clear, commented code'
    ],
    practiceProblems: [
      'Design a user interface for a school management system',
      'Create a collaborative coding project with version control',
      'Develop a mobile app prototype with user feedback'
    ]
  },
  {
    id: 'data',
    name: 'Data',
    emoji: '📊',
    category: 'Big Idea 2',
    difficulty: 'Medium',
    examWeight: '17-22%',
    description: 'How data are represented, collected, analyzed, and used to extract meaningful information and insights.',
    detailedExplanation: 'Data is the foundation of modern computing. This topic covers how computers represent different types of data (numbers, text, images, sound), how data is collected and stored, and how we can analyze data to gain insights and make decisions.',
    realWorldUse: 'Essential for data science, business analytics, scientific research, and any field that relies on data-driven decision making.',
    keyConcepts: [
      'Binary representation of data',
      'ASCII and Unicode text encoding',
      'Image representation (pixels, RGB, compression)',
      'Sound representation (sampling, digital audio)',
      'Data collection and storage methods',
      'Data analysis and visualization',
      'Data compression techniques',
      'Metadata and data organization'
    ],
    examples: [
      'Converting decimal numbers to binary',
      'Understanding how digital cameras work',
      'MP3 audio compression algorithms',
      'Social media data analysis',
      'Scientific data visualization',
      'Database design and management'
    ],
    studyTips: [
      'Practice binary and hexadecimal conversions',
      'Learn about different file formats and their uses',
      'Understand data compression principles',
      'Practice with data visualization tools'
    ],
    practiceProblems: [
      'Convert between different number systems',
      'Analyze a dataset and create visualizations',
      'Design a data collection system for a research project'
    ]
  },
  {
    id: 'algorithms-programming',
    name: 'Algorithms & Programming',
    emoji: '⚙️',
    category: 'Big Idea 3',
    difficulty: 'Medium',
    examWeight: '30-35%',
    description: 'Writing algorithms, using abstraction, and implementing programming constructs to solve computational problems.',
    detailedExplanation: 'This is the core of computer science - learning to think algorithmically and translate that thinking into working programs. It covers algorithm design, abstraction techniques, and fundamental programming constructs.',
    realWorldUse: 'Used in all software development, from simple scripts to complex applications, and in problem-solving across all industries.',
    keyConcepts: [
      'Algorithm design and analysis',
      'Abstraction and modularity',
      'Programming constructs (variables, conditionals, loops)',
      'Lists and data structures',
      'Function and procedure design',
      'Algorithm efficiency and optimization',
      'Simulation and modeling',
      'Testing and debugging strategies'
    ],
    examples: [
      'Designing a search algorithm',
      'Creating a sorting program',
      'Building a simulation model',
      'Implementing a game logic',
      'Developing a data processing pipeline',
      'Creating reusable code modules'
    ],
    studyTips: [
      'Practice breaking down complex problems into steps',
      'Learn multiple programming languages',
      'Understand algorithm efficiency (Big O notation)',
      'Practice writing and testing algorithms'
    ],
    practiceProblems: [
      'Design an algorithm to find the shortest path',
      'Create a program to analyze text data',
      'Build a simulation of a real-world system'
    ]
  },
  {
    id: 'computer-systems',
    name: 'Computer Systems & Networks',
    emoji: '🖥️',
    category: 'Big Idea 4',
    difficulty: 'Medium',
    examWeight: '11-15%',
    description: 'How computer systems work, including hardware, software, networks, and distributed computing.',
    detailedExplanation: 'Understanding the underlying systems that make computing possible - from individual computers to vast networks. This includes hardware components, operating systems, network protocols, and distributed systems.',
    realWorldUse: 'Essential for system administration, network engineering, cybersecurity, and understanding how modern technology infrastructure works.',
    keyConcepts: [
      'Computer hardware components (CPU, memory, storage)',
      'Operating systems and system software',
      'Internet protocols (TCP/IP, HTTP, HTTPS)',
      'Network architecture and routing',
      'Parallel and distributed computing',
      'Fault tolerance and reliability',
      'Cybersecurity fundamentals',
      'Cloud computing concepts'
    ],
    examples: [
      'How web pages are delivered to browsers',
      'Email delivery across the internet',
      'Distributed computing in cloud services',
      'Network security and encryption',
      'Operating system process management',
      'Database server architecture'
    ],
    studyTips: [
      'Learn about computer hardware components',
      'Understand network protocols and how they work',
      'Study cybersecurity best practices',
      'Explore cloud computing platforms'
    ],
    practiceProblems: [
      'Design a network topology for a school',
      'Analyze the performance of a distributed system',
      'Create a security plan for a web application'
    ]
  },
  {
    id: 'impact-computing',
    name: 'Impact of Computing',
    emoji: '🌍',
    category: 'Big Idea 5',
    difficulty: 'Easy',
    examWeight: '21-26%',
    description: 'The societal, cultural, economic, and ethical effects of computing innovations on individuals and society.',
    detailedExplanation: 'Computing has transformed every aspect of modern life. This topic examines both the positive and negative impacts of technology, including ethical considerations, privacy concerns, and the digital divide.',
    realWorldUse: 'Important for making informed decisions about technology use, understanding policy implications, and considering ethical aspects of computing careers.',
    keyConcepts: [
      'Societal and cultural impacts of computing',
      'Economic effects of digital transformation',
      'Ethical issues in computing',
      'Computing bias and fairness',
      'Digital divide and access issues',
      'Privacy and data protection',
      'Intellectual property and copyright',
      'Environmental impact of computing',
      'Legal and policy considerations'
    ],
    examples: [
      'Social media and mental health',
      'AI bias in hiring systems',
      'Remote work and education',
      'Data privacy regulations (GDPR)',
      'Renewable energy in data centers',
      'Digital voting systems and security'
    ],
    studyTips: [
      'Stay informed about current technology issues',
      'Read about ethical AI and machine learning',
      'Understand privacy laws and regulations',
      'Consider multiple perspectives on technology impacts'
    ],
    practiceProblems: [
      'Analyze the ethical implications of facial recognition',
      'Design a plan to address digital divide in education',
      'Evaluate the environmental impact of a tech company'
    ]
  }
];

// AP CSA Topics - Comprehensive Curriculum
const apCsaTopics = [
  {
    id: 'using-objects',
    name: 'Using Objects and Methods',
    emoji: '☕',
    category: 'Unit 1',
    difficulty: 'Easy',
    examWeight: '15-25%',
    description: 'Introduction to algorithms and programming using objects, methods, and APIs in Java.',
    detailedExplanation: 'This unit introduces the fundamental concepts of Java programming, including how to use existing classes and methods, work with primitive data types, and understand the basics of object-oriented programming.',
    realWorldUse: 'Essential foundation for all Java programming, used in enterprise applications, Android development, and web services.',
    keyConcepts: [
      'Introduction to algorithms and programming',
      'Variables and primitive data types (int, double, boolean, char)',
      'Expressions and input/output operations',
      'Assignment, casting, and range issues',
      'Using APIs and libraries',
      'Method signatures and calling methods',
      'Class methods vs instance methods',
      'String manipulation and methods',
      'Object creation and instantiation',
      'Commenting and documentation'
    ],
    examples: [
      'Hello World program with user input',
      'Calculator using Math class methods',
      'String processing and manipulation',
      'Temperature conversion program',
      'Grade calculation system',
      'Simple text-based games'
    ],
    studyTips: [
      'Practice with Java documentation (JavaDocs)',
      'Learn common String methods',
      'Understand primitive vs reference types',
      'Practice method calling and parameter passing'
    ],
    practiceProblems: [
      'Create a program that processes user names and emails',
      'Build a simple calculator using Math class',
      'Develop a text processing utility'
    ]
  },
  {
    id: 'selection-iteration',
    name: 'Selection & Iteration',
    emoji: '🔄',
    category: 'Unit 2',
    difficulty: 'Easy',
    examWeight: '25-35%',
    description: 'Boolean expressions, conditional statements, and loops for program control flow.',
    detailedExplanation: 'This unit covers how to make programs make decisions and repeat actions. Students learn about boolean logic, conditional statements, and different types of loops to create interactive and dynamic programs.',
    realWorldUse: 'Fundamental to all programming, used in user interfaces, data validation, game logic, and business applications.',
    keyConcepts: [
      'Boolean expressions and logical operators',
      'if, else if, and nested if statements',
      'Compound Boolean logic (&&, ||, !)',
      'while loops and for loops',
      'Nested loops and loop control',
      'String algorithms and processing',
      'Informal runtime and performance analysis',
      'Iteration over collections and arrays',
      'Loop patterns and common algorithms'
    ],
    examples: [
      'Menu-driven programs with user choices',
      'Data validation with input loops',
      'Pattern printing programs',
      'Game logic with conditional statements',
      'Data processing with loops',
      'User authentication systems'
    ],
    studyTips: [
      'Practice writing nested loops',
      'Understand boolean logic thoroughly',
      'Learn common loop patterns',
      'Practice tracing through code execution'
    ],
    practiceProblems: [
      'Create a number guessing game',
      'Build a student grade management system',
      'Develop a text analysis program'
    ]
  },
  {
    id: 'class-creation',
    name: 'Class Creation',
    emoji: '🏗️',
    category: 'Unit 3',
    difficulty: 'Medium',
    examWeight: '10-18%',
    description: 'Writing classes with constructors, instance variables, and methods to model real-world entities.',
    detailedExplanation: 'Students learn to design and implement their own classes, understanding encapsulation, constructors, and the relationship between classes and objects. This is the foundation of object-oriented programming.',
    realWorldUse: 'Core of object-oriented programming, used in all modern software development for modeling real-world entities and organizing code.',
    keyConcepts: [
      'Abstraction and program design principles',
      'Writing classes with constructors',
      'Instance variables and static variables',
      'Instance methods and static methods',
      'Scope and access modifiers (public, private)',
      'Encapsulation and data hiding',
      'this keyword and object references',
      'Passing and returning object references',
      'Use of classes and objects in program design'
    ],
    examples: [
      'Student class with grades and GPA calculation',
      'Bank account with deposit/withdrawal methods',
      'Car class with speed and fuel management',
      'Library book management system',
      'Game character with health and abilities',
      'Employee payroll system'
    ],
    studyTips: [
      'Practice designing classes before coding',
      'Understand the difference between static and instance',
      'Learn proper encapsulation techniques',
      'Practice with constructors and method overloading'
    ],
    practiceProblems: [
      'Design a Rectangle class with area and perimeter',
      'Create a BankAccount class with transactions',
      'Build a Student class with course management'
    ]
  },
  {
    id: 'data-collections',
    name: 'Data Collections',
    emoji: '📋',
    category: 'Unit 4',
    difficulty: 'Medium',
    examWeight: '30-40%',
    description: 'Working with arrays, ArrayLists, and implementing searching and sorting algorithms.',
    detailedExplanation: 'This is the largest unit, covering how to work with collections of data. Students learn about arrays, ArrayLists, and implement fundamental algorithms for searching and sorting data.',
    realWorldUse: 'Essential for data processing, database operations, and any application that works with collections of information.',
    keyConcepts: [
      'Working with arrays and two-dimensional arrays',
      'ArrayList usage and common methods',
      'Traversal, searching, and sorting algorithms',
      'Linear search and binary search',
      'Selection sort, insertion sort, and merge sort',
      'Recursive search and sort algorithms',
      'Use of datasets and text files',
      'Wrapper classes and autoboxing',
      'Ethical and social issues around data collection',
      'Efficiency considerations and runtime analysis'
    ],
    examples: [
      'Student grade management with arrays',
      'Shopping cart system with ArrayList',
      'Game score tracking and leaderboards',
      'Data analysis programs',
      'Image processing with 2D arrays',
      'Database-like operations'
    ],
    studyTips: [
      'Master array indexing and bounds checking',
      'Practice implementing sorting algorithms',
      'Understand ArrayList vs array differences',
      'Learn to trace through algorithm execution'
    ],
    practiceProblems: [
      'Implement a contact management system',
      'Create a grade book with statistical analysis',
      'Build a simple database with search functionality'
    ]
  },
  {
    id: 'inheritance-polymorphism',
    name: 'Inheritance & Polymorphism',
    emoji: '🧬',
    category: 'Advanced OOP',
    difficulty: 'Hard',
    examWeight: '5-10%',
    description: 'Advanced object-oriented concepts including inheritance, method overriding, and polymorphism.',
    detailedExplanation: 'Students learn advanced OOP concepts that enable code reuse and extensibility. This includes creating class hierarchies, overriding methods, and understanding polymorphism.',
    realWorldUse: 'Essential for building large software systems, frameworks, and libraries where code reuse and extensibility are critical.',
    keyConcepts: [
      'Class inheritance and the extends keyword',
      'Method overriding vs method overloading',
      'Super keyword and constructor chaining',
      'Polymorphism and dynamic method binding',
      'Abstract classes and abstract methods',
      'Interface implementation',
      'Object-oriented design principles',
      'Code reuse and extensibility'
    ],
    examples: [
      'Vehicle hierarchy (Car, Truck, Motorcycle)',
      'Animal classes with different behaviors',
      'Shape classes with area calculations',
      'Employee types with different pay rates',
      'Game entities with shared properties',
      'GUI component inheritance'
    ],
    studyTips: [
      'Practice designing class hierarchies',
      'Understand the difference between overriding and overloading',
      'Learn when to use abstract classes vs interfaces',
      'Practice with polymorphism examples'
    ],
    practiceProblems: [
      'Design a media player with different file types',
      'Create a game with different character types',
      'Build a drawing application with various shapes'
    ]
  },
  {
    id: 'recursion',
    name: 'Recursion',
    emoji: '🔄',
    category: 'Algorithms',
    difficulty: 'Hard',
    examWeight: '5-10%',
    description: 'Solving problems using recursive method calls and understanding the call stack.',
    detailedExplanation: 'Recursion is a powerful problem-solving technique where a method calls itself to solve smaller instances of the same problem. Students learn to think recursively and implement recursive algorithms.',
    realWorldUse: 'Used in algorithms for tree traversal, mathematical calculations, and problems with recursive structure like file systems and parsing.',
    keyConcepts: [
      'Base case and recursive case identification',
      'Method call stack and stack frames',
      'Recursive thinking and problem decomposition',
      'Common recursive algorithms (factorial, Fibonacci)',
      'Recursive search and sort algorithms',
      'Tail recursion and optimization',
      'Debugging recursive methods',
      'When to use recursion vs iteration'
    ],
    examples: [
      'Factorial calculation using recursion',
      'Fibonacci sequence generation',
      'Binary search (recursive implementation)',
      'Tree traversal algorithms',
      'Tower of Hanoi puzzle solution',
      'Directory tree processing'
    ],
    studyTips: [
      'Always identify the base case first',
      'Practice tracing through recursive calls',
      'Understand the call stack mechanism',
      'Learn when recursion is appropriate'
    ],
    practiceProblems: [
      'Implement recursive binary search',
      'Create a recursive file system navigator',
      'Build a recursive maze solver'
    ]
  },
  {
    id: 'algorithm-analysis',
    name: 'Algorithm Analysis',
    emoji: '📈',
    category: 'Algorithms',
    difficulty: 'Medium',
    examWeight: '5-10%',
    description: 'Analyzing algorithm efficiency using Big O notation and understanding time/space complexity.',
    detailedExplanation: 'Students learn to analyze and compare algorithms based on their efficiency. This includes understanding Big O notation, time complexity, space complexity, and making informed decisions about algorithm choice.',
    realWorldUse: 'Essential for software engineers to write efficient code and make informed decisions about algorithm selection in real-world applications.',
    keyConcepts: [
      'Big O notation and complexity analysis',
      'Time complexity (best, average, worst case)',
      'Space complexity and memory usage',
      'Comparing algorithm efficiency',
      'Common complexity classes (O(1), O(n), O(log n), O(n²))',
      'Algorithm optimization techniques',
      'Trade-offs between time and space',
      'Practical considerations in algorithm choice'
    ],
    examples: [
      'Comparing sorting algorithm performance',
      'Analyzing search algorithm efficiency',
      'Optimizing nested loop algorithms',
      'Memory usage analysis',
      'Real-world performance considerations',
      'Algorithm selection for different data sizes'
    ],
    studyTips: [
      'Practice analyzing code for complexity',
      'Learn to recognize common complexity patterns',
      'Understand the practical implications of Big O',
      'Practice comparing different algorithm approaches'
    ],
    practiceProblems: [
      'Analyze the complexity of different sorting algorithms',
      'Compare iterative vs recursive solutions',
      'Optimize an inefficient algorithm'
    ]
  }
];

const Learn = () => {
  // Navigation state
  const [activeSection, setActiveSection] = useState<'algorithms' | 'ap-csp' | 'ap-csa'>('algorithms');
  
  // Algorithm state
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
  
  // AP CSP state
  const [selectedCspTopic, setSelectedCspTopic] = useState('creative-development');
  
  // AP CSA state
  const [selectedCsaTopic, setSelectedCsaTopic] = useState('using-objects');

  // Pomodoro Timer State
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'break'>('work');
  const [pomodoroCycles, setPomodoroCycles] = useState(0);
  const pomodoroIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Feynman Technique State
  const [showFeynman, setShowFeynman] = useState(false);
  const [feynmanStep, setFeynmanStep] = useState(0);

  // MCQ Quiz State
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // "I'm Confused" State
  const [showSimpleExplanation, setShowSimpleExplanation] = useState(false);

  const currentAlgorithm = algorithms.find((algo) => algo.id === selectedAlgorithm) || algorithms[0];
  const currentCspTopic = apCspTopics.find((topic) => topic.id === selectedCspTopic) || apCspTopics[0];
  const currentCsaTopic = apCsaTopics.find((topic) => topic.id === selectedCsaTopic) || apCsaTopics[0];

  // Debug: Check if arrays are properly loaded
  console.log('Debug Info:');
  console.log('- Active section:', activeSection);
  console.log('- Selected CSP topic:', selectedCspTopic);
  console.log('- Selected CSA topic:', selectedCsaTopic);
  console.log('- CSP topics array length:', apCspTopics.length);
  console.log('- CSA topics array length:', apCsaTopics.length);
  console.log('- CSP topics IDs:', apCspTopics.map(t => t.id));
  console.log('- CSA topics IDs:', apCsaTopics.map(t => t.id));
  console.log('- Current CSP topic:', currentCspTopic);
  console.log('- Current CSA topic:', currentCsaTopic);
  
  if (activeSection === 'ap-csp' && !currentCspTopic) {
    console.error('CSP topic not found:', selectedCspTopic, 'Available topics:', apCspTopics.map(t => t.id));
  }
  if (activeSection === 'ap-csa' && !currentCsaTopic) {
    console.error('CSA topic not found:', selectedCsaTopic, 'Available topics:', apCsaTopics.map(t => t.id));
  }


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
      if (pomodoroIntervalRef.current) {
        clearInterval(pomodoroIntervalRef.current);
        pomodoroIntervalRef.current = null;
      }
    };
  }, []);

  // Pomodoro Timer Functions
  const startPomodoro = () => {
    setIsPomodoroRunning(true);
    pomodoroIntervalRef.current = setInterval(() => {
      setPomodoroTime((prev) => {
        if (prev <= 1) {
          // Timer finished
          setIsPomodoroRunning(false);
          if (pomodoroMode === 'work') {
            setPomodoroMode('break');
            setPomodoroTime(5 * 60); // 5 minute break
            setPomodoroCycles(prev => prev + 1);
          } else {
            setPomodoroMode('work');
            setPomodoroTime(25 * 60); // 25 minute work
          }
          return pomodoroMode === 'work' ? 5 * 60 : 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pausePomodoro = () => {
    setIsPomodoroRunning(false);
    if (pomodoroIntervalRef.current) {
      clearInterval(pomodoroIntervalRef.current);
      pomodoroIntervalRef.current = null;
    }
  };

  const resetPomodoro = () => {
    setIsPomodoroRunning(false);
    setPomodoroMode('work');
    setPomodoroTime(25 * 60);
    setPomodoroCycles(0);
    if (pomodoroIntervalRef.current) {
      clearInterval(pomodoroIntervalRef.current);
      pomodoroIntervalRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
    <div className="min-h-screen bg-[#0b1f24] text-white p-4 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Pomodoro Timer */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/[0.08] backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/10 max-w-xs mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Timer className="h-4 w-4 text-blue-300 mr-2" />
                <h3 className="text-sm font-semibold">Study Timer</h3>
              </div>
              
              <div className={`text-2xl font-mono font-bold mb-3 ${
                pomodoroMode === 'work' ? 'text-blue-300' : 'text-green-300'
              }`}>
                {formatTime(pomodoroTime)}
              </div>
              
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  pomodoroMode === 'work' 
                    ? 'bg-blue-500/20 text-blue-200' 
                    : 'bg-green-500/20 text-green-200'
                }`}>
                  {pomodoroMode === 'work' ? '🍅 Work' : '☕ Break'}
                </div>
                <div className="text-white/60 text-xs">
                  Cycles: {pomodoroCycles}
                </div>
              </div>
              
              <div className="flex space-x-2 justify-center">
                <motion.button
                  onClick={isPomodoroRunning ? pausePomodoro : startPomodoro}
                  className={`px-3 py-1.5 rounded-lg font-medium flex items-center space-x-1 text-xs ${
                    isPomodoroRunning 
                      ? 'bg-red-500/20 text-red-200 hover:bg-red-500/30' 
                      : 'bg-blue-500/20 text-blue-200 hover:bg-blue-500/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPomodoroRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  <span>{isPomodoroRunning ? 'Pause' : 'Start'}</span>
                </motion.button>
                <motion.button
                  onClick={resetPomodoro}
                  className="px-3 py-1.5 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 text-xs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="h-3 w-3" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Interactive{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Computer Science Learning
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg text-white/85 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Master algorithms, AP CSP principles, and AP CSA Java programming through interactive 
            visualizations and comprehensive explanations designed specifically for computer science students.
          </motion.p>
        </div>

        {/* Navigation Tabs */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/10">
            <div className="flex space-x-2">
              {[
                { id: 'algorithms', label: 'Algorithms', icon: '⚙️' },
                { id: 'ap-csp', label: 'AP CSP', icon: '🧠' },
                { id: 'ap-csa', label: 'AP CSA', icon: '☕' }
              ].map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.08]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span>{section.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <motion.div 
              className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <span className="mr-2">🍎</span>
                {activeSection === 'algorithms' && 'Algorithms'}
                {activeSection === 'ap-csp' && 'AP CSP Topics'}
                {activeSection === 'ap-csa' && 'AP CSA Topics'}
              </h2>
              <div className="space-y-2">
                {/* Algorithms Section */}
                {activeSection === 'algorithms' && algorithms.map((algo, index) => {
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
                        <div className="flex items-center space-x-1.5 flex-wrap">
                          {algo.apTags?.map((tag, tagIndex) => (
                            <motion.span
                              key={tagIndex}
                              className="text-xs px-2 py-1 rounded-full font-medium bg-white/10 text-white/80 border border-white/20 transition-all duration-300"
                              whileHover={{ scale: 1.05, y: -1 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: tagIndex * 0.1 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-white/10 text-white/80 border border-white/20'
                            }`}
                          >
                            {algo.difficulty}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}

                {/* AP CSP Section */}
                {activeSection === 'ap-csp' && apCspTopics.map((topic, index) => {
                  const isSelected = selectedCspTopic === topic.id;
                  return (
                    <motion.button
                      key={topic.id}
                      onClick={() => setSelectedCspTopic(topic.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                        isSelected
                          ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg scale-105'
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
                          <span className="text-lg">{topic.emoji}</span>
                          <h3 className="font-semibold">{topic.name}</h3>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            isSelected ? 'rotate-90 text-white' : 'group-hover:translate-x-1 text-white/50'
                          }`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`${isSelected ? 'text-white/80' : 'text-white/60'} text-sm`}>
                          {topic.category}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-white/10 text-white/80 border border-white/20'
                          }`}
                        >
                          {topic.difficulty}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}

                {/* AP CSA Section */}
                {activeSection === 'ap-csa' && apCsaTopics.map((topic, index) => {
                  const isSelected = selectedCsaTopic === topic.id;
                  return (
                    <motion.button
                      key={topic.id}
                      onClick={() => setSelectedCsaTopic(topic.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                        isSelected
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-105'
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
                          <span className="text-lg">{topic.emoji}</span>
                          <h3 className="font-semibold">{topic.name}</h3>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            isSelected ? 'rotate-90 text-white' : 'group-hover:translate-x-1 text-white/50'
                          }`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`${isSelected ? 'text-white/80' : 'text-white/60'} text-sm`}>
                          {topic.category}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-white/10 text-white/80 border border-white/20'
                          }`}
                        >
                          {topic.difficulty}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Content based on active section */}
            {activeSection === 'algorithms' && (
              <>
                {/* Algorithm Overview */}
                <motion.div 
                  className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-xl">
                        {currentAlgorithm.emoji}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold">{currentAlgorithm.name}</h2>
                        <p className="text-white/70 mt-1">{currentAlgorithm.category} Algorithm</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowSimpleExplanation(!showSimpleExplanation)}
                      className="px-4 py-2 bg-yellow-500/20 text-yellow-200 rounded-lg font-medium hover:bg-yellow-500/30 flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span>I'm Confused</span>
                    </motion.button>
                  </div>

              <div className="mb-6">
                {showSimpleExplanation ? (
                  <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-xl p-6 mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-yellow-300 text-lg">🍎</span>
                      </div>
                      <div>
                        <h4 className="text-yellow-200 font-semibold mb-2">Simple Explanation (Like You're 14!)</h4>
                        <p className="text-yellow-100/90 leading-relaxed text-sm">
                          {currentAlgorithm.id === 'merge-sort' && 
                            "Think of merge sort like organizing a messy pile of cards! You split the pile in half, sort each half separately (like organizing two smaller piles), then merge them back together in order. It's like having two friends each sort half your cards, then you combine their sorted piles into one perfect pile!"}
                          {currentAlgorithm.id === 'quick-sort' && 
                            "Quick sort is like picking a 'middle' card and putting all smaller cards to the left and bigger cards to the right. Then you do the same thing with each side until everything is sorted. It's like organizing your room by picking a spot and putting everything smaller on one side and bigger on the other!"}
                          {currentAlgorithm.id === 'binary-search' && 
                            "Binary search is like playing 'guess the number' but super smart! You always guess the middle number, and if it's too high, you ignore the top half. If it's too low, you ignore the bottom half. You keep doing this until you find the right number. It's like finding a word in a dictionary by always opening to the middle!"}
                          {currentAlgorithm.id === 'bubble-sort' && 
                            "Bubble sort is like watching bubbles rise to the top! You compare each pair of numbers and swap them if they're in the wrong order. The biggest number 'bubbles' up to the end first, then the second biggest, and so on. It's like organizing your books by size - the biggest book always ends up at the end!"}
                          {currentAlgorithm.id === 'insertion-sort' && 
                            "Insertion sort is like sorting a hand of cards! You pick up one card at a time and insert it into the correct position among the cards you've already sorted. It's like organizing your playlist - you add one song at a time in the right spot!"}
                          {currentAlgorithm.id === 'selection-sort' && 
                            "Selection sort is like finding the smallest item in your messy room and putting it in the first spot, then finding the next smallest and putting it in the second spot, and so on. It's like organizing your toys by always picking the smallest one first!"}
                          {currentAlgorithm.id === 'linear-search' && 
                            "Linear search is like looking for your friend in a crowd by checking each person one by one from left to right. You keep looking until you find them or reach the end. It's simple but works every time!"}
                          {currentAlgorithm.id === 'two-pointers' && 
                            "Two pointers is like having two friends help you find something! One starts from the beginning and one from the end, and they move toward each other until they find what you're looking for. It's like two people searching a room from opposite ends!"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
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
              className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
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

            {/* Feynman Technique Section */}
            <motion.div 
              className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-3 text-purple-300">🍎</span>
                  Feynman Technique
                </h3>
                <motion.button
                  onClick={() => setShowFeynman(!showFeynman)}
                  className="px-4 py-2 bg-purple-500/20 text-purple-200 rounded-lg font-medium hover:bg-purple-500/30 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>{showFeynman ? 'Hide' : 'Show'} Technique</span>
                </motion.button>
              </div>

              {showFeynman && (
                <div className="space-y-6">
                  <div className="bg-purple-500/10 border border-purple-400/20 rounded-xl p-6">
                    <h4 className="text-purple-200 font-semibold mb-3">What is the Feynman Technique?</h4>
                    <p className="text-purple-100/90 text-sm leading-relaxed mb-4">
                      Named after Nobel Prize-winning physicist Richard Feynman, this technique helps you truly understand concepts by explaining them in simple terms, as if teaching a 14-year-old.
                    </p>
                    <div className="grid md:grid-cols-4 gap-4">
                      {[
                        { step: 1, title: "Choose Concept", desc: "Pick the algorithm you want to master", icon: "🍎" },
                        { step: 2, title: "Explain Simply", desc: "Write it down in plain language", icon: "🍎" },
                        { step: 3, title: "Identify Gaps", desc: "Find what you don't understand", icon: "🍎" },
                        { step: 4, title: "Review & Simplify", desc: "Go back and fill the gaps", icon: "🍎" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className={`p-4 rounded-xl border transition-all ${
                            feynmanStep >= index 
                              ? 'bg-purple-500/20 border-purple-400/30' 
                              : 'bg-white/[0.05] border-white/10'
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <div className="text-sm font-semibold text-purple-200 mb-1">{item.title}</div>
                            <div className="text-xs text-purple-100/80">{item.desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/[0.05] p-6 rounded-xl border border-white/10">
                    <h4 className="text-white font-semibold mb-4">Try It Now: Explain {currentAlgorithm.name}</h4>
                    <div className="space-y-4">
                      <div className="bg-white/[0.05] p-4 rounded-lg">
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Step 1: Write a simple explanation (like you're teaching a friend):
                        </label>
                        <textarea 
                          className="w-full h-24 bg-white/[0.05] border border-white/10 rounded-lg p-3 text-white/90 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                          placeholder="Explain this algorithm in your own words..."
                        />
                      </div>
                      <div className="bg-white/[0.05] p-4 rounded-lg">
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Step 2: What parts are still confusing?
                        </label>
                        <textarea 
                          className="w-full h-20 bg-white/[0.05] border border-white/10 rounded-lg p-3 text-white/90 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                          placeholder="What don't you understand yet?"
                        />
                      </div>
                      <motion.button
                        className="w-full py-3 bg-purple-500/20 text-purple-200 rounded-lg font-medium hover:bg-purple-500/30 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Save My Explanation
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* MCQ Quiz Section */}
            <motion.div 
              className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <span className="mr-3 text-emerald-300">🍎</span>
                  Quick Quiz
                </h3>
                <motion.button
                  onClick={() => setShowQuiz(!showQuiz)}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-200 rounded-lg font-medium hover:bg-emerald-500/30 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{showQuiz ? 'Hide' : 'Show'} Quiz</span>
                </motion.button>
              </div>

              {showQuiz && (
                <div className="space-y-6">
                  {[
                    {
                      id: 'q1',
                      question: `What is the time complexity of ${currentAlgorithm.name}?`,
                      options: [
                        currentAlgorithm.timeComplexity,
                        currentAlgorithm.id === 'merge-sort' ? 'O(n²)' : 'O(n)',
                        currentAlgorithm.id === 'binary-search' ? 'O(n log n)' : 'O(log n)',
                        'O(1)'
                      ],
                      correct: 0
                    },
                    {
                      id: 'q2',
                      question: `Which best describes ${currentAlgorithm.name}?`,
                      options: [
                        currentAlgorithm.description.split('.')[0] + '.',
                        'A simple sorting algorithm',
                        'A search algorithm',
                        'A data structure'
                      ],
                      correct: 0
                    }
                  ].map((q, qIndex) => (
                    <div key={q.id} className="bg-white/[0.05] p-6 rounded-xl border border-white/10">
                      <h4 className="text-white font-semibold mb-4">
                        Question {qIndex + 1}: {q.question}
                      </h4>
                      <div className="space-y-3">
                        {q.options.map((option, oIndex) => (
                          <motion.button
                            key={oIndex}
                            onClick={() => {
                              setQuizAnswers(prev => ({ ...prev, [q.id]: oIndex.toString() }));
                            }}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${
                              quizAnswers[q.id] === oIndex.toString()
                                ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200'
                                : 'bg-white/[0.05] border-white/10 text-white/80 hover:bg-white/[0.08]'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="font-medium">{String.fromCharCode(65 + oIndex)}. {option}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <motion.button
                    onClick={() => setQuizSubmitted(true)}
                    className="w-full py-3 bg-emerald-500/20 text-emerald-200 rounded-lg font-medium hover:bg-emerald-500/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Quiz
                  </motion.button>

                  {quizSubmitted && (
                    <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-6">
                      <h4 className="text-emerald-200 font-semibold mb-2">Quiz Results</h4>
                      <p className="text-emerald-100/90 text-sm">
                        Great job! You've completed the quiz. Keep practicing to master {currentAlgorithm.name}!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
              </>
            )}

            {/* AP CSP Content */}
            {activeSection === 'ap-csp' && (
              <>
                {currentCspTopic ? (
                  /* AP CSP Topic Overview */
                  <motion.div 
                    className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center text-xl">
                          {currentCspTopic.emoji}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold">{currentCspTopic.name}</h2>
                          <p className="text-white/70 mt-1">{currentCspTopic.category} • AP CSP</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-sm font-medium">
                          {currentCspTopic.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-lg text-white/85 leading-relaxed mb-4">
                        {currentCspTopic.description}
                      </p>
                      <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-4 mb-4">
                        <p className="text-white/90 text-sm leading-relaxed">
                          <strong className="text-green-200">Deep Dive:</strong>{' '}
                          {currentCspTopic.detailedExplanation}
                        </p>
                      </div>
                      <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-4">
                        <p className="text-white/90 text-sm">
                          <strong className="text-emerald-200">Real-World Applications:</strong>{' '}
                          {currentCspTopic.realWorldUse}
                        </p>
                      </div>
                    </div>

                    {/* Exam Weight */}
                    {currentCspTopic.examWeight && (
                      <div className="mb-6">
                        <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-green-300 font-semibold">📊 Exam Weight:</span>
                            <span className="text-green-200 font-bold text-lg">{currentCspTopic.examWeight}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Key Concepts and Examples */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white/[0.05] p-4 rounded-xl border border-white/10">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Brain className="h-5 w-5 text-green-300 mr-2" />
                          Key Concepts
                        </h4>
                        <ul className="space-y-2">
                          {currentCspTopic.keyConcepts.map((concept, index) => (
                            <li key={index} className="text-sm text-white/80 flex items-start">
                              <span className="text-green-300 mr-2">•</span>
                              {concept}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white/[0.05] p-4 rounded-xl border border-white/10">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Code className="h-5 w-5 text-blue-300 mr-2" />
                          Examples
                        </h4>
                        <ul className="space-y-2">
                          {currentCspTopic.examples.map((example, index) => (
                            <li key={index} className="text-sm text-white/80 flex items-start">
                              <span className="text-blue-300 mr-2">•</span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Study Tips and Practice Problems */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white/[0.05] p-4 rounded-xl border border-white/10">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <BookOpen className="h-5 w-5 text-purple-300 mr-2" />
                          Study Tips
                        </h4>
                        <ul className="space-y-2">
                          {currentCspTopic.studyTips?.map((tip, index) => (
                            <li key={index} className="text-sm text-white/80 flex items-start">
                              <span className="text-purple-300 mr-2">💡</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white/[0.05] p-4 rounded-xl border border-white/10">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Target className="h-5 w-5 text-orange-300 mr-2" />
                          Practice Problems
                        </h4>
                        <ul className="space-y-2">
                          {currentCspTopic.practiceProblems?.map((problem, index) => (
                            <li key={index} className="text-sm text-white/80 flex items-start">
                              <span className="text-orange-300 mr-2">🎯</span>
                              {problem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Fallback content */
                  <motion.div 
                    className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-white mb-4">AP CSP Topics</h2>
                      <p className="text-white/70">Loading AP Computer Science Principles content...</p>
                      <p className="text-white/50 text-sm mt-2">Debug: Selected topic: {selectedCspTopic}</p>
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* AP CSA Content */}
            {activeSection === 'ap-csa' && (
              <>
                {currentCsaTopic ? (
                  /* AP CSA Topic Overview */
                  <motion.div 
                    className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center text-xl">
                          {currentCsaTopic.emoji}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold">{currentCsaTopic.name}</h2>
                          <p className="text-white/70 mt-1">{currentCsaTopic.category} • AP CSA</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-200 rounded-full text-sm font-medium">
                          {currentCsaTopic.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-lg text-white/85 leading-relaxed mb-4">
                        {currentCsaTopic.description}
                      </p>
                      <div className="bg-orange-500/10 border border-orange-400/20 rounded-xl p-4 mb-4">
                        <p className="text-white/90 text-sm leading-relaxed">
                          <strong className="text-orange-200">Deep Dive:</strong>{' '}
                          {currentCsaTopic.detailedExplanation}
                        </p>
                      </div>
                      <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-4">
                        <p className="text-white/90 text-sm">
                          <strong className="text-emerald-200">Real-World Applications:</strong>{' '}
                          {currentCsaTopic.realWorldUse}
                        </p>
                      </div>
                    </div>

                    {/* Exam Weight */}
                    {currentCsaTopic.examWeight && (
                      <div className="mb-6">
                        <div className="bg-orange-500/10 border border-orange-400/20 rounded-xl p-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-orange-300 font-semibold">📊 Exam Weight:</span>
                            <span className="text-orange-200 font-bold text-lg">{currentCsaTopic.examWeight}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Key Concepts and Examples */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white/[0.05] p-4 rounded-xl border border-white/10">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Brain className="h-5 w-5 text-orange-300 mr-2" />
                          Key Concepts
                        </h4>
                        <ul className="space-y-2">
                          {currentCsaTopic.keyConcepts.map((concept, index) => (
                            <li key={index} className="text-sm text-white/80 flex items-start">
                              <span className="text-orange-300 mr-2">•</span>
                              {concept}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white/[0.05] p-4 rounded-xl border border-white/10">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Code className="h-5 w-5 text-blue-300 mr-2" />
                          Examples
                        </h4>
                        <ul className="space-y-2">
                          {currentCsaTopic.examples.map((example, index) => (
                            <li key={index} className="text-sm text-white/80 flex items-start">
                              <span className="text-blue-300 mr-2">•</span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Study Tips and Practice Problems */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white/[0.05] p-4 rounded-xl border border-white/10">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <BookOpen className="h-5 w-5 text-purple-300 mr-2" />
                          Study Tips
                        </h4>
                        <ul className="space-y-2">
                          {currentCsaTopic.studyTips?.map((tip, index) => (
                            <li key={index} className="text-sm text-white/80 flex items-start">
                              <span className="text-purple-300 mr-2">💡</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white/[0.05] p-4 rounded-xl border border-white/10">
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Target className="h-5 w-5 text-orange-300 mr-2" />
                          Practice Problems
                        </h4>
                        <ul className="space-y-2">
                          {currentCsaTopic.practiceProblems?.map((problem, index) => (
                            <li key={index} className="text-sm text-white/80 flex items-start">
                              <span className="text-orange-300 mr-2">🎯</span>
                              {problem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Fallback content */
                  <motion.div 
                    className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="text-center">
                      <h2 className="text-3xl font-bold text-white mb-4">AP CSA Topics</h2>
                      <p className="text-white/70">Loading AP Computer Science A content...</p>
                      <p className="text-white/50 text-sm mt-2">Debug: Selected topic: {selectedCsaTopic}</p>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
