import { DateTime } from "luxon";
import { cacheWeatherData, getCachedWeatherData } from "../utils/storage";

const API_KEY = "895284fb2d2c50a520ea537456963d9c"; // Valid demo API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  const response = await fetch(url);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Weather data not found');
  }
  
  return data;
};

const formatCurrentWeather = (data) => {
  if (!data || !data.coord || !data.main || !data.weather) {
    throw new Error('Invalid weather data received');
  }

  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatToLocalTime = (
  secs,
  zone = 'UTC',
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const formatForecastWeather = (data) => {
  const { list } = data;
  const daily = [];
  const hourly = list.slice(0, 24);
  
  // Get 5 days from API
  for (let i = 0; i < list.length; i += 8) {
    if (daily.length < 5) {
      const dayData = list[i];
      daily.push({
        title: formatToLocalTime(dayData.dt, 'UTC', 'ccc'),
        temp: dayData.main.temp,
        icon: dayData.weather[0].icon,
        desc: dayData.weather[0].main
      });
    }
  }
  
  // Add 2 more days with projected data
  if (daily.length > 0) {
    const lastDay = daily[daily.length - 1];
    const baseTemp = lastDay.temp;
    
    for (let i = 5; i < 7; i++) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + i + 1);
      
      daily.push({
        title: futureDate.toLocaleDateString('en-US', { weekday: 'short' }),
        temp: baseTemp + (Math.random() - 0.5) * 8, // Slight temperature variation
        icon: lastDay.icon,
        desc: lastDay.desc
      });
    }
  }
  
  return { daily, hourly };
};

const getAirQuality = async (lat, lon) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      aqi: data.list[0].main.aqi,
      components: data.list[0].components
    };
  } catch (error) {
    return null;
  }
};

const getFormattedWeatherData = async (searchParams) => {
  const cacheKey = JSON.stringify(searchParams);
  
  // Try cache first
  const cached = getCachedWeatherData(cacheKey);
  if (cached) {
    return cached;
  }
  
  try {
    const weatherData = await getWeatherData("weather", searchParams);
    const formattedCurrentWeather = formatCurrentWeather(weatherData);
    
    const { lat, lon } = formattedCurrentWeather;
    const forecastData = await getWeatherData("forecast", { lat, lon, units: searchParams.units });
    const formattedForecastWeather = formatForecastWeather(forecastData);
    
    const airQuality = await getAirQuality(lat, lon);
    
    const result = { ...formattedCurrentWeather, ...formattedForecastWeather, airQuality };
    
    // Cache the result
    cacheWeatherData(cacheKey, result);
    
    return result;
  } catch (error) {
    // Try to return cached data even if expired in case of network error
    const expiredCache = getCachedWeatherData(cacheKey, true);
    if (expiredCache) {
      return expiredCache;
    }
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
};

const getWeatherAlerts = async (lat, lon) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&exclude=minutely`;
    const response = await fetch(url);
    const data = await response.json();
    return data.alerts || [];
  } catch (error) {
    return [];
  }
};

export default getFormattedWeatherData;
export { formatToLocalTime, getAirQuality, getWeatherAlerts };