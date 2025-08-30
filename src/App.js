import { useEffect, useState } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import HourlyForecast from "./components/HourlyForecast";
import WeatherChart from "./components/WeatherChart";
import WeatherSuggestions from "./components/WeatherSuggestions";
import AirQuality from "./components/AirQuality";
import FavoriteCities from "./components/FavoriteCities";
import ThemeToggle from "./components/ThemeToggle";
import WeatherAlerts from "./components/WeatherAlerts";
import WeatherMap from "./components/WeatherMap";
import WeatherHistory from "./components/WeatherHistory";
import UVIndex from "./components/UVIndex";
import WeatherComparison from "./components/WeatherComparison";
import ShareWeather from "./components/ShareWeather";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import OfflineIndicator from "./components/OfflineIndicator";
import getFormattedWeatherData from "./services/weatherService";
import { storage } from "./utils/storage";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState(null);
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [initialLoad, setInitialLoad] = useState(true);

  // Auto-detect location on first visit
  useEffect(() => {
    const savedTheme = storage.get('darkMode');
    if (savedTheme !== null) {
      setDarkMode(savedTheme);
    }

    const lastCity = storage.get('lastCity');
    if (lastCity) {
      setQuery({ q: lastCity });
      setInitialLoad(false);
    } else {
      // Auto-detect location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setQuery({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
            setInitialLoad(false);
          },
          () => {
            setQuery({ q: "New York" });
            setInitialLoad(false);
          }
        );
      } else {
        setQuery({ q: "New York" });
        setInitialLoad(false);
      }
    }

    // Online/offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    storage.set('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!query) return;
    
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location";
      setLoading(true);
      
      if (!isOnline) {
        toast.warning("You're offline. Showing cached data if available.");
      } else {
        toast.info(`Fetching weather for ${message}`);
      }

      try {
        const data = await getFormattedWeatherData({ ...query, units });
        toast.success(
          `Weather loaded for ${data.name}, ${data.country}`
        );
        setWeather(data);
        storage.set('lastCity', data.name);
      } catch (error) {
        toast.error(error.message || "Failed to fetch weather data");
        console.error("Weather fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [query, units, isOnline]);

  const formatBackground = () => {
    if (!weather) {
      return darkMode 
        ? "from-black via-gray-900 to-slate-900" 
        : "from-[#191970] via-[#161668] to-[#131360]";
    }
    
    const condition = weather.details?.toLowerCase();
    const threshold = units === "metric" ? 20 : 60;
    
    if (darkMode) {
      if (condition?.includes('clear') || condition?.includes('sunny')) {
        return "from-black via-gray-900 to-yellow-900";
      }
      if (condition?.includes('cloud')) {
        return "from-black via-gray-900 to-slate-900";
      }
      if (condition?.includes('rain')) {
        return "from-black via-gray-900 to-blue-900";
      }
      if (condition?.includes('snow')) {
        return "from-black via-gray-900 to-indigo-900";
      }
      return weather.temp <= threshold 
        ? "from-black via-gray-900 to-blue-900" 
        : "from-black via-gray-900 to-orange-900";
    } else {
      if (condition?.includes('clear') || condition?.includes('sunny')) {
        return "from-[#191970] via-[#1e1e7e] to-[#2a2a8c]";
      }
      if (condition?.includes('cloud')) {
        return "from-[#191970] via-[#1a1a6e] to-[#1b1b6c]";
      }
      if (condition?.includes('rain')) {
        return "from-[#191970] via-[#161668] to-[#131360]";
      }
      if (condition?.includes('snow')) {
        return "from-[#191970] via-[#1c1c74] to-[#1f1f78]";
      }
      return weather.temp <= threshold 
        ? "from-[#191970] via-[#161668] to-[#131360]" 
        : "from-[#191970] via-[#1e1e7e] to-[#2a2a8c]";
    }
  };

  if (initialLoad) {
    return (
      <div className="min-h-screen w-full py-4 px-2 sm:py-8 sm:px-4 bg-gradient-to-br from-black via-gray-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner darkMode={true} />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen w-full py-4 px-2 sm:py-8 sm:px-4 bg-gradient-to-br transition-all duration-500 ${
          formatBackground()
        }`}
      >
        {!isOnline && <OfflineIndicator />}
        
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="max-w-6xl mx-auto px-2 sm:px-0">

        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} darkMode={darkMode} />
        
        <FavoriteCities 
          currentCity={weather?.name} 
          setQuery={setQuery} 
        />

        {loading && <LoadingSpinner darkMode={darkMode} />}

        {weather && !loading && (
          <div className="mt-8 space-y-8">
            <WeatherAlerts weather={weather} />
            
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UVIndex weather={weather} />
              <ShareWeather weather={weather} />
            </div>
            
            <WeatherSuggestions weather={weather} units={units} />
            
            {weather.hourly && (
              <HourlyForecast hourlyData={weather.hourly} />
            )}
            
            {weather.daily && (
              <>
                <Forecast title="7 Day Forecast" items={weather.daily} />
                <WeatherChart dailyData={weather.daily} />
              </>
            )}
            
            <AirQuality airQuality={weather.airQuality} />
            
            <WeatherHistory weather={weather} />
            
            <WeatherComparison currentWeather={weather} units={units} />
            
            <WeatherMap weather={weather} />
          </div>
        )}
        </div>

        <ToastContainer 
          autoClose={3000} 
          theme={darkMode ? "dark" : "light"} 
          newestOnTop={true} 
          position="top-right"
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;