import React from "react";
import { UilWind } from "@iconscout/react-unicons";

function AirQuality({ airQuality }) {
  if (!airQuality) return null;

  const getAQILevel = (aqi) => {
    const levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    const colors = ["text-green-400", "text-yellow-400", "text-orange-400", "text-red-400", "text-purple-400"];
    return { level: levels[aqi - 1] || "Unknown", color: colors[aqi - 1] || "text-gray-400" };
  };

  const aqiInfo = getAQILevel(airQuality.aqi);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-start mb-6">
        <p className="text-white text-2xl font-medium uppercase">Air Quality</p>
      </div>
      <hr className="my-2 border-white border-opacity-30" />

      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 mt-6">
        <div className="flex items-center mb-4">
          <UilWind size={32} className="text-white mr-3" />
          <div>
            <h3 className="text-white text-xl font-medium">Air Quality Index</h3>
            <p className={`text-lg font-bold ${aqiInfo.color}`}>{aqiInfo.level}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <p className="text-white text-sm opacity-70">PM2.5</p>
            <p className="text-white text-lg font-medium">{airQuality.components.pm2_5?.toFixed(1) || 'N/A'}</p>
          </div>
          <div className="text-center">
            <p className="text-white text-sm opacity-70">PM10</p>
            <p className="text-white text-lg font-medium">{airQuality.components.pm10?.toFixed(1) || 'N/A'}</p>
          </div>
          <div className="text-center">
            <p className="text-white text-sm opacity-70">O₃</p>
            <p className="text-white text-lg font-medium">{airQuality.components.o3?.toFixed(1) || 'N/A'}</p>
          </div>
          <div className="text-center">
            <p className="text-white text-sm opacity-70">NO₂</p>
            <p className="text-white text-lg font-medium">{airQuality.components.no2?.toFixed(1) || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirQuality;