
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FloatingElements from '@/components/FloatingElements';
import { 
  Brain, Code, Target, Users, BookOpen, Lightbulb, 
  ChevronRight, Star, Award, Zap, Heart 
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'Visual Learning',
      description: 'Interactive animations that break down complex algorithms into understandable steps.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: 'Hands-On Practice',
      description: 'LeetCode-style coding challenges that reinforce theoretical knowledge with practical application.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Targeted Learning',
      description: 'Curriculum specifically designed for High School and Early College students.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Lightbulb,
      title: 'Step-by-Step Guidance',
      description: 'Clear explanations, hints, and pseudocode to help you understand each algorithm deeply.',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const algorithms = [
    'Merge Sort', 'Quick Sort', 'Binary Search', 'Bubble Sort', 
    'Insertion Sort', 'Selection Sort', 'Heap Sort', 'Depth-First Search'
  ];

  const stats = [
    { number: '8+', label: 'Core Algorithms' },
    { number: '25+', label: 'Practice Problems' },
    { number: '100+', label: 'Interactive Steps' },
    { number: '24/7', label: 'Available Learning' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingElements />
      
      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
              About AlgoFlow
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A modern learning platform that makes computer science algorithms accessible, 
              visual, and engaging for students at every level.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <Card className="glass-panel border-0 shadow-2xl">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
                    <p className="text-lg text-slate-700 leading-relaxed mb-6">
                      We believe that understanding algorithms shouldn't be about memorizing code or 
                      struggling through abstract concepts. AlgoFlow transforms the way students learn 
                      by combining visual storytelling with hands-on practice.
                    </p>
                    <p className="text-lg text-slate-700 leading-relaxed mb-8">
                      Our platform is designed specifically for High School and Early College 
                      students who want to build a solid foundation in algorithmic thinking and 
                      problem-solving skills.
                    </p>
                    <div className="flex items-center space-x-4">
                      <Heart className="h-6 w-6 text-red-500" />
                      <span className="text-slate-700 font-medium">Made with passion for education</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center">
                      <div className="w-60 h-60 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                        <Users className="h-24 w-24 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose AlgoFlow?</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                We've designed every feature to make algorithm learning intuitive and effective.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Card className="glass-panel border-0 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Algorithms Covered */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <Card className="glass-panel border-0 shadow-2xl">
              <CardContent className="p-12">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">Algorithms We Cover</h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    From fundamental sorting algorithms to advanced search techniques, 
                    we cover the essential algorithms every CS student should master.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {algorithms.map((algorithm, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <span className="text-slate-800 font-medium">{algorithm}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="text-center"
                >
                  <Card className="glass-panel border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-8">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {stat.number}
                      </div>
                      <div className="text-slate-600 font-medium">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center"
          >
            <Card className="glass-panel border-0 shadow-2xl">
              <CardContent className="p-12">
                <div className="max-w-2xl mx-auto">
                  <Star className="h-12 w-12 text-amber-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Ready to Master Algorithms?
                  </h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Join our community of students who hope to transform their understanding 
                    of computer science through visual learning and hands-on practice.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/learn">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Start Learning
                      </Button>
                    </Link>
                    <Link to="/practice">
                      <Button variant="outline" className="border-2 border-slate-300 hover:border-slate-400 px-8 py-4 text-lg hover:bg-slate-50 transition-all duration-300">
                        <Code className="mr-2 h-5 w-5" />
                        Practice Problems
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
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

export default About;
