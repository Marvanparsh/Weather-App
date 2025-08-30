import React, { useState, useEffect } from "react";
import { UilHeart, UilHeartBreak } from "@iconscout/react-unicons";

function FavoriteCities({ currentCity, setQuery }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('favoriteCities');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const addToFavorites = () => {
    if (currentCity && !favorites.includes(currentCity)) {
      const newFavorites = [...favorites, currentCity];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (city) => {
    const newFavorites = favorites.filter(fav => fav !== city);
    setFavorites(newFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(newFavorites));
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-white text-xl font-medium">Favorite Cities</p>
        {currentCity && (
          <button
            onClick={addToFavorites}
            className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-300"
          >
            <UilHeart size={20} className="text-red-400" />
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {favorites.map((city, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-2 hover:bg-opacity-30 transition-all duration-300"
          >
            <button
              onClick={() => setQuery({ q: city })}
              className="text-white text-sm font-medium"
            >
              {city}
            </button>
            <button
              onClick={() => removeFromFavorites(city)}
              className="text-red-400 hover:text-red-300"
            >
              <UilHeartBreak size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteCities;