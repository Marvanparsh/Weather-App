import React from "react";
import { UilUser, UilUmbrella, UilSun, UilSnowflake } from "@iconscout/react-unicons";

function WeatherSuggestions({ weather, units }) {
  if (!weather) return null;
  
  const getClothingSuggestion = () => {
    const temp = weather.temp;
    const condition = weather.details.toLowerCase();
    
    if (units === "metric") {
      if (temp < 0) return { icon: UilSnowflake, text: "Heavy winter coat, gloves, and warm boots" };
      if (temp < 10) return { icon: UilUser, text: "Warm jacket and layers" };
      if (temp < 20) return { icon: UilUser, text: "Light jacket or sweater" };
      if (temp < 30) return { icon: UilUser, text: "T-shirt and light pants" };
      return { icon: UilSun, text: "Light clothing and stay hydrated" };
    } else {
      if (temp < 32) return { icon: UilSnowflake, text: "Heavy winter coat, gloves, and warm boots" };
      if (temp < 50) return { icon: UilUser, text: "Warm jacket and layers" };
      if (temp < 68) return { icon: UilUser, text: "Light jacket or sweater" };
      if (temp < 86) return { icon: UilUser, text: "T-shirt and light pants" };
      return { icon: UilSun, text: "Light clothing and stay hydrated" };
    }
  };

  const getActivitySuggestion = () => {
    const condition = weather.details.toLowerCase();
    
    if (condition.includes('rain')) return { icon: UilUmbrella, text: "Indoor activities, carry an umbrella" };
    if (condition.includes('snow')) return { icon: UilSnowflake, text: "Winter sports or cozy indoor time" };
    if (condition.includes('clear') || condition.includes('sunny')) return { icon: UilSun, text: "Perfect for outdoor activities and sports" };
    if (condition.includes('cloud')) return { icon: UilUser, text: "Great for walking or light outdoor activities" };
    return { icon: UilUser, text: "Check conditions before outdoor plans" };
  };

  const clothingSuggestion = getClothingSuggestion();
  const activitySuggestion = getActivitySuggestion();

  return (
    <div className="mt-8">
      <div className="flex items-center justify-start mb-4 sm:mb-6">
        <p className="text-white text-lg sm:text-xl md:text-2xl font-medium uppercase">Recommendations</p>
      </div>
      <hr className="my-2 border-white border-opacity-30" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
        <div className="bg-white bg-opacity-25 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white border-opacity-20">
          <div className="flex items-center mb-3 sm:mb-4">
            <clothingSuggestion.icon size={24} className="text-white mr-2 sm:mr-3 flex-shrink-0" />
            <h3 className="text-white text-base sm:text-lg md:text-xl font-medium">What to Wear</h3>
          </div>
          <p className="text-white text-sm sm:text-base md:text-lg font-light leading-relaxed">{clothingSuggestion.text}</p>
        </div>

        <div className="bg-white bg-opacity-25 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white border-opacity-20">
          <div className="flex items-center mb-3 sm:mb-4">
            <activitySuggestion.icon size={24} className="text-white mr-2 sm:mr-3 flex-shrink-0" />
            <h3 className="text-white text-base sm:text-lg md:text-xl font-medium">Activity Suggestions</h3>
          </div>
          <p className="text-white text-sm sm:text-base md:text-lg font-light leading-relaxed">{activitySuggestion.text}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherSuggestions;