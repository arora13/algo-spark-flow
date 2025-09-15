import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Code, BookOpen, User, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Learn', path: '/learn', icon: Brain },
    { name: 'Practice', path: '/practice', icon: Code },
    { name: 'AP Topics', path: '/ap-topics', icon: GraduationCap },
    { name: 'About', path: '/about', icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-200/30 backdrop-blur-md border-b border-blue-300/40">
      <div className="container-width">
        <div className="flex items-center justify-between h-16">
          {/* AlgoFlow Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/assets/algoflow-logo.png" 
              alt="AlgoFlow Logo" 
              className="h-32 w-auto md:h-34"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="btn-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
