import React from "react";

function WeatherChart({ dailyData }) {
  if (!dailyData || dailyData.length === 0) return null;
  
  const maxTemp = Math.max(...dailyData.map(d => d.temp));
  const minTemp = Math.min(...dailyData.map(d => d.temp));
  const tempRange = maxTemp - minTemp;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-start mb-6">
        <p className="text-white text-2xl font-medium uppercase">Temperature Trend</p>
      </div>
      <hr className="my-2 border-white border-opacity-30" />

      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 mt-4">
        <div className="relative h-40 flex items-end justify-between">
          {dailyData.map((day, index) => {
            const height = tempRange > 0 ? ((day.temp - minTemp) / tempRange) * 120 + 20 : 70;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="text-white text-sm mb-2">{Math.round(day.temp)}°</div>
                <div
                  className="bg-gradient-to-t from-blue-400 to-red-400 rounded-t-lg w-8 transition-all duration-500"
                  style={{ height: `${height}px` }}
                ></div>
                <div className="text-white text-xs mt-2 text-center">{day.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WeatherChart;