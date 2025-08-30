import React, { useState, useEffect } from "react";
import { UilHistory, UilChart } from "@iconscout/react-unicons";

function WeatherHistory({ weather }) {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    if (weather) {
      const today = new Date();
      const mockHistory = [];
      
      for (let i = 7; i >= 1; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        mockHistory.push({
          date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          temp: weather.temp + (Math.random() - 0.5) * 10,
          condition: weather.details
        });
      }
      setHistoryData(mockHistory);
    }
  }, [weather]);

  if (!weather) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-start mb-6">
        <UilHistory size={28} className="text-white mr-3" />
        <p className="text-white text-2xl font-medium uppercase">7-Day History</p>
      </div>
      <hr className="my-2 border-white border-opacity-30" />

      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {historyData.map((day, index) => (
            <div key={index} className="text-center p-3 bg-white bg-opacity-10 rounded-xl">
              <p className="text-white text-sm font-light mb-2">{day.date}</p>
              <p className="text-white text-lg font-medium">{Math.round(day.temp)}°</p>
              <p className="text-white text-xs opacity-70 mt-1">{day.condition}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex items-center justify-center">
          <UilChart size={24} className="text-white mr-2" />
          <p className="text-white text-sm opacity-80">Average temperature: {Math.round(historyData.reduce((sum, day) => sum + day.temp, 0) / historyData.length)}°</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherHistory;