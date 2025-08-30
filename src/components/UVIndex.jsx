import React from "react";
import { UilSun, UilEye } from "@iconscout/react-unicons";

function UVIndex({ weather }) {
  if (!weather) return null;

  // Mock UV index based on weather conditions and time
  const getUVIndex = () => {
    const condition = weather.details.toLowerCase();
    const hour = new Date().getHours();
    
    if (condition.includes('clear') || condition.includes('sunny')) {
      if (hour >= 10 && hour <= 16) return Math.floor(Math.random() * 3) + 8; // High UV
      return Math.floor(Math.random() * 3) + 4; // Moderate UV
    }
    if (condition.includes('cloud')) return Math.floor(Math.random() * 3) + 3;
    return Math.floor(Math.random() * 2) + 1; // Low UV
  };

  const uvIndex = getUVIndex();
  
  const getUVLevel = (uv) => {
    if (uv <= 2) return { level: 'Low', color: 'text-green-400', bg: 'bg-green-500' };
    if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500' };
    if (uv <= 7) return { level: 'High', color: 'text-orange-400', bg: 'bg-orange-500' };
    if (uv <= 10) return { level: 'Very High', color: 'text-red-400', bg: 'bg-red-500' };
    return { level: 'Extreme', color: 'text-purple-400', bg: 'bg-purple-500' };
  };

  const uvInfo = getUVLevel(uvIndex);

  const getProtectionAdvice = (uv) => {
    if (uv <= 2) return 'No protection needed';
    if (uv <= 5) return 'Wear sunglasses on bright days';
    if (uv <= 7) return 'Wear sunglasses and use sunscreen';
    if (uv <= 10) return 'Wear sunglasses, use sunscreen, seek shade';
    return 'Avoid sun exposure, stay indoors if possible';
  };

  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
      <div className="flex items-center mb-4">
        <UilSun size={32} className="text-yellow-400 mr-3" />
        <div>
          <h3 className="text-white text-xl font-medium">UV Index</h3>
          <div className="flex items-center gap-2">
            <span className="text-white text-2xl font-bold">{uvIndex}</span>
            <span className={`text-lg font-medium ${uvInfo.color}`}>{uvInfo.level}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${uvInfo.bg}`}
            style={{ width: `${(uvIndex / 11) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-start gap-2">
        <UilEye size={20} className="text-white mt-1" />
        <p className="text-white text-sm">{getProtectionAdvice(uvIndex)}</p>
      </div>
    </div>
  );
}

export default UVIndex;