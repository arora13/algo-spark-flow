import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Code, 
  Database, 
  Network, 
  Users, 
  Shield, 
  Zap, 
  Target,
  CheckCircle,
  ArrowRight,
  Brain,
  Cpu,
  Globe,
  Lock
} from 'lucide-react';

const APTopics = () => {
  const [selectedCourse, setSelectedCourse] = useState<'CSA' | 'CSP'>('CSA');
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const csaUnits = [
    {
      id: 'unit1',
      title: 'Using Objects and Methods',
      percentage: '15-25%',
      icon: Code,
      color: 'from-blue-500 to-cyan-400',
      topics: [
        'Introduction to algorithms and programming',
        'Variables & primitive data types',
        'Expressions & I/O',
        'Assignment, casting, range issues',
        'Using APIs & libraries',
        'Methods: signatures, class & instance methods',
        'String manipulation',
        'Object creation',
        'Commenting & documentation'
      ],
      algorithms: ['Linear Search', 'Basic String Algorithms', 'Object-Oriented Programming']
    },
    {
      id: 'unit2',
      title: 'Selection & Iteration',
      percentage: '25-35%',
      icon: Target,
      color: 'from-purple-500 to-pink-400',
      topics: [
        'Boolean expressions',
        'if, nested if, compound Boolean logic',
        'Loops: while, for, nested loops',
        'String algorithms',
        'Informal runtime / performance analysis',
        'Iteration over collections or arrays'
      ],
      algorithms: ['Linear Search', 'String Processing', 'Array Traversal']
    },
    {
      id: 'unit3',
      title: 'Class Creation',
      percentage: '10-18%',
      icon: Brain,
      color: 'from-emerald-500 to-teal-400',
      topics: [
        'Abstraction & program design',
        'Writing classes: constructors, instance/static variables, methods',
        'Scope, access modifiers, encapsulation',
        'this keyword',
        'Passing/returning object references',
        'Use of classes and objects in designs'
      ],
      algorithms: ['Object-Oriented Design Patterns', 'Encapsulation Techniques']
    },
    {
      id: 'unit4',
      title: 'Data Collections',
      percentage: '30-40%',
      icon: Database,
      color: 'from-orange-500 to-red-400',
      topics: [
        'Working with arrays, two-dimensional arrays',
        'ArrayList usage and methods',
        'Traversal, searching, and sorting algorithms',
        'Recursion (e.g. recursive search/sort)',
        'Use of datasets & text files',
        'Wrapper classes',
        'Ethical/social issues around data collection',
        'Efficiency considerations (runtime etc.)'
      ],
      algorithms: ['Merge Sort', 'Quick Sort', 'Binary Search', 'Bubble Sort', 'Insertion Sort', 'Selection Sort', 'Two Pointers Technique']
    }
  ];

  const cspUnits = [
    {
      id: 'bigidea1',
      title: 'Creative Development',
      icon: Brain,
      color: 'from-blue-500 to-cyan-400',
      topics: [
        'How programs are designed and developed',
        'Importance of collaboration',
        'The development process',
        'Designing user interfaces',
        'Correcting errors'
      ],
      algorithms: ['Problem-Solving Strategies', 'Design Thinking', 'User Experience Design']
    },
    {
      id: 'bigidea2',
      title: 'Data',
      icon: Database,
      color: 'from-purple-500 to-pink-400',
      topics: [
        'How data are represented',
        'Extracting information from data',
        'Data compression',
        'Using data in programs'
      ],
      algorithms: ['Data Processing', 'Data Analysis', 'Data Visualization']
    },
    {
      id: 'bigidea3',
      title: 'Algorithms & Programming',
      icon: Code,
      color: 'from-emerald-500 to-teal-400',
      topics: [
        'Writing algorithms',
        'Abstraction',
        'Programming constructs (conditionals, loops, lists)',
        'Evaluating algorithms (efficiency, correctness)',
        'Simulations'
      ],
      algorithms: ['All Sorting Algorithms', 'All Search Algorithms', 'Algorithm Analysis', 'Simulation Design']
    },
    {
      id: 'bigidea4',
      title: 'Computer Systems & Networks',
      icon: Network,
      color: 'from-orange-500 to-red-400',
      topics: [
        'How computer systems work',
        'Basics of the Internet',
        'Parallel & distributed computing',
        'Fault tolerance'
      ],
      algorithms: ['Network Algorithms', 'Distributed Computing', 'System Design']
    },
    {
      id: 'bigidea5',
      title: 'Impact of Computing',
      icon: Users,
      color: 'from-indigo-500 to-blue-400',
      topics: [
        'Societal, cultural, economic effects of computing',
        'Ethical issues',
        'Computing bias',
        'Digital divide',
        'Safe computing',
        'Legal & policy issues'
      ],
      algorithms: ['Ethical Algorithm Design', 'Bias Detection', 'Privacy-Preserving Algorithms']
    }
  ];

  const currentUnits = selectedCourse === 'CSA' ? csaUnits : cspUnits;

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
            AP Computer Science{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {selectedCourse === 'CSA' ? 'A' : 'Principles'}
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-white/85 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {selectedCourse === 'CSA' 
              ? 'Master Java programming and object-oriented design with our comprehensive AP Computer Science A curriculum.'
              : 'Explore the fundamental concepts of computer science and computational thinking with AP Computer Science Principles.'
            }
          </motion.p>

          {/* Course Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/[0.08] backdrop-blur-sm rounded-2xl p-2 border border-white/10">
              <div className="flex space-x-2">
                <motion.button
                  onClick={() => setSelectedCourse('CSA')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    selectedCourse === 'CSA'
                      ? 'bg-blue-500/20 text-blue-200'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  AP Computer Science A
                </motion.button>
                <motion.button
                  onClick={() => setSelectedCourse('CSP')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    selectedCourse === 'CSP'
                      ? 'bg-green-500/20 text-green-200'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  AP Computer Science Principles
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Units Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentUnits.map((unit, index) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedUnit(selectedUnit === unit.id ? null : unit.id)}
              className="group cursor-pointer"
            >
              <Card className="bg-white/[0.06] border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full rounded-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${unit.color} flex items-center justify-center shadow-lg`}>
                      <unit.icon className="h-6 w-6 text-white" />
                    </div>
                    {selectedCourse === 'CSA' && 'percentage' in unit && (
                      <Badge variant="outline" className="text-xs">
                        {unit.percentage}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold mb-2">{unit.title}</CardTitle>
                  {selectedCourse === 'CSA' && 'percentage' in unit && (
                    <p className="text-white/60 text-sm">Exam Weight: {unit.percentage}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white/90 mb-2">Key Topics:</h4>
                      <div className="space-y-1">
                        {unit.topics.slice(0, 3).map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                            <span className="text-white/70 text-sm">{topic}</span>
                          </div>
                        ))}
                        {unit.topics.length > 3 && (
                          <span className="text-white/50 text-xs">
                            +{unit.topics.length - 3} more topics
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white/90 mb-2">Related Algorithms:</h4>
                      <div className="flex flex-wrap gap-1">
                        {unit.algorithms.slice(0, 2).map((algo, algoIndex) => (
                          <Badge key={algoIndex} variant="secondary" className="text-xs">
                            {algo}
                          </Badge>
                        ))}
                        {unit.algorithms.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{unit.algorithms.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-white/60 text-sm">
                        {selectedUnit === unit.id ? 'Click to collapse' : 'Click to expand'}
                      </span>
                      <ArrowRight className={`h-4 w-4 text-white/60 transition-transform ${
                        selectedUnit === unit.id ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Expanded Unit Details */}
        {selectedUnit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            {(() => {
              const unit = currentUnits.find(u => u.id === selectedUnit);
              if (!unit) return null;

              return (
                <Card className="bg-white/[0.08] border border-white/10 shadow-xl rounded-2xl">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${unit.color} flex items-center justify-center shadow-lg`}>
                        <unit.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl font-bold">{unit.title}</CardTitle>
                        {selectedCourse === 'CSA' && 'percentage' in unit && (
                          <p className="text-white/70 mt-1">Exam Weight: {unit.percentage}</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* All Topics */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-blue-300" />
                        Complete Topic List
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {unit.topics.map((topic, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center space-x-3 p-3 bg-white/[0.05] rounded-lg border border-white/10"
                          >
                            <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                            <span className="text-white/90">{topic}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Related Algorithms */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Code className="h-5 w-5 mr-2 text-purple-300" />
                        Related Algorithms & Data Structures
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {unit.algorithms.map((algo, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-white/[0.05] rounded-lg border border-white/10 text-center"
                          >
                            <div className="text-white/90 font-medium">{algo}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Study Tips */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-emerald-300" />
                        Study Tips
                      </h3>
                      <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-6">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <Zap className="h-5 w-5 text-emerald-300 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-emerald-200 mb-1">Practice Regularly</h4>
                              <p className="text-emerald-100/90 text-sm">
                                {selectedCourse === 'CSA' 
                                  ? 'Write Java code daily. Focus on object-oriented programming concepts and algorithm implementation.'
                                  : 'Work on computational thinking problems. Practice algorithm design and analysis.'
                                }
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Target className="h-5 w-5 text-emerald-300 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-emerald-200 mb-1">Focus on Fundamentals</h4>
                              <p className="text-emerald-100/90 text-sm">
                                {selectedCourse === 'CSA'
                                  ? 'Master the basics: variables, loops, conditionals, and method writing before moving to complex topics.'
                                  : 'Understand the big ideas deeply. Don\'t just memorize - understand the underlying concepts.'
                                }
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-emerald-300 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-emerald-200 mb-1">Use Our Tools</h4>
                              <p className="text-emerald-100/90 text-sm">
                                'Practice with our interactive algorithm visualizations and coding challenges. Use the Feynman technique to explain concepts in simple terms.'
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })()}
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="bg-white/[0.08] border border-white/10 shadow-xl rounded-2xl max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Master {selectedCourse === 'CSA' ? 'AP Computer Science A' : 'AP Computer Science Principles'}?
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Start practicing with our interactive algorithm visualizations and coding challenges designed specifically for AP students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 border border-blue-400/30">
                  <Code className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
                <Button className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-400/30">
                  <Target className="h-4 w-4 mr-2" />
                  Practice Problems
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default APTopics;
