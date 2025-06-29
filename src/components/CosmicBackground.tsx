
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  animationDuration: number;
  animationDelay: number;
}

const CosmicBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'];
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          animationDuration: Math.random() * 10 + 5,
          animationDelay: Math.random() * 2,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Base cosmic gradient */}
      <div className="absolute inset-0 bg-gradient-cosmic opacity-90" />
      
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(102, 126, 234, 0.3) 0%, transparent 50%)`,
          transition: 'background 0.3s ease',
        }}
      />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-cosmic-drift opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.animationDelay}s`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
      
      {/* Geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-white/10 rounded-full animate-float opacity-20" />
      <div className="absolute top-40 right-20 w-24 h-24 border border-algo-purple/20 rounded-lg rotate-45 animate-bounce-subtle opacity-30" />
      <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-r from-algo-cyan/20 to-algo-pink/20 rounded-full animate-glow-pulse" />
      <div className="absolute bottom-20 right-1/3 w-20 h-20 border-2 border-neon-blue/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      
      {/* Morphing gradient orbs */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-morphing opacity-10 rounded-full blur-3xl animate-morphing-gradient" style={{ backgroundSize: '400% 400%' }} />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-neon opacity-15 rounded-full blur-2xl animate-glow-pulse" />
    </div>
  );
};

export default CosmicBackground;
