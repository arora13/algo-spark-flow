import React from "react";

export default function AbstractGradientBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 opacity-95" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      {/* Orbs for depth */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-blue-900/40 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-64 w-[600px] h-[600px] bg-purple-900/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-56 left-1/2 w-[800px] h-[800px] bg-indigo-950/40 rounded-full blur-3xl" />
    </div>
  );
}

