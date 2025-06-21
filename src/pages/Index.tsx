
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Code, Trophy, Users } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Play,
      title: 'Interactive Visualizations',
      description: 'Watch algorithms come to life with step-by-step animated explanations.'
    },
    {
      icon: Code,
      title: 'Hands-on Practice',
      description: 'Code in our terminal-style editor with real-time feedback and AI assistance.'
    },
    {
      icon: Trophy,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed progress tracking and achievements.'
    },
    {
      icon: Users,
      title: 'Built for Students',
      description: 'Designed specifically for AP Computer Science and early college CS students.'
    }
  ];

  const algorithms = [
    'Merge Sort', 'Quick Sort', 'Binary Search', 'Depth-First Search',
    'Breadth-First Search', 'Dijkstra\'s Algorithm', 'Dynamic Programming'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight mb-6">
                Master Algorithms
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Interactively
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Learn key computer science algorithms through animated visualizations and hands-on coding practice. 
                Perfect for AP Computer Science and college CS students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/learn">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white rounded-full px-8 py-4 font-medium transition-all duration-200 hover:scale-105 w-full sm:w-auto">
                    Start Learning
                  </Button>
                </Link>
                <Link to="/practice">
                  <Button size="lg" variant="outline" className="rounded-full px-8 py-4 font-medium border-2 border-algo-blue text-algo-blue hover:bg-algo-blue hover:text-white transition-all duration-200 w-full sm:w-auto">
                    Try Practice Mode
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* 3D Floating Elements */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-algo-blue/20 to-transparent rounded-full blur-3xl"></div>
              <div className="relative grid grid-cols-3 gap-4 p-8">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
                      i % 3 === 0 ? 'from-algo-blue to-algo-purple' :
                      i % 3 === 1 ? 'from-algo-pink to-algo-purple' :
                      'from-algo-cyan to-algo-blue'
                    } opacity-80 animate-float shadow-lg`}
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${3 + (i % 3)}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Why Choose AlgoFlow?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines the best of visual learning and hands-on practice to help you master algorithms effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
            Master Essential Algorithms
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            From sorting and searching to graph algorithms and dynamic programming - we've got you covered.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {algorithms.map((algorithm, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-gradient-to-r from-algo-blue/10 to-algo-purple/10 rounded-full text-gray-700 font-medium border border-algo-blue/20 hover:border-algo-blue/40 transition-all duration-200 hover:scale-105"
              >
                {algorithm}
              </span>
            ))}
          </div>
          
          <Link to="/learn">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white rounded-full px-8 py-4 font-medium transition-all duration-200 hover:scale-105">
              Explore All Algorithms
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-4">
            Ready to Level Up Your Algorithm Skills?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students who are mastering algorithms with AlgoFlow.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-white text-algo-blue rounded-full px-8 py-4 font-medium hover:bg-gray-50 transition-all duration-200 hover:scale-105">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
