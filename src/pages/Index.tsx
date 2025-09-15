import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SplineBackground from '@/components/SplineBackground';
import { trackPageView } from '@/lib/analytics';

const Index = () => {
  const navigate = useNavigate();

  // Track page view when component mounts
  useEffect(() => {
    trackPageView('/');
  }, []);

  const handleContactClick = () => {
    console.log('Contact button clicked!');
    navigate('/contact');
  };

  const algorithms = [
    { name: 'Merge Sort', description: 'Divide and conquer sorting with guaranteed O(n log n) performance', emoji: '📊', color: 'from-blue-500 to-cyan-400', difficulty: 'Medium' },
    { name: 'Quick Sort', description: 'Efficient in-place sorting with excellent average-case performance', emoji: '⚡', color: 'from-purple-500 to-pink-400', difficulty: 'Medium' },
    { name: 'Binary Search', description: 'Lightning-fast search through sorted data structures', emoji: '🎯', color: 'from-emerald-500 to-teal-400', difficulty: 'Easy' },
    { name: 'Bubble Sort', description: 'Simple comparison-based sorting perfect for learning fundamentals', emoji: '💻', color: 'from-orange-500 to-red-400', difficulty: 'Easy' },
    { name: 'Insertion Sort', description: 'Intuitive sorting that builds the final array one element at a time', emoji: '📖', color: 'from-indigo-500 to-blue-400', difficulty: 'Easy' },
    { name: 'Selection Sort', description: 'Straightforward algorithm that finds minimums and builds sorted portion', emoji: '✅', color: 'from-green-500 to-emerald-400', difficulty: 'Easy' }
  ];

  const features = [
    { emoji: '🧠', title: 'Visual Learning', description: 'Watch algorithms come to life with step-by-step animations that make complex concepts intuitive and memorable.' },
    { emoji: '💻', title: 'Hands-On Practice', description: 'Apply your knowledge with carefully crafted coding challenges that reinforce algorithmic thinking.' },
    { emoji: '🎯', title: 'AP CS Focused', description: 'Curriculum-aligned content designed specifically for High School and Early College students.' },
    { emoji: '💡', title: 'Progressive Learning', description: 'Start with fundamentals and build complexity gradually with our structured learning paths.' }
  ];

  const stats = [
    { number: '6', label: 'Core Algorithms', emoji: '🧠' },
    { number: '15+', label: 'Practice Problems', emoji: '💻' },
    { number: 'Unlimited', label: 'User Interaction', emoji: '👥' },
    { number: '95%', label: 'Success Rate', emoji: '⭐' }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative section-padding pt-24 overflow-hidden">
        <SplineBackground />
        <div className="container-width relative z-10">
          <div className="text-center max-w-4xl mx-auto">

            {/* AlgoFlow Branding */}
            <div className="mb-3 animate-slide-up" style={{ animationDelay: '0s' }}>
              <span className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                AlgoFlow
              </span>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-primary/10 rounded-full text-primary font-medium text-sm mb-6 animate-slide-up">
              <span className="text-sm">⚡</span>
              <span>The Modern Way to Master Algorithms</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight animate-slide-up font-dm-sans" style={{ animationDelay: '0.1s' }}>
              Master Algorithms with
              <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
                Visual Learning
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
              The perfect platform for High School and Early College students to understand 
              core algorithms through stunning animations and <span className="font-semibold text-purple-600"> hands-on practice</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/learn">
                <Button className="btn-primary group">
                  <span className="mr-2 group-hover:scale-110 transition-transform">▶️</span>
                  Start Learning Free
                </Button>
              </Link>
              <Link to="/practice">
                <Button className="btn-secondary group">
                  <span className="mr-2 group-hover:scale-110 transition-transform">💻</span>
                  Try Practice Mode
                </Button>
              </Link>
              <Link to="/ap-topics">
                <Button className="btn-secondary group">
                  <span className="mr-2 group-hover:scale-110 transition-transform">🎓</span>
                  AP Topics
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                  <div className="glass-panel p-4 rounded-xl hover-lift group">
                    <div className="text-xl mb-2">{stat.emoji}</div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{stat.number}</div>
                    <div className="text-slate-600 font-medium text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section className="section-padding py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-dm-sans">
              What <span className="bg-gradient-primary bg-clip-text text-transparent">You'll Master</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Six fundamental algorithms that form the foundation of computer science, 
              taught through interactive visualizations and comprehensive explanations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {algorithms.map((algorithm, index) => (
              <div key={index} className="algorithm-card group hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-10 h-10 bg-gradient-to-r ${algorithm.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-lg`}>
                  {algorithm.emoji}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{algorithm.name}</h3>
                <p className="text-slate-600 mb-3 leading-relaxed text-sm">{algorithm.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    algorithm.difficulty === 'Easy'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {algorithm.difficulty}
                  </span>
                  <span className="text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all">➡️</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Visual Learning Works */}
      <section className="section-padding py-16 bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-dm-sans">
              Why <span className="bg-gradient-primary bg-clip-text text-transparent">Visual Learning</span> Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Research shows that combining visual learning with hands-on practice creates 
              the most effective educational experience for complex subjects like algorithms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="gradient-card hover-lift border-0 shadow-xl">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 text-xl">
                    {feature.emoji}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed flex-grow text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-16">
        <div className="container-width">
          <div className="glass-panel p-8 rounded-3xl text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-dm-sans">
              Ready to <span className="bg-gradient-primary bg-clip-text text-transparent">Master Algorithms</span>?
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Join our community of students who are excelling in their computer science studies
              with our interactive learning platform designed specifically for visual learners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="block" onClick={() => console.log('Contact Us clicked!')}>
                <Button className="btn-secondary group text-lg px-10 py-5 relative z-20 hover:bg-white/20">
                  💬 Contact Us
                </Button>
              </Link>
              <Link to="/login" className="block">
                <Button className="btn-primary group text-lg px-10 py-5 relative z-20">
                  🔐 Login
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
