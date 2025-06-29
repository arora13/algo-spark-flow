
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Code, Trophy, Users, Zap, Brain, Target, Sparkles } from 'lucide-react';
import CosmicBackground from '@/components/CosmicBackground';

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: 'Interactive Visualizations',
      description: 'Watch algorithms come to life with frame-by-frame animated explanations that make complex concepts crystal clear.',
      gradient: 'from-algo-blue to-algo-purple'
    },
    {
      icon: Code,
      title: 'Hands-on Practice',
      description: 'Code in our advanced terminal-style editor with real-time feedback, AI assistance, and instant debugging help.',
      gradient: 'from-algo-purple to-algo-pink'
    },
    {
      icon: Trophy,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics, achievements, and personalized study recommendations.',
      gradient: 'from-algo-pink to-algo-cyan'
    },
    {
      icon: Target,
      title: 'Built for Students',
      description: 'Specifically designed for AP Computer Science and early college CS students with curriculum-aligned content.',
      gradient: 'from-algo-cyan to-neon-blue'
    }
  ];

  const algorithms = [
    'Merge Sort', 'Quick Sort', 'Bubble Sort', 'Insertion Sort', 
    'Selection Sort', 'Binary Search', 'Depth-First Search',
    'Breadth-First Search', 'Dijkstra\'s Algorithm', 'Dynamic Programming'
  ];

  const stats = [
    { number: '10+', label: 'Core Algorithms', icon: Zap },
    { number: '50+', label: 'Practice Problems', icon: Code },
    { number: '1000+', label: 'Students Learning', icon: Users },
    { number: '98%', label: 'Success Rate', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen relative">
      <CosmicBackground />
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-32 pb-40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm font-medium">
                🚀 The Future of Algorithm Learning
              </span>
            </div>
            
            <h1 className="font-poppins font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-8">
              Master Algorithms with
              <span className="block cosmic-text text-6xl sm:text-7xl lg:text-8xl mt-2">
                AlgoFlow
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto">
              Experience the most immersive way to learn computer science algorithms through 
              <span className="text-neon-blue font-semibold"> stunning visualizations</span>, 
              <span className="text-algo-pink font-semibold"> interactive coding challenges</span>, and 
              <span className="text-neon-purple font-semibold"> AI-powered assistance</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link to="/learn">
                <Button size="lg" className="cosmic-button text-white px-10 py-4 text-lg font-semibold w-full sm:w-auto group">
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Learning Free
                </Button>
              </Link>
              <Link to="/practice">
                <Button size="lg" className="glass-morphism text-white hover:bg-white/20 px-10 py-4 text-lg font-semibold border-white/30 w-full sm:w-auto group">
                  <Code className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Try Practice Mode
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="cosmic-card p-6 mb-4 group hover:scale-105 transition-all duration-300">
                    <stat.icon className="h-8 w-8 text-neon-blue mx-auto mb-3 group-hover:text-neon-purple transition-colors" />
                    <div className="text-3xl font-bold text-white cosmic-text mb-2">{stat.number}</div>
                    <div className="text-white/70 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-poppins font-bold text-4xl sm:text-5xl text-white mb-6">
              Why Choose <span className="cosmic-text">AlgoFlow</span>?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We've reimagined algorithm education with cutting-edge technology and stunning visual design
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="cosmic-card hover:scale-105 transition-all duration-500 group slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 neon-glow`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-poppins font-bold text-xl text-white mb-4 group-hover:text-neon-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="font-poppins font-bold text-4xl sm:text-5xl text-white mb-6">
            Master <span className="cosmic-text">Essential Algorithms</span>
          </h2>
          <p className="text-xl text-white/80 mb-16 max-w-3xl mx-auto">
            From fundamental sorting and searching to advanced graph algorithms and dynamic programming
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {algorithms.map((algorithm, index) => (
              <span
                key={index}
                className="px-6 py-3 cosmic-card text-white font-medium hover:scale-105 transition-all duration-200 cursor-pointer group slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="group-hover:text-neon-blue transition-colors">{algorithm}</span>
              </span>
            ))}
          </div>
          
          <Link to="/learn">
            <Button size="lg" className="cosmic-button text-white px-10 py-4 text-lg font-semibold group">
              <Brain className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Explore All Algorithms
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="cosmic-card p-16 neon-glow">
            <h2 className="font-poppins font-bold text-4xl sm:text-5xl text-white mb-6">
              Ready to <span className="cosmic-text">Level Up</span> Your Skills?
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Join thousands of students who are mastering algorithms with our immersive, 
              next-generation learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/login">
                <Button size="lg" className="bg-white text-cosmic-dark hover:bg-white/90 px-10 py-4 text-lg font-semibold w-full sm:w-auto group">
                  <Sparkles className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/learn">
                <Button size="lg" className="cosmic-button text-white px-10 py-4 text-lg font-semibold w-full sm:w-auto group">
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
