import React from 'react';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse bg-white/5 rounded-md ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
