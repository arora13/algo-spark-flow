import React from "react";

const SplineBackground = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-cover bg-center filter blur-sm brightness-75"
      style={{ backgroundImage: "url('/images/void-spiral.jpg')" }}
    />
  );
};

export default SplineBackground;
