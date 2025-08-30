import React from "react";

const WeatherAnimations = ({ weatherCondition }) => {
  const getAnimationElements = () => {
    const condition = weatherCondition?.toLowerCase();
    
    if (condition?.includes('clear') || condition?.includes('sunny')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="sun animate-pulse absolute top-10 right-10 w-16 h-16 bg-yellow-400 rounded-full shadow-lg"></div>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      );
    }
    
    if (condition?.includes('cloud')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-gray-300 text-4xl animate-float"
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            >
              ☁️
            </div>
          ))}
        </div>
      );
    }
    
    if (condition?.includes('rain') || condition?.includes('drizzle')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute text-blue-400 animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            >
              💧
            </div>
          ))}
        </div>
      );
    }
    
    if (condition?.includes('snow')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white animate-snow"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              ❄️
            </div>
          ))}
        </div>
      );
    }
    
    return null;
  };

  return getAnimationElements();
};

export default WeatherAnimations;