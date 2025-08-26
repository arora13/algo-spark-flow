import React from 'react';

const AbstractGradientBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sophisticated grid pattern - enhanced visibility */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Base dreamy gradient layer */}
      <div className="absolute inset-0 bg-dreamy-gradient" />
      
      {/* Dynamic floating gradient orbs - GPT-5 inspired colors */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-orb-orange rounded-full blur-[100px] opacity-60 animate-drift-slow" />
      <div className="absolute top-1/4 -right-32 w-[400px] h-[400px] bg-gradient-orb-purple rounded-full blur-[80px] opacity-50 animate-drift-medium" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-gradient-orb-blue rounded-full blur-[90px] opacity-55 animate-drift-slow" style={{ animationDelay: '4s' }} />
      <div className="absolute -bottom-20 right-1/4 w-[450px] h-[450px] bg-gradient-orb-yellow rounded-full blur-[85px] opacity-45 animate-drift-medium" style={{ animationDelay: '6s' }} />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-orb-pink rounded-full blur-[70px] opacity-40 animate-drift-slow" style={{ animationDelay: '8s' }} />
      
      {/* Interactive floating particles */}
      <div className="absolute top-1/4 left-1/3 w-[200px] h-[200px] bg-gradient-orb-coral rounded-full blur-[60px] opacity-35 animate-float-interactive" />
      <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] bg-gradient-orb-lavender rounded-full blur-[65px] opacity-30 animate-float-interactive" style={{ animationDelay: '3s' }} />
      <div className="absolute top-2/3 left-1/5 w-[180px] h-[180px] bg-gradient-orb-mint rounded-full blur-[55px] opacity-38 animate-float-interactive" style={{ animationDelay: '5s' }} />
      
      {/* Baby blue glow zones for cards */}
      <div className="absolute top-32 left-1/4 w-80 h-80 bg-baby-blue-glow rounded-full blur-3xl opacity-25 animate-pulse-gentle" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-baby-blue-glow rounded-full blur-3xl opacity-20 animate-pulse-gentle" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-1/2 w-72 h-72 bg-baby-blue-glow rounded-full blur-3xl opacity-30 animate-pulse-gentle" style={{ animationDelay: '4s' }} />
      
      {/* Subtle moving geometric accents */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-white/3 rounded-xl rotate-12 backdrop-blur-sm animate-rotate-gentle opacity-40" />
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-white/2 rounded-lg -rotate-12 backdrop-blur-sm animate-rotate-gentle opacity-30" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/2 right-1/5 w-16 h-16 bg-white/4 rounded-full backdrop-blur-sm animate-pulse-gentle opacity-50" />
    </div>
  );
};

export default AbstractGradientBackground;