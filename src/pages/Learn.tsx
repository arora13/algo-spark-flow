import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, Clock, HardDrive, Zap, CheckCircle, Timer, Coffee, Brain, BookOpen, HelpCircle, Code, Database, Network, Shield } from 'lucide-react';
import { generateAlgorithmSteps } from '@/lib/algorithms';
import StudyTools from '@/components/StudyTools';

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
    detailedExplanation: 'Creative development emphasizes the human aspect of programming - how developers work together, iterate on designs, and create user-friendly interfaces.',
    realWorldUse: 'Used in all software development teams, from startups to large tech companies, to create user-friendly applications and systems.',
    subsections: [
      {
        id: '1.0',
        title: 'Big Idea 1 Overview: Creative Development',
        content: 'Understanding the creative nature of programming and how it involves problem-solving, design thinking, and iterative development. The role of creativity in algorithm design, user interface creation, and innovative solutions to computational problems. How programming combines logical thinking with creative expression and artistic vision.'
      },
      {
        id: '1.1',
        title: 'Collaboration',
        content: 'Working effectively in programming teams through pair programming, code reviews, and collaborative development. Understanding roles in development teams, communication strategies, and tools for collaboration like version control systems (Git), project management platforms, and real-time collaboration tools. The importance of clear communication and shared understanding in team projects.'
      },
      {
        id: '1.2',
        title: 'Program Function and Purpose',
        content: 'Defining clear program objectives, understanding user needs, and ensuring programs serve their intended purpose. Requirements gathering, specification writing, and aligning program functionality with user expectations. The importance of clear documentation and user-centered design principles. Understanding the difference between what a program can do and what it should do.'
      },
      {
        id: '1.3',
        title: 'Program Design and Development',
        content: 'The iterative development process: planning, designing, implementing, testing, and refining programs. Design methodologies like top-down design, modular programming, and user-centered design. Prototyping, wireframing, and the importance of planning before coding. Understanding the software development lifecycle and agile development practices.'
      },
      {
        id: '1.4',
        title: 'Identifying and Correcting Errors',
        content: 'Systematic debugging approaches: understanding different types of errors (syntax, logic, runtime), using debugging tools and techniques, and developing strategies for finding and fixing bugs. The debugging mindset and how to approach problem-solving methodically. Common debugging techniques and tools used in modern development environments.'
      }
    ],
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
    subsections: [
      {
        id: '2.0',
        title: 'Big Idea 2 Overview: Data',
        content: 'Understanding data as the foundation of computing and how it drives decision-making in modern society. The role of data in scientific discovery, business intelligence, and personal technology. How data representation affects what computers can process and how efficiently they can work with information.'
      },
      {
        id: '2.1',
        title: 'Binary Numbers',
        content: 'The binary number system (base-2) and how computers represent all data using only 0s and 1s. Converting between decimal, binary, and hexadecimal number systems. Understanding bits, bytes, and how binary representation affects data storage and processing. The relationship between binary and digital electronics.'
      },
      {
        id: '2.2',
        title: 'Data Compression',
        content: 'Techniques for reducing the size of data files while maintaining information integrity. Lossless compression (ZIP, PNG) vs lossy compression (JPEG, MP3). How compression algorithms work and when to use different compression methods. The trade-offs between file size and quality in compressed data.'
      },
      {
        id: '2.3',
        title: 'Extracting Information from Data',
        content: 'Methods for analyzing data to discover patterns, trends, and insights. Data visualization techniques, statistical analysis, and machine learning approaches. How to ask meaningful questions of data and interpret results. The importance of data quality and cleaning in analysis.'
      },
      {
        id: '2.4',
        title: 'Using Programs with Data',
        content: 'How programs process, manipulate, and analyze data. Database systems, data processing pipelines, and programmatic data analysis. Understanding how software applications work with different types of data and the role of programming in data science and analytics.'
      }
    ],
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
    subsections: [
      {
        id: '3.0',
        title: 'Big Idea 3: Algorithms and Programming',
        content: 'Understanding algorithms as step-by-step procedures for solving problems and programming as the process of implementing algorithms in code. The relationship between computational thinking, algorithm design, and programming implementation. How algorithms and programming enable automation and problem-solving across all domains.'
      },
      {
        id: '3.1',
        title: 'Variables and Assignments',
        content: 'Understanding variables as containers for storing data values and assignment as the process of giving variables values. Variable naming conventions, data types, and the concept of memory storage. How variables enable programs to store and manipulate information dynamically.'
      },
      {
        id: '3.2',
        title: 'Data Abstraction',
        content: 'Using abstraction to manage complexity by hiding implementation details and focusing on essential features. Abstract data types, encapsulation, and how abstraction makes programs more manageable and reusable. The role of abstraction in software design and maintenance.'
      },
      {
        id: '3.3',
        title: 'Mathematical Expressions',
        content: 'Using mathematical operations and expressions in programming to perform calculations and solve problems. Arithmetic operators, operator precedence, and how to translate mathematical formulas into code. The importance of understanding mathematical concepts in algorithmic problem-solving.'
      },
      {
        id: '3.4',
        title: 'Strings',
        content: 'Working with text data in programs, including string manipulation, concatenation, and processing. String methods, character encoding, and how to handle text input and output. The role of strings in user interfaces and data processing applications.'
      },
      {
        id: '3.5',
        title: 'Boolean Expressions',
        content: 'Using boolean logic to make decisions in programs, including comparison operators and logical operators. Understanding true/false values and how boolean expressions control program flow. The foundation of conditional logic and decision-making in algorithms.'
      },
      {
        id: '3.6',
        title: 'Conditionals',
        content: 'Using if/else statements to create branching logic in programs. Understanding how conditionals enable programs to make decisions and respond differently to different inputs. The role of conditionals in creating interactive and adaptive programs.'
      },
      {
        id: '3.7',
        title: 'Nested Conditionals',
        content: 'Creating complex decision-making logic by nesting conditional statements within other conditionals. Understanding how to structure nested logic for clarity and correctness. Common patterns in nested conditional programming and best practices for readability.'
      },
      {
        id: '3.8',
        title: 'Iteration',
        content: 'Using loops to repeat actions and process collections of data efficiently. Different types of loops (for, while, do-while) and when to use each. Understanding loop control, termination conditions, and how iteration enables programs to handle large amounts of data.'
      },
      {
        id: '3.9',
        title: 'Developing Algorithms',
        content: 'The process of designing algorithms to solve specific problems, including problem analysis, solution design, and implementation. Algorithm design patterns, step-by-step problem solving, and how to break complex problems into manageable parts.'
      },
      {
        id: '3.10',
        title: 'Lists',
        content: 'Working with collections of data using lists and arrays. List operations, indexing, and how to process multiple data items efficiently. The role of lists in storing and manipulating datasets in programs.'
      },
      {
        id: '3.11',
        title: 'Binary Search',
        content: 'Understanding the binary search algorithm as an efficient method for finding items in sorted data. How binary search works, its time complexity, and when to use it. The relationship between data organization and algorithm efficiency.'
      },
      {
        id: '3.12',
        title: 'Calling Procedures',
        content: 'Using functions and procedures to organize code and enable code reuse. How to call existing functions, pass parameters, and use return values. The benefits of procedural programming and modular code design.'
      },
      {
        id: '3.13',
        title: 'Developing Procedures',
        content: 'Creating custom functions and procedures to solve specific problems. Function design, parameter passing, and return values. How to decompose problems into smaller, manageable functions and build complex programs from simple components.'
      },
      {
        id: '3.14',
        title: 'Libraries',
        content: 'Using pre-written code libraries to extend program functionality and avoid reinventing common solutions. Understanding APIs, library documentation, and how to integrate external code into programs. The role of libraries in modern software development.'
      },
      {
        id: '3.15',
        title: 'Random Values',
        content: 'Generating and using random numbers in programs for simulations, games, and statistical analysis. Random number generation, seeding, and how randomness adds unpredictability to programs. Applications of randomness in computational problem-solving.'
      },
      {
        id: '3.16',
        title: 'Simulations',
        content: 'Creating computer simulations to model real-world systems and processes. How simulations work, their limitations, and their applications in science, engineering, and decision-making. The role of programming in creating accurate and useful simulations.'
      },
      {
        id: '3.17',
        title: 'Algorithmic Efficiency',
        content: 'Understanding how to measure and improve algorithm performance. Time complexity, space complexity, and the trade-offs between different algorithmic approaches. How to choose appropriate algorithms for different problem sizes and constraints.'
      },
      {
        id: '3.18',
        title: 'Undecidable Problems',
        content: 'Understanding that some computational problems cannot be solved by any algorithm. The concept of undecidability, the halting problem, and the limits of computation. How understanding these limits helps in algorithm design and problem analysis.'
      }
    ],
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
    subsections: [
      {
        id: '4.0',
        title: 'Big Idea 4 Overview: Computer Systems and Networks',
        content: 'Understanding how computer systems and networks enable modern computing. The relationship between hardware, software, and network infrastructure. How these systems work together to provide the foundation for all digital technologies and internet-based services.'
      },
      {
        id: '4.1',
        title: 'The Internet',
        content: 'Understanding how the internet works as a global network of interconnected computers. Internet protocols (TCP/IP), packet switching, routing, and how data travels across the internet. The role of ISPs, DNS, and internet infrastructure in enabling global connectivity.'
      },
      {
        id: '4.2',
        title: 'Fault Tolerance',
        content: 'Designing systems that continue to function even when individual components fail. Redundancy, error detection and correction, backup systems, and disaster recovery. How fault tolerance ensures reliability in critical systems like banking, healthcare, and transportation.'
      },
      {
        id: '4.3',
        title: 'Parallel and Distributed Computing',
        content: 'Using multiple processors or computers working together to solve problems more efficiently. Parallel processing, distributed systems, cloud computing, and how these approaches enable handling of large-scale computational tasks. The benefits and challenges of distributed computing architectures.'
      }
    ],
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
    subsections: [
      {
        id: '5.0',
        title: 'Big Idea 5 Overview: Impact of Computing',
        content: 'Understanding the broad societal, cultural, economic, and ethical effects of computing innovations. How technology has transformed communication, work, education, healthcare, and entertainment. The dual nature of technological progress - benefits and challenges - and the responsibility of computing professionals.'
      },
      {
        id: '5.1',
        title: 'Beneficial and Harmful Effects',
        content: 'Analyzing both positive and negative impacts of computing technologies. Benefits include improved communication, access to information, automation, and innovation. Harmful effects include privacy violations, addiction, misinformation, and job displacement. Understanding how to maximize benefits while minimizing harm.'
      },
      {
        id: '5.2',
        title: 'Digital Divide',
        content: 'Understanding the gap between those who have access to digital technologies and those who do not. Factors contributing to the digital divide: economic, geographic, educational, and generational. The impact on education, employment, and social participation. Strategies for bridging the digital divide and promoting digital inclusion.'
      },
      {
        id: '5.3',
        title: 'Computing Bias',
        content: 'Understanding how bias can be introduced into computing systems and algorithms. Types of bias: data bias, algorithmic bias, and societal bias. The impact of biased systems on different groups and communities. Strategies for identifying, measuring, and reducing bias in computing systems.'
      },
      {
        id: '5.4',
        title: 'Crowdsourcing',
        content: 'Understanding how large groups of people can contribute to solving problems or creating content through digital platforms. Benefits of crowdsourcing: distributed problem-solving, diverse perspectives, and cost-effectiveness. Challenges: quality control, coordination, and fair compensation. Examples in science, business, and social causes.'
      },
      {
        id: '5.5',
        title: 'Legal and Ethical Concerns',
        content: 'Understanding the legal and ethical frameworks that govern computing and technology use. Key areas: privacy laws, intellectual property, cybersecurity regulations, and professional ethics. The role of government, industry, and individuals in establishing and maintaining ethical computing practices.'
      }
    ],
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

