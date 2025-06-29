
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Sparkles } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Learn', path: '/learn' },
    { name: 'Practice', path: '/practice' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center neon-glow group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="text-white h-5 w-5" />
            </div>
            <span className="font-poppins font-bold text-2xl cosmic-text">AlgoFlow</span>
          </Link>

          {/* Enhanced Navigation Links */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-white bg-gradient-primary neon-glow'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Enhanced Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button className="glass-morphism text-white hover:bg-white/20 border-white/30 group">
                    <User className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </Link>
                <Button 
                  onClick={logout}
                  className="glass-morphism text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/30 group"
                >
                  <LogOut className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="cosmic-button text-white px-6 py-2 font-medium group">
                  <User className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
