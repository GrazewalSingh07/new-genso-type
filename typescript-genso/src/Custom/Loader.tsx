import React from 'react';

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 16,   }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`border-t-4 border-cyan-800 border-solid rounded-full animate-spin`}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default Loader;
