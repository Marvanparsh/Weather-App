import React, { useState } from "react";
import { UilMap, UilEye, UilCloud } from "@iconscout/react-unicons";

function WeatherMap({ weather }) {
  const [mapType, setMapType] = useState('temp');
  
  if (!weather) return null;

  const mapTypes = [
    { id: 'temp', name: 'Temperature', icon: UilMap },
    { id: 'precipitation', name: 'Precipitation', icon: UilCloud },
    { id: 'wind', name: 'Wind', icon: UilEye }
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white text-2xl font-medium uppercase">Weather Map</p>
        <div className="flex gap-2">
          {mapTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setMapType(type.id)}
              className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 ${
                mapType === type.id 
                  ? 'bg-white text-gray-800' 
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
      <hr className="my-2 border-white border-opacity-30" />

      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 mt-6">
        <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center">
          <iframe
            src={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=${mapType}&lat=${weather.lat}&lon=${weather.lon}&zoom=8`}
            className="w-full h-full rounded-xl"
            title="Weather Map"
          />
        </div>
      </div>
    </div>
  );
}

export default WeatherMap;