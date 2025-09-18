import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SplineBackground from '@/components/SplineBackground';
import StudyTools from '@/components/StudyTools';
import { trackPageView } from '@/lib/analytics';

const Index = () => {
  const navigate = useNavigate(); // For routing around the app

  // Track page view when component mounts - analytics are cool! 📊
  useEffect(() => {
    trackPageView('/');
  }, []);

  // Handle contact button click - simple but effective! 🎯
  const handleContactClick = () => {
    console.log('Contact button clicked!');
    navigate('/contact');
  };

  // Our featured algorithms - the stars of the show! ⭐
  const featuredAlgorithms = [
    { name: 'Merge Sort', description: 'Divide and conquer sorting with guaranteed O(n log n) performance', emoji: '📊', color: 'from-blue-500 to-cyan-400', difficulty: 'Medium', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center' },
    { name: 'Quick Sort', description: 'Efficient in-place sorting with excellent average-case performance', emoji: '⚡', color: 'from-purple-500 to-pink-400', difficulty: 'Medium', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center' },
    { name: 'Binary Search', description: 'Lightning-fast search through sorted data structures', emoji: '🎯', color: 'from-emerald-500 to-teal-400', difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&crop=center' },
    { name: 'Bubble Sort', description: 'Simple comparison-based sorting perfect for learning fundamentals', emoji: '💻', color: 'from-orange-500 to-red-400', difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center' },
    { name: 'Insertion Sort', description: 'Intuitive sorting that builds the final array one element at a time', emoji: '📖', color: 'from-indigo-500 to-blue-400', difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=center' },
    { name: 'Selection Sort', description: 'Straightforward algorithm that finds minimums and builds sorted portion', emoji: '✅', color: 'from-green-500 to-emerald-400', difficulty: 'Easy', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center' },
    { name: 'Heap Sort', description: 'Efficient sorting using binary heap data structure', emoji: '🏗️', color: 'from-yellow-500 to-orange-400', difficulty: 'Hard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center' },
    { name: 'Depth-First Search', description: 'Graph traversal algorithm that explores as far as possible', emoji: '🔍', color: 'from-teal-500 to-cyan-400', difficulty: 'Medium', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&crop=center' }
  ];

  const apTopics = [
    { name: 'AP Computer Science A', description: 'Master Java programming, object-oriented design, and data structures', emoji: '☕', color: 'from-orange-500 to-red-400', difficulty: 'Advanced', topics: ['Java Fundamentals', 'OOP Concepts', 'Data Structures', 'Algorithms'], image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop&crop=center' },
    { name: 'AP Computer Science Principles', description: 'Explore computational thinking, data analysis, and the impact of computing', emoji: '🎯', color: 'from-green-500 to-emerald-400', difficulty: 'Intermediate', topics: ['Creative Development', 'Data & Information', 'Algorithms & Programming', 'Computer Systems', 'Impact of Computing'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop&crop=center' }
  ];

  const features = [
    { emoji: '🎯', title: 'All-in-One Platform', description: 'Everything you need in one place - algorithms, AP CSP, AP CSA, practice questions, and study tools. No more switching between multiple tabs and websites.' },
    { emoji: '⏱️', title: 'Built-in Study Tools', description: 'Integrated Pomodoro timer and focus music player right in your learning environment. Stay focused without leaving the page.' },
    { emoji: '📝', title: 'Interactive Practice', description: 'Take quizzes, download FRQ materials, and get instant feedback - all seamlessly integrated into your learning flow.' },
    { emoji: '🎨', title: 'Visual + Hands-On', description: 'Watch algorithms animate step-by-step, then practice with coding challenges. The perfect combination for deep understanding.' }
  ];

  const stats = [
    { number: '6', label: 'Core Algorithms', emoji: '🧠' },
    { number: '2', label: 'AP Courses', emoji: '🎓' },
    { number: '20+', label: 'Practice Questions', emoji: '💻' },
    { number: 'All-in-One', label: 'Platform', emoji: '⭐' }
  ];

  return (
    <div className="min-h-screen relative">
      <StudyTools />
      {/* Hero Section */}
      <section className="relative section-padding pt-24 overflow-hidden">
        <SplineBackground />
        <div className="container-width relative z-10">
            <div className="text-center max-w-4xl mx-auto px-4">

            {/* AlgoFlow Branding */}
            <div className="mb-3 animate-slide-up" style={{ animationDelay: '0s' }}>
              <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                AlgoFlow
              </span>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gradient-primary/10 rounded-full text-primary font-medium text-sm mb-6 animate-slide-up">
              <span className="text-sm">⚡</span>
              <span>The Modern Way to Master Algorithms</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight animate-slide-up font-dm-sans px-4" style={{ animationDelay: '0.1s' }}>
              Master Algorithms with
              <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
                Visual Learning
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto animate-slide-up px-4" style={{ animationDelay: '0.2s' }}>
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

      {/* What You'll Master Section */}
      <section className="section-padding py-16">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-dm-sans">
              What <span className="bg-gradient-primary bg-clip-text text-transparent">You'll Master</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From fundamental sorting algorithms to advanced search techniques, we cover the essential algorithms every CS student should master.
            </p>
          </div>

          {/* Algorithms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 px-4">
            {featuredAlgorithms.map((algorithm, index) => (
              <div key={index} className="algorithm-card group hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${algorithm.color} rounded-xl flex items-center justify-center text-xl mr-4`}>
                      {algorithm.emoji}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{algorithm.name}</h3>
                  </div>
                  <p className="text-slate-600 mb-4 leading-relaxed text-sm">{algorithm.description}</p>
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
              </div>
            ))}
          </div>

          {/* AP Topics Section */}
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 font-dm-sans">
              <span className="bg-gradient-primary bg-clip-text text-transparent">AP Computer Science</span> Topics
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive curriculum coverage for both AP Computer Science A and AP Computer Science Principles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {apTopics.map((topic, index) => (
              <div key={index} className="algorithm-card group hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${topic.color} rounded-xl flex items-center justify-center text-xl mr-4`}>
                      {topic.emoji}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{topic.name}</h3>
                  </div>
                  <p className="text-slate-600 mb-4 leading-relaxed text-sm">{topic.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Key Topics:</h4>
                    <div className="flex flex-wrap gap-2">
                      {topic.topics.map((subtopic, subIndex) => (
                        <span key={subIndex} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                          {subtopic}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      topic.difficulty === 'Intermediate'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {topic.difficulty}
                    </span>
                    <span className="text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all">➡️</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why AlgoFlow Works Better */}
      <section className="section-padding py-16 bg-gradient-to-br from-slate-50 to-blue-50/50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-dm-sans">
              Why <span className="bg-gradient-primary bg-clip-text text-transparent">AlgoFlow</span> Works Better
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Unlike other platforms that scatter content across multiple sites, we've centralized everything 
              so you can focus on learning instead of managing tabs and bookmarks.
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
