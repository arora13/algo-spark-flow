import React, { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

const SplineBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100" />}>
        <Spline
          scene="https://prod.spline.design/ou9NBkIfZhWPdGTb/scene.splinecode"
          className="w-full h-full object-cover"
        />
      </Suspense>
    </div>
  );
};

export default SplineBackground;
