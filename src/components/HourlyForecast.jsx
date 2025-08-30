import React, { useRef, useState } from "react";

function HourlyForecast({ hourlyData }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  if (!hourlyData || hourlyData.length === 0) return null;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white text-2xl font-medium uppercase">24 Hour Forecast</p>
        <p className="text-white text-sm opacity-70">Swipe to scroll →</p>
      </div>
      <hr className="my-2 border-white border-opacity-30" />

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 py-4 scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {hourlyData.slice(0, 24).map((hour, index) => {
          const time = new Date(hour.dt * 1000);
          const isNow = index === 0;
          
          return (
            <div
              key={index}
              className={`flex flex-col items-center backdrop-blur-sm rounded-xl p-3 min-w-[80px] transition-all duration-300 select-none ${
                isNow 
                  ? 'bg-blue-500 bg-opacity-80 ring-2 ring-blue-300' 
                  : 'bg-white bg-opacity-20 hover:bg-opacity-30'
              }`}
            >
              <p className={`text-xs font-medium mb-2 ${
                isNow ? 'text-white' : 'text-white opacity-90'
              }`}>
                {isNow ? 'Now' : time.toLocaleTimeString('en-US', { hour: 'numeric' })}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                className="w-8 h-8 my-1 pointer-events-none"
                alt={hour.weather[0].main}
                loading="lazy"
              />
              <p className={`font-bold text-sm ${
                isNow ? 'text-white' : 'text-white'
              }`}>
                {Math.round(hour.main.temp)}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyForecast;