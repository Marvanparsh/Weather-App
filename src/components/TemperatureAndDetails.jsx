import React from "react";
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function TemperatureAndDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) {
  return (
    <div className="text-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8 bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 shadow-2xl">
        <div className="relative">
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={details}
            className="w-40 h-40 drop-shadow-2xl animate-bounce"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 rounded-full px-4 py-1">
            <p className="text-white text-sm font-medium">{details}</p>
          </div>
        </div>
        <div className="text-center md:text-left">
          <p className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white drop-shadow-lg mb-2">
            {`${temp.toFixed()}°`}
          </p>
          <p className="text-white text-xl opacity-80">
            Feels like {`${feels_like.toFixed()}°`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-600 shadow-xl hover:bg-opacity-90 transition-all duration-300">
          <UilTemperature size={32} className="mx-auto mb-2 text-white" />
          <p className="text-white text-lg font-light">Feels like</p>
          <p className="text-white text-2xl font-bold">{`${feels_like.toFixed()}°`}</p>
        </div>
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-600 shadow-xl hover:bg-opacity-90 transition-all duration-300">
          <UilTear size={32} className="mx-auto mb-2 text-white" />
          <p className="text-white text-lg font-light">Humidity</p>
          <p className="text-white text-2xl font-bold">{`${humidity.toFixed()}%`}</p>
        </div>
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-600 shadow-xl hover:bg-opacity-90 transition-all duration-300">
          <UilWind size={32} className="mx-auto mb-2 text-white" />
          <p className="text-white text-lg font-light">Wind Speed</p>
          <p className="text-white text-2xl font-bold">{`${speed.toFixed()} km/h`}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-600 shadow-lg hover:bg-opacity-90 transition-all duration-300">
          <UilSun size={24} className="mx-auto mb-2 text-white" />
          <p className="text-white text-sm font-light">Sunrise</p>
          <p className="text-white text-lg font-medium">{formatToLocalTime(sunrise, timezone, "hh:mm a")}</p>
        </div>
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-600 shadow-lg hover:bg-opacity-90 transition-all duration-300">
          <UilSunset size={24} className="mx-auto mb-2 text-white" />
          <p className="text-white text-sm font-light">Sunset</p>
          <p className="text-white text-lg font-medium">{formatToLocalTime(sunset, timezone, "hh:mm a")}</p>
        </div>
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-600 shadow-lg hover:bg-opacity-90 transition-all duration-300">
          <UilArrowUp size={24} className="mx-auto mb-2 text-white" />
          <p className="text-white text-sm font-light">High</p>
          <p className="text-white text-lg font-medium">{`${temp_max.toFixed()}°`}</p>
        </div>
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-600 shadow-lg hover:bg-opacity-90 transition-all duration-300">
          <UilArrowDown size={24} className="mx-auto mb-2 text-white" />
          <p className="text-white text-sm font-light">Low</p>
          <p className="text-white text-lg font-medium">{`${temp_min.toFixed()}°`}</p>
        </div>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;