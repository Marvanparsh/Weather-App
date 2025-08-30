import React, { useState, useEffect, useRef } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import VoiceSearch from "./VoiceSearch";
import { useDebounce } from "../hooks/useDebounce";
import { storage } from "../utils/storage";

function Inputs({ setQuery, units, setUnits, darkMode = true }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debouncedCity = useDebounce(city, 300);

  const popularCities = [
    "New York", "London", "Tokyo", "Paris", "Sydney", "Mumbai", "Dubai", "Singapore",
    "Los Angeles", "Chicago", "Toronto", "Berlin", "Madrid", "Rome", "Amsterdam",
    "Bangkok", "Hong Kong", "Seoul", "Moscow", "Istanbul", "Cairo", "Delhi",
    "Barcelona", "Vienna", "Prague", "Zurich", "Stockholm", "Copenhagen"
  ];

  useEffect(() => {
    const savedUnits = storage.get('preferredUnits');
    if (savedUnits && savedUnits !== units) {
      setUnits(savedUnits);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (debouncedCity.length > 0) {
      const filtered = popularCities.filter(cityName => 
        cityName.toLowerCase().includes(debouncedCity.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedCity]);

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) {
      setUnits(selectedUnit);
      storage.set('preferredUnits', selectedUnit);
    }
  };



  const handleSearchClick = () => {
    const searchCity = selectedIndex >= 0 ? suggestions[selectedIndex] : city;
    if (searchCity !== "") {
      setQuery({ q: searchCity });
      setCity("");
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery({ q: suggestion });
    setCity("");
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : prev);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 my-8">
      <div className="relative">
        <div className={`flex items-center gap-4 backdrop-blur-sm rounded-2xl p-4 shadow-lg border ${
          darkMode 
            ? 'bg-white bg-opacity-15 border-white border-opacity-20' 
            : 'bg-white bg-opacity-25 border-white border-opacity-40'
        }`}>
          <input
            ref={inputRef}
            value={city}
            onChange={handleCityChange}
            onKeyPress={handleKeyPress}
            onFocus={() => city.length > 0 && setShowSuggestions(true)}
            type="text"
            placeholder="Search for city...."
            className={`text-base sm:text-lg md:text-xl font-light p-2 sm:p-3 w-full max-w-xs sm:max-w-sm md:w-80 bg-transparent focus:outline-none capitalize placeholder:lowercase ${
              darkMode 
                ? 'text-white placeholder-gray-200' 
                : 'text-white placeholder-gray-300'
            }`}
          />
        <button
          onClick={handleSearchClick}
          className={`p-2 sm:p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-white bg-opacity-30 hover:bg-opacity-50' 
              : 'bg-black bg-opacity-20 hover:bg-opacity-30'
          }`}
        >
          <UilSearch size={20} className={darkMode ? 'text-white' : 'text-white'} />
        </button>
        <button
          onClick={handleLocationClick}
          className={`p-2 sm:p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-white bg-opacity-30 hover:bg-opacity-50' 
              : 'bg-black bg-opacity-20 hover:bg-opacity-30'
          }`}
        >
          <UilLocationPoint size={20} className={darkMode ? 'text-white' : 'text-white'} />
        </button>
          <VoiceSearch setQuery={setQuery} />
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className={`absolute top-full left-0 right-0 mt-2 backdrop-blur-sm rounded-xl shadow-lg border z-50 ${
              darkMode 
                ? 'bg-white bg-opacity-20 border-white border-opacity-30' 
                : 'bg-white bg-opacity-30 border-white border-opacity-50'
            }`}
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-4 py-3 cursor-pointer transition-all duration-200 first:rounded-t-xl last:rounded-b-xl ${
                  index === selectedIndex 
                    ? (darkMode ? 'bg-white bg-opacity-30 text-white' : 'bg-black bg-opacity-30 text-white')
                    : (darkMode ? 'text-white hover:bg-white hover:bg-opacity-20' : 'text-white hover:bg-black hover:bg-opacity-20')
                }`}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

        <div className={`flex items-center gap-2 backdrop-blur-sm rounded-2xl p-4 shadow-lg border ${
          darkMode 
            ? 'bg-white bg-opacity-15 border-white border-opacity-20' 
            : 'bg-black bg-opacity-10 border-gray-300'
        }`}>
        <button
          name="metric"
          className={`text-xl font-medium px-4 py-2 rounded-xl transition-all duration-300 ${
            units === "metric" 
              ? (darkMode ? "bg-white text-gray-800 shadow-lg" : "bg-gray-800 text-white shadow-lg")
              : (darkMode ? "text-white hover:bg-white hover:bg-opacity-20" : "text-gray-800 hover:bg-black hover:bg-opacity-20")
          }`}
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <button
          name="imperial"
          className={`text-xl font-medium px-4 py-2 rounded-xl transition-all duration-300 ${
            units === "imperial" 
              ? (darkMode ? "bg-white text-gray-800 shadow-lg" : "bg-gray-800 text-white shadow-lg")
              : (darkMode ? "text-white hover:bg-white hover:bg-opacity-20" : "text-gray-800 hover:bg-black hover:bg-opacity-20")
          }`}
          onClick={handleUnitsChange}
        >
          °F
        </button>
        </div>
    </div>
  );
}

export default Inputs;