// AP CSA Topics - Comprehensive Curriculum with Subsections
const apCsaTopics = [
  {
    id: 'using-objects',
    name: 'Using Objects and Methods',
    emoji: '☕',
    category: 'Unit 1',
    difficulty: 'Easy',
    examWeight: '15-25%',
    description: 'Introduction to algorithms and programming using objects, methods, and APIs in Java.',
    detailedExplanation: 'This unit covers the foundational concepts of Java programming including primitive types, variables, expressions, method calling, and object creation.',
    realWorldUse: 'Essential foundation for all Java programming, used in enterprise applications, Android development, and web services.',
    subsections: [
      {
        id: '1.1',
        title: 'Why Programming? Why Java?',
        content: 'Understanding the purpose of programming and why Java is chosen for AP Computer Science A. Java\'s platform independence (Write Once, Run Anywhere), object-oriented nature, strong typing, automatic memory management, and widespread use in industry. Java\'s role in enterprise applications, Android development, web services, and educational settings. The importance of learning programming for problem-solving, logical thinking, and computational skills.'
      },
      {
        id: '1.2',
        title: 'Variables and Primitive Data Types',
        content: 'Master primitive types: int (32-bit, range -2,147,483,648 to 2,147,483,647), double (64-bit floating-point), boolean (true/false), char (16-bit Unicode). Learn their ranges, literals (int: 42, double: 3.14, boolean: true/false, char: \'A\'), and memory usage. Understand variable declaration (int age;), initialization (int age = 18;), and naming conventions (camelCase). Variable scope and lifetime concepts.'
      },
      {
        id: '1.3',
        title: 'Expressions and Assignment Statements',
        content: 'Arithmetic expressions with operators: +, -, *, /, %. Operator precedence: parentheses, unary operators, multiplicative (*, /, %), additive (+, -), assignment (=). Assignment statements: variable = expression. Understanding order of operations and how to evaluate complex expressions step by step. Common pitfalls with integer division vs floating-point division.'
      },
      {
        id: '1.5',
        title: 'Casting and Ranges of Variables',
        content: 'Type casting between primitive types: widening (automatic) int to double, narrowing (explicit) double to int. Syntax: (int) 3.14 = 3. Understanding variable ranges to prevent overflow (int max + 1 = int min) and underflow errors. Loss of precision in narrowing conversions. Safe casting practices and when to use explicit casting.'
      },
      {
        id: '1.6',
        title: 'Compound Assignment Operators',
        content: 'Operators like +=, -=, *=, /=, %=, ++, --. Examples: x += 5 (same as x = x + 5), count++ (post-increment), ++count (pre-increment). Learn when and how to use compound assignment operators effectively in Java programs. Understanding the difference between post-increment and pre-increment operators.'
      },
      {
        id: '1.7',
        title: 'Application Program Interface (API) and Libraries',
        content: 'Understanding APIs, Java libraries, and how to use existing classes and methods. Introduction to Java documentation (JavaDocs) and method signatures. Common Java packages: java.lang (String, Math), java.util (Scanner, ArrayList). How to read method documentation, understand parameters, return types, and method behavior. Import statements and package usage.'
      },
      {
        id: '1.8',
        title: 'Documentation With Comments',
        content: 'Writing clear comments in Java code. Single-line comments (//) and multi-line comments (/* */). Best practices for code documentation: explaining complex logic, documenting method purposes, avoiding obvious comments. Javadoc comments (/** */) for formal documentation. The importance of readable, well-documented code for collaboration and maintenance.'
      },
      {
        id: '1.9',
        title: 'Calling a Void Method With Parameters',
        content: 'How to call methods that don\'t return values but accept parameters. Understanding method signatures: methodName(parameterType parameterName). Examples: System.out.println("Hello"), Math.random(). Parameter passing: actual arguments vs formal parameters. Understanding that Java passes copies of primitive values to methods.'
      },
      {
        id: '1.10',
        title: 'Calling a Non-Void Method',
        content: 'Calling methods that return values. Understanding return types and how to use returned values in expressions and assignments. Examples: int length = str.length(), double result = Math.sqrt(16). Method chaining and using return values as arguments to other methods. Understanding the difference between void and non-void methods.'
      },
      {
        id: '1.11',
        title: 'Using the Math Class',
        content: 'Common Math class methods: Math.sqrt(x), Math.pow(base, exponent), Math.abs(x), Math.max(a, b), Math.min(a, b), Math.random() (returns 0.0 to 0.999...), Math.round(x), Math.ceil(x), Math.floor(x). Static method calling (no object creation needed). Understanding method parameters and return types. Practical applications in calculations and simulations.'
      },
      {
        id: '1.13',
        title: 'Creating and Storing Objects',
        content: 'Object creation with the new keyword: String name = new String("Hello"). Understanding reference types vs primitive types. Object instantiation and memory allocation. The difference between object references and primitive variables. Null references and NullPointerException. Object lifecycle and garbage collection basics.'
      },
      {
        id: '1.14',
        title: 'Calling a Void Method',
        content: 'Calling methods that perform actions but don\'t return values. Understanding void methods and their purpose in program design. Examples: System.out.println(), System.out.print(). When to use void methods vs methods that return values. Side effects of void methods and their role in program flow.'
      },
      {
        id: '1.15',
        title: 'String Methods',
        content: 'Essential String methods: length() (returns int), substring(start, end), indexOf(char/string), equals(otherString), compareTo(otherString), toUpperCase(), toLowerCase(), charAt(index), trim(). String manipulation and comparison. Understanding that Strings are immutable. String concatenation with + operator. Common String processing patterns and algorithms.'
      }
    ],
    keyConcepts: [
      'Primitive types: int, double, boolean, char (range, literals, casting, overflow)',
      'Variables and assignment, evaluation of arithmetic expressions, operator precedence',
      'Integer division vs floating point division',
      'Reference types and null; object creation with new',
      'Method calling: static vs instance methods, parameter passing',
      'String methods: length(), substring(), indexOf(), equals(), compareTo()',
      'Math methods from Math class',
      'API and libraries usage',
      'Documentation with comments'
    ],
    examples: [
      'Integer division vs double: int a = 5, b = 2; double x = a / b; // result = 2.0',
      'String equality: String s1 = new String("hi"); String s2 = "hi"; s1.equals(s2) // true',
      'Math class usage: Math.sqrt(), Math.pow(), Math.random()',
      'String manipulation: substring(), indexOf(), toUpperCase(), toLowerCase()'
    ],
    studyTips: [
      'Always use .equals() to compare String contents, never ==',
      'Remember integer division truncates: 5/2 = 2, not 2.5',
      'Cast explicitly when needed: (double)a / b for floating-point division',
      'Practice with Java documentation (JavaDocs) for method signatures',
      'Learn common String methods and their return types',
      'Master operator precedence and expression evaluation'
    ],
    practiceProblems: [
      'Write a program that demonstrates integer vs floating-point division',
      'Create a String processing program using various String methods',
      'Build a calculator using Math class methods',
      'Write methods that demonstrate parameter passing with primitives and objects'
    ]
  },
  {
    id: 'selection-iteration',
    name: 'Selection & Iteration',
    emoji: '🔄',
    category: 'Unit 2',
    difficulty: 'Easy',
    examWeight: '25-35%',
    description: 'Boolean logic, conditional statements, and iteration structures in Java. Master if statements, loops, and boolean expressions.',
    detailedExplanation: 'This unit covers boolean expressions, operator precedence, De Morgan\'s laws, and short-circuit evaluation with && and ||. Learn conditional statements including if, if-else, and nested if statements. Master iteration with for loops (classic and enhanced), while loops, and do-while loops.',
    realWorldUse: 'Used in all programming applications for decision-making, user input validation, data processing loops, game logic, and algorithm implementation.',
    subsections: [
      {
        id: '2.1',
        title: 'Boolean Expressions and if Statements',
        content: 'Understanding boolean data type (true/false), boolean expressions, and basic if statements. Learn to write conditions that evaluate to true or false. Boolean literals, comparison operators (==, !=, <, >, <=, >=), and simple conditional logic. Syntax: if (condition) { statements; }. Understanding when code blocks execute based on boolean conditions.'
      },
      {
        id: '2.2',
        title: 'if Statements and Control Flow',
        content: 'Single if statements, if-else statements, and nested if statements. Understanding how program flow changes based on conditions. Syntax: if (condition) { } else { }, if (condition1) { } else if (condition2) { } else { }. Control flow: sequential execution vs conditional branching. Nested conditionals and proper indentation for readability.'
      },
      {
        id: '2.3',
        title: 'Boolean Expressions and Logical Operators',
        content: 'Logical operators: && (AND), || (OR), ! (NOT). Understanding operator precedence and how to combine boolean expressions. Short-circuit evaluation: && stops at first false, || stops at first true. De Morgan\'s laws: !(a && b) = !a || !b, !(a || b) = !a && !b. Complex boolean expressions and parentheses for clarity.'
      },
      {
        id: '2.4',
        title: 'Comparing Objects',
        content: 'Comparing objects vs primitives. Using .equals() for String comparison, understanding reference equality (==) vs content equality (.equals()). String comparison: str1.equals(str2), str1.equalsIgnoreCase(str2). Common mistake: using == for String comparison. Object comparison principles and when to override equals() method.'
      },
      {
        id: '2.5',
        title: 'for Loops',
        content: 'Classic for loops: for (int i = 0; i < n; i++). Understanding loop initialization, condition, and increment. Loop variable scope and lifetime. Loop patterns: counting up/down, stepping by different amounts. Common for loop variations: for (int i = 1; i <= n; i++), for (int i = n; i >= 0; i--). Loop bounds and avoiding off-by-one errors.'
      },
      {
        id: '2.6',
        title: 'while Loops',
        content: 'while loops: while (condition) { statements; } and do-while loops: do { statements; } while (condition). Understanding when to use each type. Loop conditions and avoiding infinite loops. Pre-test vs post-test loops. Common while loop patterns: input validation, processing until sentinel value, counting with conditions.'
      },
      {
        id: '2.7',
        title: 'Developing Algorithms Using Conditionals',
        content: 'Creating algorithms that use conditional statements. Decision-making in programs, branching logic, and algorithm design. Algorithm patterns: selection algorithms, validation algorithms, classification algorithms. Using conditionals for data validation, error checking, and program flow control. Nested conditionals for complex decision trees.'
      },
      {
        id: '2.8',
        title: 'Developing Algorithms Using Iteration',
        content: 'Creating algorithms that use loops. Iterative problem solving, loop patterns, and common loop-based algorithms. Algorithm types: counting algorithms, accumulation algorithms, search algorithms, processing algorithms. Loop invariants and understanding what remains true throughout loop execution. Efficiency considerations in iterative algorithms.'
      },
      {
        id: '2.9',
        title: 'Developing Algorithms Using Strings',
        content: 'String processing algorithms using loops and conditionals. Character-by-character processing, string manipulation, and text analysis. Common string algorithms: character counting, substring searching, text parsing, string validation. String traversal: for (int i = 0; i < str.length(); i++) and charAt(i). String building and manipulation techniques.'
      },
      {
        id: '2.10',
        title: 'Nested Iteration',
        content: 'Nested loops and their applications. 2D array traversal, pattern generation, and complex iterative algorithms. Nested loop structure: for (int i = 0; i < rows; i++) for (int j = 0; j < cols; j++). Applications: matrix operations, pattern printing, grid-based problems. Efficiency considerations: O(n²) complexity for nested loops.'
      },
      {
        id: '2.11',
        title: 'Informal Code Analysis',
        content: 'Understanding algorithm efficiency informally. Counting operations, recognizing O(n) vs O(n²) patterns, and performance considerations. Time complexity concepts: constant O(1), linear O(n), quadratic O(n²). Space complexity and memory usage. Algorithm comparison and choosing appropriate algorithms for different problem sizes.'
      },
      {
        id: '2.12',
        title: 'Using the Math Class',
        content: 'Advanced Math class usage in loops and conditionals. Random number generation: Math.random() for 0.0 to 0.999..., scaling to different ranges. Mathematical calculations: Math.sqrt(), Math.pow(), Math.abs(), Math.max(), Math.min(). Statistical operations: finding averages, standard deviations, ranges. Math class in algorithmic contexts and simulations.'
      }
    ],
    keyConcepts: [
      'Boolean expressions, operator precedence, De Morgan\'s laws',
      'Short-circuit && and || evaluation',
      'Conditional statements: if, if-else, nested if',
      'Iteration: for loop (classic and enhanced), while, do-while',
      'Loop invariants and tracing loop variables',
      'Traversing arrays and ArrayLists with loops',
      'Trace tables for nested loops',
      'Off-by-one checks and boundary testing',
      'Short-circuit evaluation for safety',
      'Loop control and break/continue statements'
    ],
    examples: [
      'Short-circuit safety: if (a!=0 && 100/a > 1) prevents division by zero',
      'Enhanced for loop: for (int v : arr) for read-only access',
      'Loop bounds: for (int i = 0; i < arr.length - 1; i++) to avoid IndexOutOfBounds',
      'Boolean logic: !(a && b) = !a || !b (De Morgan\'s law)',
      'Nested loops for 2D array traversal'
    ],
    studyTips: [
      'Create trace tables for complex nested loops',
      'Always test loops on smallest, typical, and boundary inputs',
      'Use short-circuit evaluation to prevent runtime errors',
      'Practice writing loop bounds to avoid off-by-one errors',
      'Learn when to use enhanced for loops vs indexed loops',
      'Master boolean logic and De Morgan\'s laws',
      'Practice tracing through loops step by step',
      'Understand operator precedence in boolean expressions'
    ],
    practiceProblems: [
      'Write a method that returns true if arr contains two adjacent equal elements',
      'Create a program that finds the maximum value in an array using loops',
      'Build a number guessing game with hints and validation',
      'Write nested loops to print patterns or traverse 2D arrays',
      'Implement a program that validates user input with boolean logic',
      'Create trace tables for complex nested loop scenarios'
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
    detailedExplanation: 'Design classes with private instance variables and public methods, constructors, and proper encapsulation principles.',
    realWorldUse: 'Core of object-oriented programming, used in all modern software development for modeling real-world entities and organizing code.',
    subsections: [
      {
        id: '3.1',
        title: 'Abstraction and Program Design',
        content: 'Understanding abstraction as a fundamental concept in programming. How to identify essential features and hide unnecessary details when designing classes. Abstraction levels: high-level (what the class does) vs low-level (how it does it). Real-world modeling: identifying objects, their attributes (instance variables), and behaviors (methods). Design principles: single responsibility, clear interfaces, and separation of concerns.'
      },
      {
        id: '3.2',
        title: 'Impact of Program Design',
        content: 'How good program design affects maintainability, readability, and extensibility. Understanding the importance of clean, well-structured code. Code quality metrics: readability, modularity, reusability. The cost of poor design: debugging difficulties, maintenance nightmares, and scalability issues. Design patterns and best practices for creating robust, maintainable software.'
      },
      {
        id: '3.3',
        title: 'Anatomy of a Class',
        content: 'The structure of a Java class: class declaration (public class ClassName), instance variables (private dataType variableName), methods (public returnType methodName(parameters)), and the relationship between these components. Class header, instance variables section, constructor section, and methods section. Proper organization and formatting of class components.'
      },
      {
        id: '3.4',
        title: 'Constructors',
        content: 'Special methods used to initialize objects. Default constructors (no parameters), parameterized constructors (with parameters), and constructor overloading (multiple constructors with different parameter lists). Constructor syntax: public ClassName(parameters) { body }. Constructor chaining and the role of constructors in object initialization. When constructors are called and their relationship to the new keyword.'
      },
      {
        id: '3.5',
        title: 'Writing Methods',
        content: 'How to write methods in classes. Method signatures: public/private returnType methodName(parameterType parameterName). Method bodies, return statements, and void methods. Method decomposition: breaking complex problems into smaller, manageable methods. Method organization, naming conventions, and the relationship between methods and instance variables.'
      },
      {
        id: '3.6',
        title: 'Accessor Methods',
        content: 'Getter methods (accessors): public returnType getVariableName() { return variableName; }. Setter methods (mutators): public void setVariableName(parameterType parameter) { variableName = parameter; }. Understanding encapsulation and data protection. When to provide getters/setters vs keeping data private. Validation in setter methods and maintaining object integrity.'
      },
      {
        id: '3.7',
        title: 'Static Variables and Methods',
        content: 'Static variables and methods belong to the class, not instances. Static variable declaration: private static dataType variableName. Static method declaration: public static returnType methodName(parameters). When and how to use static members effectively. Static vs instance: class-level vs object-level behavior. Common uses: counters, utility methods, constants. Accessing static members: ClassName.staticMember.'
      },
      {
        id: '3.8',
        title: 'Scope and Access',
        content: 'Understanding variable scope and access modifiers (public, private). How scope affects variable visibility and lifetime. Local variables (method scope) vs instance variables (object scope) vs static variables (class scope). Access modifiers: public (accessible everywhere), private (accessible only within the class). Encapsulation principles and information hiding. Variable shadowing and naming conflicts.'
      },
      {
        id: '3.9',
        title: 'This Keyword',
        content: 'Using the this keyword to refer to the current object. When and why to use this in constructors and methods. Common uses: this.variableName (disambiguating instance variables from parameters), this.methodName() (calling other methods), this(parameters) (constructor chaining). Understanding implicit vs explicit this usage. When this is required vs optional.'
      }
    ],
    keyConcepts: [
      'Design classes with private instance variables and public methods',
      'Constructors, getters/setters, toString() method',
      'Static fields and methods belong to the class, not instances',
      'Access control: public, private',
      'Method decomposition and class design principles',
      'this keyword and object references',
      'Correct signatures and method bodies for AP grading'
    ],
    examples: [
      'Book class: private String title, author; public Book(String t, String a) constructor',
      'Static counter: private static int count; public static int getCount() { return count; }',
      'Getter/Setter pattern: public String getTitle() { return title; }',
      'toString() method: public String toString() { return title + " by " + author; }'
    ],
    studyTips: [
      'Always use private for instance variables, public for methods',
      'Include constructors, getters, setters, and toString() in class design',
      'Understand when to use static vs instance methods',
      'Practice writing correct method signatures for AP FRQs',
      'Master precondition/postcondition documentation'
    ],
    practiceProblems: [
      'Design a Rectangle class with area and perimeter methods',
      'Create a BankAccount class with deposit/withdrawal and balance tracking',
      'Build a Student class with course management and GPA calculation'
    ]
  },
  {
    id: 'data-collections',
    name: 'Data Collections',
    emoji: '📋',
    category: 'Unit 4',
    difficulty: 'Medium',
    examWeight: '30-40%',
    description: 'Working with arrays, ArrayLists, 2D arrays, searching & sorting, recursion, and file I/O. This is the heaviest unit with most FRQs.',
    detailedExplanation: 'This is a heavy unit; most FRQs involve ArrayList or 2D arrays. Know traversal patterns, mutation patterns, and the official allowed library methods.',
    realWorldUse: 'Essential for data processing, database operations, image processing, game development, and any application that works with collections of information.',
    subsections: [
      {
        id: '4.1',
        title: 'Ethical and Social Implications',
        content: 'Understanding the ethical considerations of data collection, privacy, and the social impact of algorithms and data processing systems. Topics include: data privacy and security, algorithmic bias and fairness, digital divide and accessibility, environmental impact of computing, intellectual property and copyright, cyberbullying and online safety, and the responsibility of programmers in creating ethical software.'
      },
      {
        id: '4.2',
        title: 'Introduction to Using Data Sets',
        content: 'Working with collections of data, understanding data structures, and the importance of organizing information for processing. Concepts include: what constitutes a data set, types of data (numeric, text, categorical), data quality and validation, data preprocessing and cleaning, and the role of data in decision-making and problem-solving.'
      },
      {
        id: '4.3',
        title: 'Array Creation and Access',
        content: 'Creating arrays: int[] arr = new int[10]; (declares and allocates) or int[] arr = {1,2,3}; (declares and initializes). Accessing elements with indices: arr[0], arr[1], etc. Understanding array bounds: valid indices are 0 to length-1. Array length property: arr.length. Common errors: ArrayIndexOutOfBoundsException, null pointer exceptions.'
      },
      {
        id: '4.4',
        title: 'Traversing Arrays',
        content: 'Looping through arrays: for (int i = 0; i < arr.length; i++) (indexed access) and enhanced for (int v : arr) (read-only access). When to use each type: indexed for modification, enhanced for reading. Array traversal patterns: forward, backward, partial traversal. Common algorithms: finding max/min, counting, searching, summing.'
      },
      {
        id: '4.5',
        title: 'Developing Algorithms Using Arrays',
        content: 'Creating algorithms that process arrays, including finding maximum/minimum values, counting occurrences, and array manipulation. Algorithm patterns: linear search, finding extremes, counting elements, array reversal, element swapping. Efficiency considerations: single-pass vs multiple-pass algorithms. Common AP algorithm types: array processing, element manipulation, statistical calculations.'
      },
      {
        id: '4.6',
        title: 'Using Text Files',
        content: 'File I/O: Scanner(File), hasNext(), next(), nextLine(). Reading data from text files and processing file contents. File handling: opening files, reading line-by-line vs token-by-token, handling end-of-file, closing files. Exception handling: FileNotFoundException. Common file processing patterns: data parsing, line counting, text analysis.'
      },
      {
        id: '4.9',
        title: 'Traversing ArrayLists',
        content: 'Working with ArrayList: size(), add(E), add(int, E), get(int), set(int, E), remove(int). Understanding ArrayList semantics: dynamic sizing, element shifting on insertion/deletion. Traversal methods: indexed loops, enhanced for loops. ArrayList vs array differences: size() vs length, dynamic vs fixed size, object storage vs primitive storage.'
      },
      {
        id: '4.11',
        title: '2D Arrays',
        content: '2D arrays: int[][] grid = new int[rows][cols]; Access grid[r][c]. The first index is row, second is column. Understanding 2D array structure: array of arrays. Memory layout and indexing. Common 2D array operations: initialization, element access, bounds checking. Applications: matrices, game boards, image processing, data tables.'
      },
      {
        id: '4.12',
        title: 'Traversing 2D Arrays',
        content: 'Nested loops for 2D array traversal: for (int r = 0; r < mat.length; r++) for (int c = 0; c < mat[r].length; c++). Row-major vs column-major traversal. Accessing elements: mat[r][c]. Common patterns: row processing, column processing, diagonal traversal, boundary traversal. Efficiency considerations and traversal order.'
      },
      {
        id: '4.13',
        title: 'Implementing 2D Array Algorithms',
        content: 'Common 2D array algorithms: finding sums, searching for values, processing rows and columns, and matrix operations. Algorithm types: row/column sums, finding maximum/minimum, searching for specific values, matrix addition/multiplication, pattern recognition. AP exam patterns: grid-based problems, matrix manipulation, data processing.'
      },
      {
        id: '4.14',
        title: 'Searching',
        content: 'Linear search: O(n) for arrays and ArrayList. Algorithm: check each element sequentially until found or end reached. Binary search: O(log n) but not required unless explicitly taught. Search variations: finding first occurrence, counting occurrences, finding all occurrences. Search efficiency and when to use each method.'
      },
      {
        id: '4.15',
        title: 'Sorting',
        content: 'Selection sort: O(n²) in-place, find minimum and swap. Insertion sort: O(n²) worst-case, O(n) best-case when nearly sorted. Merge sort: O(n log n), implemented recursively with divide-and-conquer. Sorting algorithm characteristics: stability, in-place vs extra space, adaptive behavior. AP exam focus: understanding and implementing these three algorithms.'
      },
      {
        id: '4.16',
        title: 'Recursion',
        content: 'Recursion: base case, recursive step, correctness via induction. Common AP recursion problems: array processing, string manipulation, mathematical calculations, tree traversal. Recursive thinking: breaking problems into smaller identical subproblems. Common pitfalls: infinite recursion, missing base cases, incorrect recursive calls.'
      },
      {
        id: '4.17',
        title: 'Recursive Searching and Sorting',
        content: 'Implementing recursive versions of search and sort algorithms. Recursive binary search, recursive merge sort, recursive quick sort concepts. Understanding recursive thinking and algorithm design. Recursion vs iteration trade-offs: space complexity, readability, performance. AP exam patterns: recursive array processing, recursive string manipulation.'
      }
    ],
    keyConcepts: [
      '1D arrays: creation, traversal, enhanced for loops',
      '2D arrays: declaration, access grid[r][c], nested loops',
      'ArrayList methods: size(), add(E), add(int, E), get(int), set(int, E), remove(int)',
      'Linear search: O(n) for arrays and ArrayList',
      'Selection sort: O(n²) in-place implementation',
      'Insertion sort: O(n²) worst-case, O(n) best-case when nearly sorted',
      'Merge sort: O(n log n), implemented recursively',
      'Recursion: base case, recursive step, correctness via induction',
      'File I/O: Scanner(File), hasNext(), next(), nextLine()'
    ],
    examples: [
      'Column sum: for (int r = 0; r < mat.length; r++) sum += mat[r][col];',
      'ArrayList removal: for (int i = list.size()-1; i >= 0; i--) to avoid skipping',
      'Selection sort: find min, swap with current position',
      'File reading: Scanner sc = new Scanner(new File("data.txt")); while (sc.hasNext())'
    ],
    studyTips: [
      'Master array indexing and bounds checking to avoid IndexOutOfBounds',
      'Practice implementing selection, insertion, and merge sort algorithms',
      'Understand ArrayList vs array differences and when to use each',
      'Learn to trace through algorithm execution with small examples',
      'Practice 2D array problems with nested loops',
      'Master recursion with clear base cases and recursive steps'
    ],
    practiceProblems: [
      'Write a method that returns the column with fewest occurrences of a target in 2D array',
      'Implement removeAll(ArrayList<String> list, String target) that removes all occurrences',
      'Create a program that reads data from a text file and processes it',
      'Implement selection sort and merge sort algorithms'
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
      <StudyTools />
      <div className="max-w-7xl mx-auto">

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

            {/* AP CSP Content - SIMPLE */}
            {activeSection === 'ap-csp' && (
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{currentCspTopic.name}</h2>
                  <p className="text-white/70">{currentCspTopic.category} • AP CSP</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <span className="px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-sm">
                      {currentCspTopic.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm">
                      {currentCspTopic.examWeight}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/[0.05] p-4 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                    <p className="text-white/80">{currentCspTopic.description}</p>
                  </div>

                  <div className="bg-green-500/10 p-4 rounded-xl">
                    <h3 className="text-lg font-semibold text-green-200 mb-2">Deep Dive</h3>
                    <p className="text-white/80">{currentCspTopic.detailedExplanation}</p>
                  </div>

                  <div className="bg-emerald-500/10 p-4 rounded-xl">
                    <h3 className="text-lg font-semibold text-emerald-200 mb-2">Real-World Use</h3>
                    <p className="text-white/80">{currentCspTopic.realWorldUse}</p>
                  </div>

                  {/* Feynman Technique */}
                  <div className="bg-purple-500/10 p-4 rounded-xl">
                    <h3 className="text-lg font-semibold text-purple-200 mb-2">🎯 Feynman Technique</h3>
                    <p className="text-white/80 mb-3">Explain this concept as if teaching a 12-year-old:</p>
                    <div className="bg-white/[0.05] p-3 rounded-lg">
                      <p className="text-sm text-white/70 italic">"{currentCspTopic.name} is like..."</p>
                    </div>
                  </div>

                  {/* Subsections */}
                  {currentCspTopic.subsections && (
                    <div className="bg-white/[0.05] p-4 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-3">Unit Subsections</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {currentCspTopic.subsections.map((subsection, index) => (
                          <div key={index} className="bg-white/[0.05] p-3 rounded-lg border border-white/10">
                            <h4 className="text-sm font-semibold text-green-200 mb-1">{subsection.id} - {subsection.title}</h4>
                            <p className="text-xs text-white/70">{subsection.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/[0.05] p-4 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-2">Key Concepts</h3>
                      <ul className="space-y-1">
                        {currentCspTopic.keyConcepts.map((concept, index) => (
                          <li key={index} className="text-sm text-white/80">• {concept}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/[0.05] p-4 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-2">Examples</h3>
                      <ul className="space-y-1">
                        {currentCspTopic.examples.map((example, index) => (
                          <li key={index} className="text-sm text-white/80">• {example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AP CSA Content - SIMPLE */}
            {activeSection === 'ap-csa' && (
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/10">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{currentCsaTopic.name}</h2>
                  <p className="text-white/70">{currentCsaTopic.category} • AP CSA</p>
                  <div className="flex justify-center space-x-2 mt-2">
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-200 rounded-full text-sm">
                      {currentCsaTopic.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm">
                      {currentCsaTopic.examWeight}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/[0.05] p-4 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                    <p className="text-white/80">{currentCsaTopic.description}</p>
                  </div>

                  <div className="bg-orange-500/10 p-4 rounded-xl">
                    <h3 className="text-lg font-semibold text-orange-200 mb-2">Deep Dive</h3>
                    <p className="text-white/80">{currentCsaTopic.detailedExplanation}</p>
                  </div>

                  <div className="bg-emerald-500/10 p-4 rounded-xl">
                    <h3 className="text-lg font-semibold text-emerald-200 mb-2">Real-World Use</h3>
                    <p className="text-white/80">{currentCsaTopic.realWorldUse}</p>
                  </div>

                  {/* Feynman Technique */}
                  <div className="bg-purple-500/10 p-4 rounded-xl">
                    <h3 className="text-lg font-semibold text-purple-200 mb-2">🎯 Feynman Technique</h3>
                    <p className="text-white/80 mb-3">Explain this concept as if teaching a 12-year-old:</p>
                    <div className="bg-white/[0.05] p-3 rounded-lg">
                      <p className="text-sm text-white/70 italic">"{currentCsaTopic.name} is like..."</p>
                    </div>
                  </div>

                  {/* Subsections */}
                  {currentCsaTopic.subsections && (
                    <div className="bg-white/[0.05] p-4 rounded-xl mb-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Unit Subsections</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {currentCsaTopic.subsections.map((subsection, index) => (
                          <div key={index} className="bg-white/[0.05] p-3 rounded-lg border border-white/10">
                            <h4 className="text-sm font-semibold text-orange-200 mb-1">{subsection.id} - {subsection.title}</h4>
                            <p className="text-xs text-white/70">{subsection.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/[0.05] p-4 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-2">Key Concepts</h3>
                      <ul className="space-y-1">
                        {currentCsaTopic.keyConcepts.map((concept, index) => (
                          <li key={index} className="text-sm text-white/80">• {concept}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/[0.05] p-4 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-2">Examples</h3>
                      <ul className="space-y-1">
                        {currentCsaTopic.examples.map((example, index) => (
                          <li key={index} className="text-sm text-white/80">• {example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
