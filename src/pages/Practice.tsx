import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FloatingElements from "@/components/FloatingElements";
import StudyTools from "@/components/StudyTools";

const Practice = () => {
  const algorithmCategories = [
    {
      title: "BUBBLE SORT",
      icon: "🫧",
      problems: [
        { name: "Bubble Sort Basic Algorithm", difficulty: "Easy" },
        { name: "Count swaps in Bubble Sort", difficulty: "Easy" },
        { name: "Bubble Sort Strings", difficulty: "Medium" },
        { name: "Bubble Sort Iteration Counter", difficulty: "Medium" },
        { name: "Custom Bubble Sort", difficulty: "Hard" }
      ]
    },
    {
      title: "MERGE SORT",
      icon: "📊",
      problems: [
        { name: "Merge Two Sorted Arrays", difficulty: "Easy" },
        { name: "Recursive Maximum of an Array", difficulty: "Easy" },
        { name: "Merge Sort Basic Algorithm", difficulty: "Medium" },
        { name: "Count Inversions using Merge Sort", difficulty: "Medium" },
        { name: "Counting Reverse Pairs", difficulty: "Hard" }
      ]
    },
    {
      title: "SELECTION SORT",
      icon: "✅",
      problems: [
        { name: "Find the Minimum Index", difficulty: "Easy" },
        { name: "Selection Sort Basic Algorithm", difficulty: "Easy" },
        { name: "Custom Selection Sort Comparison", difficulty: "Medium" },
        { name: "Selection Sort Students by Score", difficulty: "Hard" }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0b1f24] text-white">
      <FloatingElements />
      <StudyTools />
      <div className="relative z-10 pt-28 pb-16 max-w-6xl mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Algorithm Problems
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Practice sorting algorithms with interactive challenges
            </p>
          </motion.div>

          {/* Algorithm Categories */}
          <div className="grid lg:grid-cols-3 gap-8">
            {algorithmCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                className="h-full"
              >
                <Card className="glass-panel border-0 shadow-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 h-full">
                  <CardContent className="p-6">
                    {/* Category Header */}
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-4 text-2xl">
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">{category.title}</h2>
                        <p className="text-sm text-slate-400">{category.problems.length} problems</p>
                      </div>
                    </div>

                    {/* Problems List */}
                    <div className="space-y-3">
                      {category.problems.map((problem, problemIndex) => (
                        <motion.div
                          key={problem.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 * problemIndex }}
                          className="group"
                        >
                          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-600/40 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]">
                            <span className="text-white text-sm font-medium flex-1">
                              {problem.name}
                            </span>
                            <Badge 
                              className={`text-xs px-2 py-1 border ${getDifficultyColor(problem.difficulty)}`}
                            >
                              {problem.difficulty}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <Card className="glass-panel border-0 shadow-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">🚧</div>
                <h3 className="text-2xl font-bold text-white mb-4">Interactive Practice Coming Soon!</h3>
                <p className="text-slate-300 max-w-2xl mx-auto mb-6">
                  We're working on bringing you interactive coding challenges with real-time feedback, 
                  step-by-step solutions, and progress tracking for each algorithm.
                </p>
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/30">
                  <h4 className="text-xl font-semibold text-white mb-3">🚀 Major Features Coming:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div>
                      <h5 className="text-lg font-medium text-white mb-2">💻 Interactive Code Editor</h5>
                      <p className="text-sm text-slate-300">
                        Real-time code execution with syntax highlighting, auto-completion, and instant feedback
                      </p>
                    </div>
                    <div>
                      <h5 className="text-lg font-medium text-white mb-2">📚 More Algorithms</h5>
                      <p className="text-sm text-slate-300">
                        Advanced sorting, searching, graph algorithms, and dynamic programming problems
                      </p>
                    </div>
                    <div>
                      <h5 className="text-lg font-medium text-white mb-2">⚡ Live Execution</h5>
                      <p className="text-sm text-slate-300">
                        Run your code instantly with test cases, performance analysis, and debugging tools
                      </p>
                    </div>
                    <div>
                      <h5 className="text-lg font-medium text-white mb-2">🎯 Smart Hints</h5>
                      <p className="text-sm text-slate-300">
                        AI-powered hints and explanations that adapt to your learning progress
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Practice;