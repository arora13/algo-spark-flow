
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Code, Trophy, Users, Zap, Brain, Target, BookOpen, ArrowRight, CheckCircle } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: 'Step-by-Step Animations',
      description: 'Watch algorithms unfold with beautiful, frame-by-frame visualizations that make complex concepts intuitive and easy to understand.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Code,
      title: 'Hands-on Practice',
      description: 'Code in our LeetCode-style editor with real-time feedback, hints, and AI-powered debugging assistance.',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Trophy,
      title: 'Track Your Progress',
      description: 'Monitor your learning journey with detailed analytics, achievements, and personalized study recommendations.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Target,
      title: 'AP CS Focused',
      description: 'Curriculum-aligned content specifically designed for AP Computer Science and early college CS students.',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

  const algorithms = [
    'Merge Sort', 'Quick Sort', 'Bubble Sort', 'Insertion Sort', 
    'Selection Sort', 'Binary Search'
  ];

  const stats = [
    { number: '6', label: 'Core Algorithms', icon: Zap },
    { number: '50+', label: 'Practice Problems', icon: Code },
    { number: '1000+', label: 'Students Learning', icon: Users },
    { number: '98%', label: 'Success Rate', icon: CheckCircle }
  ];

  const benefits = [
    'Visual learning through animations makes complex algorithms intuitive',
    'Practice coding with immediate feedback and AI-powered hints',
    'Perfect for AP Computer Science exam preparation',
    'Track progress and build confidence with structured learning paths'
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 -top-32 -left-32" style={{ animationDelay: '0s' }} />
        <div className="floating-shape w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 top-1/4 right-10" style={{ animationDelay: '2s' }} />
        <div className="floating-shape w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 bottom-20 left-1/4" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 glass-card text-slate-700 text-sm font-medium">
                🚀 The Modern Way to Learn Algorithms
              </span>
            </div>
            
            <h1 className="font-poppins font-bold text-5xl sm:text-6xl lg:text-7xl text-slate-900 leading-tight mb-8">
              Master Algorithms with
              <span className="block gradient-text text-6xl sm:text-7xl lg:text-8xl mt-2">
                AlgoFlow
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              The perfect learning platform for AP Computer Science and college students. 
              Learn core algorithms through <span className="font-semibold text-blue-600">stunning animations</span> and 
              <span className="font-semibold text-purple-600"> hands-on practice</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link to="/learn">
                <Button size="lg" className="premium-button text-white px-10 py-4 text-lg font-semibold w-full sm:w-auto group">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Learning Free
                </Button>
              </Link>
              <Link to="/practice">
                <Button size="lg" className="glass-card hover:bg-white/90 text-slate-700 px-10 py-4 text-lg font-semibold border-white/60 w-full sm:w-auto group">
                  <Code className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Try Practice Mode
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="glass-card p-6 mb-4 group hover:scale-105 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3 group-hover:text-purple-600 transition-colors" />
                    <div className="text-3xl font-bold text-slate-900 gradient-text mb-2">{stat.number}</div>
                    <div className="text-slate-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why AlgoFlow Works Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-poppins font-bold text-4xl sm:text-5xl text-slate-900 mb-6">
              Why <span className="gradient-text">Animations + Practice</span> Work
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Research shows that visual learning combined with hands-on practice creates the most effective learning experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card hover:scale-105 transition-all duration-500 group slide-up soft-glow" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-poppins font-bold text-xl text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect for Students Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-poppins font-bold text-4xl sm:text-5xl text-slate-900 mb-6">
                Perfect for <span className="gradient-text">AP CS Students</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Designed specifically for AP Computer Science and early college students who need to understand algorithms deeply, not just memorize them.
              </p>
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-700">{benefit}</p>
                  </div>
                ))}
              </div>
              <Link to="/learn">
                <Button className="premium-button text-white px-8 py-3 text-lg font-semibold group">
                  <BookOpen className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="glass-card p-8">
              <h3 className="font-poppins font-bold text-2xl text-slate-900 mb-6 text-center">
                What You'll Master
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {algorithms.map((algorithm, index) => (
                  <div
                    key={index}
                    className="glass-card p-4 text-center hover:scale-105 transition-all duration-200 cursor-pointer group slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="text-slate-700 font-medium group-hover:text-blue-600 transition-colors">{algorithm}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-16 soft-glow">
            <h2 className="font-poppins font-bold text-4xl sm:text-5xl text-slate-900 mb-6">
              Ready to <span className="gradient-text">Master Algorithms</span>?
            </h2>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Join thousands of students who are acing their AP Computer Science exams with our immersive learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/login">
                <Button size="lg" className="premium-button text-white px-10 py-4 text-lg font-semibold w-full sm:w-auto group">
                  <Trophy className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/learn">
                <Button size="lg" className="glass-card text-slate-700 hover:bg-white/90 px-10 py-4 text-lg font-semibold border-white/60 w-full sm:w-auto group">
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
