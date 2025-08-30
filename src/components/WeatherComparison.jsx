import React, { useState } from "react";
import { UilPlus, UilTimes, UilBalanceScale } from "@iconscout/react-unicons";
import getFormattedWeatherData from "../services/weatherService";

function WeatherComparison({ currentWeather, units }) {
  const [compareCity, setCompareCity] = useState('');
  const [compareWeather, setCompareWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const addCityToCompare = async () => {
    if (!compareCity) return;
    
    setLoading(true);
    try {
      const data = await getFormattedWeatherData({ q: compareCity, units });
      setCompareWeather(data);
      setCompareCity('');
    } catch (error) {
      console.error('Failed to fetch comparison weather:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearComparison = () => {
    setCompareWeather(null);
  };

  if (!currentWeather) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-start mb-6">
        <UilBalanceScale size={28} className="text-white mr-3" />
        <p className="text-white text-2xl font-medium uppercase">Compare Cities</p>
      </div>
      <hr className="my-2 border-white border-opacity-30" />

      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 mt-6">
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={compareCity}
            onChange={(e) => setCompareCity(e.target.value)}
            placeholder="Enter city to compare..."
            className="flex-1 p-3 bg-white bg-opacity-20 rounded-xl text-white placeholder-gray-200 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && addCityToCompare()}
          />
          <button
            onClick={addCityToCompare}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50"
          >
            {loading ? '...' : <UilPlus size={20} />}
          </button>
        </div>

        {compareWeather && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-medium">{currentWeather.name}, {currentWeather.country}</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white opacity-70">Temperature:</span>
                  <span className="text-white font-medium">{Math.round(currentWeather.temp)}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white opacity-70">Feels like:</span>
                  <span className="text-white font-medium">{Math.round(currentWeather.feels_like)}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white opacity-70">Humidity:</span>
                  <span className="text-white font-medium">{currentWeather.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white opacity-70">Wind:</span>
                  <span className="text-white font-medium">{Math.round(currentWeather.speed)} km/h</span>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-medium">{compareWeather.name}, {compareWeather.country}</h3>
                <button
                  onClick={clearComparison}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <UilTimes size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white opacity-70">Temperature:</span>
                  <span className={`font-medium ${
                    compareWeather.temp > currentWeather.temp ? 'text-red-400' : 
                    compareWeather.temp < currentWeather.temp ? 'text-blue-400' : 'text-white'
                  }`}>
                    {Math.round(compareWeather.temp)}°
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white opacity-70">Feels like:</span>
                  <span className="text-white font-medium">{Math.round(compareWeather.feels_like)}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white opacity-70">Humidity:</span>
                  <span className="text-white font-medium">{compareWeather.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white opacity-70">Wind:</span>
                  <span className="text-white font-medium">{Math.round(compareWeather.speed)} km/h</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherComparison;