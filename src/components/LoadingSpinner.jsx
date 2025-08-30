import React from 'react';

const LoadingSpinner = ({ darkMode = true }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-8 space-y-4">
      <div className={`animate-spin rounded-full h-12 w-12 border-4 border-t-transparent ${
        darkMode ? 'border-white' : 'border-gray-800'
      }`}></div>
      <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Loading weather data...
      </p>
    </div>
  );
};

export default LoadingSpinner;