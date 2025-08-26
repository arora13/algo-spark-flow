import React from 'react';

const AbstractGradientBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-abstract" />
      
      {/* Floating gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-blob-1 rounded-full blur-3xl opacity-40 animate-float-slow" />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-blob-2 rounded-full blur-2xl opacity-30 animate-float-medium" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-blob-3 rounded-full blur-3xl opacity-35 animate-float-slow" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-gradient-blob-4 rounded-full blur-2xl opacity-25 animate-float-medium" style={{ animationDelay: '6s' }} />
      
      {/* Additional soft light flares */}
      <div className="absolute top-1/3 left-1/2 w-48 h-48 bg-gradient-flare-1 rounded-full blur-xl opacity-20 animate-pulse-gentle" />
      <div className="absolute bottom-1/2 right-1/4 w-56 h-56 bg-gradient-flare-2 rounded-full blur-xl opacity-15 animate-pulse-gentle" style={{ animationDelay: '3s' }} />
      
      {/* Subtle geometric shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-2xl rotate-12 backdrop-blur-sm animate-float-slow opacity-60" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/3 rounded-xl -rotate-12 backdrop-blur-sm animate-float-medium opacity-40" />
    </div>
  );
};

export default AbstractGradientBackground;