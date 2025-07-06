
import React from 'react';

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large floating gradient orbs */}
      <div className="floating-element absolute w-96 h-96 -top-48 -right-48 bg-gradient-radial from-purple-200/20 via-blue-200/10 to-transparent rounded-full blur-3xl" />
      <div className="floating-element-slow absolute w-80 h-80 top-1/4 -left-40 bg-gradient-radial from-blue-200/15 via-indigo-200/8 to-transparent rounded-full blur-2xl" />
      <div className="floating-element absolute w-64 h-64 bottom-1/4 right-1/4 bg-gradient-radial from-pink-200/10 via-purple-200/5 to-transparent rounded-full blur-2xl" />
      
      {/* Abstract geometric shapes */}
      <div className="floating-element-slow absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-br from-white/40 to-blue-100/20 rounded-3xl rotate-12 shadow-xl backdrop-blur-sm animate-gentle-pulse" />
      <div className="floating-element absolute bottom-32 right-1/3 w-24 h-24 bg-gradient-to-tl from-purple-100/30 to-white/20 rounded-2xl -rotate-6 shadow-lg backdrop-blur-sm" />
      
      {/* Small accent elements */}
      <div className="floating-element absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-r from-blue-300/20 to-purple-300/15 rounded-full shadow-md animate-gentle-pulse" style={{ animationDelay: '2s' }} />
      <div className="floating-element-slow absolute bottom-1/3 left-16 w-20 h-20 bg-gradient-to-br from-indigo-200/25 to-transparent rounded-xl rotate-45 shadow-lg" />
    </div>
  );
};

export default FloatingElements;
