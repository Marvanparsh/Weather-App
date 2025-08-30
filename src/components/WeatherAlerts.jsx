import React from "react";
import { UilExclamationTriangle, UilInfoCircle } from "@iconscout/react-unicons";

function WeatherAlerts({ weather }) {
  const getWeatherAlert = () => {
    const temp = weather.temp;
    const condition = weather.details.toLowerCase();
    const humidity = weather.humidity;
    
    if (condition.includes('storm') || condition.includes('thunder')) {
      return { type: 'danger', icon: UilExclamationTriangle, message: 'Severe thunderstorm warning! Stay indoors.' };
    }
    if (temp > 35 && humidity > 80) {
      return { type: 'warning', icon: UilExclamationTriangle, message: 'Heat index warning! Stay hydrated and avoid prolonged sun exposure.' };
    }
    if (temp < 0) {
      return { type: 'warning', icon: UilExclamationTriangle, message: 'Freezing temperature alert! Dress warmly and be cautious of ice.' };
    }
    if (condition.includes('rain') && weather.speed > 20) {
      return { type: 'info', icon: UilInfoCircle, message: 'Heavy rain and wind expected. Drive carefully.' };
    }
    return null;
  };

  const alert = getWeatherAlert();
  if (!alert) return null;

  const alertColors = {
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  return (
    <div className={`${alertColors[alert.type]} bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 mb-6 border-l-4 border-white shadow-lg`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <alert.icon size={28} className="text-white" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-1">
            {alert.type === 'danger' ? '⚠️ Weather Alert' : 
             alert.type === 'warning' ? '🌡️ Weather Warning' : 
             '💡 Weather Info'}
          </h3>
          <p className="text-white font-medium text-base leading-relaxed">{alert.message}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherAlerts;