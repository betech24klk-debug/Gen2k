import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gray-100">
      <div className="w-full aspect-[4/3] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{
            animation: 'shimmer 2s infinite',
            backgroundSize: '200% 100%'
          }}
        />
      </div>
    </div>
  );
};

export default SkeletonCard;