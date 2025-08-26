import React from 'react';

const AbstractGradientBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Softer grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Light dreamy gradient base */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 via-slate-100 to-white" />
      
      {/* Floating pastel gradient orbs */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-orange-200 to-pink-200 rounded-full blur-[100px] opacity-50 animate-drift-slow" />
      <div className="absolute top-1/4 -right-32 w-[400px] h-[400px] bg-gradient-to-tr from-purple-200 to-indigo-200 rounded-full blur-[80px] opacity-45 animate-drift-medium" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full blur-[90px] opacity-50 animate-drift-slow" style={{ animationDelay: '4s' }} />
      <div className="absolute -bottom-20 right-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-yellow-200 to-amber-200 rounded-full blur-[85px] opacity-40 animate-drift-medium" style={{ animationDelay: '6s' }} />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-pink-200 to-rose-200 rounded-full blur-[70px] opacity-40 animate-drift-slow" style={{ animationDelay: '8s' }} />
      
      {/* Interactive lighter particles */}
      <div className="absolute top-1/4 left-1/3 w-[200px] h-[200px] bg-gradient-to-tr from-red-200 to-orange-100 rounded-full blur-[60px] opacity-35 animate-float-interactive" />
      <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] bg-gradient-to-tr from-indigo-200 to-violet-100 rounded-full blur-[65px] opacity-30 animate-float-interactive" style={{ animationDelay: '3s' }} />
      <div className="absolute top-2/3 left-1/5 w-[180px] h-[180px] bg-gradient-to-tr from-green-200 to-emerald-100 rounded-full blur-[55px] opacity-35 animate-float-interactive" style={{ animationDelay: '5s' }} />
      
      {/* Softer glow zones for cards */}
      <div className="absolute top-32 left-1/4 w-80 h-80 bg-sky-200 rounded-full blur-3xl opacity-25 animate-pulse-gentle" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-20 animate-pulse-gentle" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-1/2 w-72 h-72 bg-sky-300 rounded-full blur-3xl opacity-30 animate-pulse-gentle" style={{ animationDelay: '4s' }} />
      
      {/* Subtle geometric accents with lighter tones */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-white/20 rounded-xl rotate-12 backdrop-blur-sm animate-rotate-gentle opacity-40" />
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-white/15 rounded-lg -rotate-12 backdrop-blur-sm animate-rotate-gentle opacity-30" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 right-1/5 w-16 h-16 bg-white/25 rounded-full backdrop-blur-sm animate-pulse-gentle opacity-50" />
    </div>
  );
};

export default AbstractGradientBackground;
