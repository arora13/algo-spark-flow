import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FloatingElements from "@/components/FloatingElements";
import StudyTools from "@/components/StudyTools";
import { useNavigate } from "react-router-dom";
import problemsData from "@/data/problems.json";

const Practice = () => {
  const navigate = useNavigate();

  const algorithmCategories = [
    {
      title: "BUBBLE SORT",
      icon: "🫧",
      key: "bubble_sort",
      problems: problemsData.bubble_sort.map(problem => ({
        name: problem.title,
        difficulty: problem.difficulty,
        id: problem.id,
        description: problem.description
      }))
    },
    {
      title: "MERGE SORT",
      icon: "📊",
      key: "merge_sort",
      problems: problemsData.merge_sort.map(problem => ({
        name: problem.title,
        difficulty: problem.difficulty,
        id: problem.id,
        description: problem.description
      }))
    },
    {
      title: "SELECTION SORT",
      icon: "✅",
      key: "selection_sort",
      problems: problemsData.selection_sort.map(problem => ({
        name: problem.title,
        difficulty: problem.difficulty,
        id: problem.id,
        description: problem.description
      }))
    },
    {
      title: "QUICK SORT",
      icon: "⚡",
      key: "quick_sort",
      problems: problemsData.quick_sort.map(problem => ({
        name: problem.title,
        difficulty: problem.difficulty,
        id: problem.id,
        description: problem.description
      }))
    },
    {
      title: "INSERTION SORT",
      icon: "📖",
      key: "insertion_sort",
      problems: problemsData.insertion_sort.map(problem => ({
        name: problem.title,
        difficulty: problem.difficulty,
        id: problem.id,
        description: problem.description
      }))
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

  const handleProblemClick = (categoryKey: string, problemId: number) => {
    const problem = problemsData[categoryKey].find(p => p.id === problemId);
    if (problem) {
      // Navigate to coding page with problem data
      navigate('/practice/coding', { 
        state: { 
          problem: {...problem, categoryKey},
          initialCode: `def solve(input_data):
        # Your solution here
        # Example: ${problem.examples?.[0]?.input ? JSON.stringify(problem.examples[0].input) : 'input_data'}
        return result`
        }
      });
    }
  };


    return (
      <div className="min-h-screen relative overflow-hidden bg-[#0b1f24] text-white">
        <FloatingElements />
        <StudyTools />
      <div className="relative z-10 pt-24 pb-16 max-w-6xl mx-auto px-4">
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
                          <button
                            onClick={() => handleProblemClick(category.key, problem.id)}
                            className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-600/40 transition-all duration-300 cursor-pointer group-hover:scale-[1.02] text-left"
                          >
                            <span className="text-white text-sm font-medium flex-1">
                              {problem.name}
                                </span>
                                <Badge 
                              className={`text-xs px-2 py-1 border ${getDifficultyColor(problem.difficulty)}`}
                                >
                                  {problem.difficulty}
                                </Badge>
                        </button>
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
              <CardContent className="p-6">
                <div className="text-2xl mb-3">🚧</div>
                <h3 className="text-xl font-bold text-white mb-3">Interactive Practice Coming Soon!</h3>
                <p className="text-slate-300 max-w-xl mx-auto mb-4 text-sm">
                  We're working on bringing you interactive coding challenges with real-time feedback, 
                  step-by-step solutions, and progress tracking for each algorithm.
                </p>
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-4 border border-blue-500/30">
                  <h4 className="text-lg font-semibold text-white mb-2">🚀 Major Features Coming:</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-left">
                <div>
                      <h5 className="text-sm font-medium text-white mb-1">💻 Interactive Code Editor</h5>
                      <p className="text-xs text-slate-300">
                        Real-time code execution with syntax highlighting and instant feedback
                                  </p>
                                </div>
                    <div>
                      <h5 className="text-sm font-medium text-white mb-1">📚 More Algorithms</h5>
                      <p className="text-xs text-slate-300">
                        Advanced sorting, searching, and graph algorithms
                                    </p>
                                  </div>
                <div>
                      <h5 className="text-sm font-medium text-white mb-1">⚡ Live Execution</h5>
                      <p className="text-xs text-slate-300">
                        Run code instantly with test cases and performance analysis
                                  </p>
                                </div>
                        <div>
                      <h5 className="text-sm font-medium text-white mb-1">🎯 Smart Hints</h5>
                      <p className="text-xs text-slate-300">
                        AI-powered hints that adapt to your learning progress
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