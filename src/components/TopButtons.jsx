import React from "react";

function TopButtons({ setQuery, darkMode = true }) {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Sydney",
    },
    {
      id: 3,
      title: "Tokyo",
    },
    {
      id: 4,
      title: "Toronto",
    },
    {
      id: 5,
      title: "Paris",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 my-4 sm:my-8 flex-wrap">
      {cities.map((city) => (
        <button
          key={city.id}
          className={`text-sm sm:text-lg md:text-xl font-medium px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm shadow-lg ${
            darkMode 
              ? 'text-white bg-gray-800 bg-opacity-60 hover:bg-opacity-80 border border-gray-600' 
              : 'text-white bg-white bg-opacity-25 hover:bg-opacity-35 border border-white border-opacity-40 shadow-lg'
          }`}
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );

}

export default TopButtons;