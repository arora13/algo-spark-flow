
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FloatingElements from '@/components/FloatingElements';
import { 
  Play, Code, Brain, Target, Zap, CheckCircle, ArrowRight, 
  BarChart3, Users, Clock, Star, BookOpen, Lightbulb 
} from 'lucide-react';

const Index = () => {
  const algorithms = [
    {
      name: 'Merge Sort',
      description: 'Divide and conquer sorting with guaranteed O(n log n) performance',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-400',
      difficulty: 'Medium'
    },
    {
      name: 'Quick Sort',
      description: 'Efficient in-place sorting with excellent average-case performance',
      icon: Zap,
      color: 'from-purple-500 to-pink-400',
      difficulty: 'Medium'
    },
    {
      name: 'Binary Search',
      description: 'Lightning-fast search through sorted data structures',
      icon: Target,
      color: 'from-emerald-500 to-teal-400',
      difficulty: 'Easy'
    },
    {
      name: 'Bubble Sort',
      description: 'Simple comparison-based sorting perfect for learning fundamentals',
      icon: Code,
      color: 'from-orange-500 to-red-400',
      difficulty: 'Easy'
    },
    {
      name: 'Insertion Sort',
      description: 'Intuitive sorting that builds the final array one element at a time',
      icon: BookOpen,
      color: 'from-indigo-500 to-blue-400',
      difficulty: 'Easy'
    },
    {
      name: 'Selection Sort',
      description: 'Straightforward algorithm that finds minimums and builds sorted portion',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-400',
      difficulty: 'Easy'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'Visual Learning',
      description: 'Watch algorithms come to life with step-by-step animations that make complex concepts intuitive and memorable.'
    },
    {
      icon: Code,
      title: 'Hands-On Practice',
      description: 'Apply your knowledge with carefully crafted coding challenges that reinforce algorithmic thinking.'
    },
    {
      icon: Target,
      title: 'AP CS Focused',
      description: 'Curriculum-aligned content designed specifically for High School and Early College students.'
    },
    {
      icon: Lightbulb,
      title: 'Progressive Learning',
      description: 'Start with fundamentals and build complexity gradually with our structured learning paths.'
    }
  ];

  const stats = [
    { number: '6', label: 'Core Algorithms', icon: Brain },
    { number: '15+', label: 'Practice Problems', icon: Code },
    { number: 'Unlimited+', label: 'User Interaction', icon: Users },
    { number: '95%', label: 'Success Rate', icon: Star }
  ];

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="relative section-padding pt-32">
        <div className="container-width relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-primary/10 rounded-full text-primary font-medium text-sm mb-8 animate-slide-up">
              <Zap className="w-4 h-4" />
              <span>The Modern Way to Master Algorithms</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight animate-slide-up font-dm-sans" style={{ animationDelay: '0.1s' }}>
              Master Algorithms with
              <span className="block bg-gradient-primary bg-clip-text text-transparent mt-4">
                Visual Learning
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              The perfect platform for High School and Early College students to understand 
              core algorithms through stunning animations and <span className="font-semibold text-purple-600"> hands-on practice</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/learn">
                <Button className="btn-primary group">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Learning Free
                </Button>
              </Link>
              <Link to="/practice">
                <Button className="btn-secondary group">
                  <Code className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Try Practice Mode
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="glass-panel p-6 rounded-2xl hover-lift group">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                    <div className="text-slate-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-dm-sans">
              What <span className="bg-gradient-primary bg-clip-text text-transparent">You'll Master</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Six fundamental algorithms that form the foundation of computer science, 
              taught through interactive visualizations and comprehensive explanations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {algorithms.map((algorithm, index) => (
              <div key={index} className="algorithm-card group hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-12 h-12 bg-gradient-to-r ${algorithm.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <algorithm.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{algorithm.name}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{algorithm.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    algorithm.difficulty === 'Easy' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {algorithm.difficulty}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Visual Learning Works */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-dm-sans">
              Why <span className="bg-gradient-primary bg-clip-text text-transparent">Visual Learning</span> Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Research shows that combining visual learning with hands-on practice creates 
              the most effective educational experience for complex subjects like algorithms.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="gradient-card hover-lift border-0 shadow-xl">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed flex-grow">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-width">
          <div className="glass-panel p-16 rounded-3xl text-center max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-dm-sans">
              Ready to <span className="bg-gradient-primary bg-clip-text text-transparent">Master Algorithms</span>?
            </h2>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Join our community of students who are excelling in their computer science studies 
              with our interactive learning platform designed specifically for visual learners.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/signup">
                <Button className="btn-primary group text-lg px-10 py-5">
                  <Brain className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/learn">
                <Button className="btn-secondary group text-lg px-10 py-5">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
