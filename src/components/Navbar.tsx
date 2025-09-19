import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, Code, BookOpen, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // The main navigation destinations - where the magic happens ✨
  const learningDestinations = [
    { name: 'Learn', path: '/learn', emoji: '🧠', icon: Brain },
    { name: 'Practice', path: '/practice', emoji: '💻', icon: Code },
    { name: 'About', path: '/about', emoji: '📚', icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-200/30 backdrop-blur-md border-b border-blue-300/40">
      <div className="container-width">
        <div className="flex items-center justify-between h-20">
          {/* AlgoFlow Logo */}
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="/assets/algoflow-logo.png" 
              alt="AlgoFlow Logo" 
              className="h-32 w-auto md:h-34"
            />
          </Link>

          {/* The main navigation - where users explore our awesome features 🚀 */}
          <div className="hidden md:flex items-center space-x-8">
            {learningDestinations.map((destination) => {
              const isCurrentlyHere = location.pathname === destination.path;
              return (
                <Link
                  key={destination.name}
                  to={destination.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isCurrentlyHere
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                  }`}
                >
                  <span className="text-lg">{destination.emoji}</span>
                  <span>{destination.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* User stuff - login/logout and contact */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-slate-600">
                  <span className="text-lg">👋</span>
                  <span className="hidden sm:inline">Hey {user.name}!</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={logout}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <span className="mr-2">👋</span>
                  See ya!
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                  <span className="mr-2">👤</span>
                  Login
                </Button>
              </Link>
            )}
            <Link to="/contact">
              <Button className="btn-primary">
                <span className="mr-2">💬</span>
                Let's Chat!
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-blue-300/40">
          <div className="container-width py-4 space-y-3">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {learningDestinations.map((destination) => {
                const isCurrentlyHere = location.pathname === destination.path;
                return (
                  <Link
                    key={destination.name}
                    to={destination.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isCurrentlyHere
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
                    }`}
                  >
                    <span className="text-lg">{destination.emoji}</span>
                    <span>{destination.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-slate-200/50 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-slate-600 px-4 py-2">
                    <span className="text-lg">👋</span>
                    <span>Hey {user.name}!</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg transition-colors"
                  >
                    <span className="mr-2">👋</span>
                    <span>See ya!</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-lg transition-colors"
                >
                  <span className="mr-2">👤</span>
                  <span>Login</span>
                </Link>
              )}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <span className="mr-2">💬</span>
                <span>Let's Chat!</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
