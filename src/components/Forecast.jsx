import React from "react";

function Forecast({ title, items, darkMode = true }) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-start mb-6">
        <p className="text-white text-2xl font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2 border-white border-opacity-30" />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 py-4">
        {items.map((item, index) => {
          const isToday = index === 0;
          const isTomorrow = index === 1;
          
          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-center backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 hover:scale-105 border ${
                isToday 
                  ? 'bg-blue-500 bg-opacity-80 ring-2 ring-blue-300 border-blue-400' 
                  : darkMode 
                    ? 'bg-gray-800 bg-opacity-70 hover:bg-opacity-90 border-gray-600'
                    : 'bg-white bg-opacity-25 hover:bg-opacity-35 border-white border-opacity-40 shadow-lg'
              }`}
            >
              <p className={`font-medium text-sm mb-2 ${
                isToday ? 'text-white' : 'text-white opacity-90'
              }`}>
                {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : item.title}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                className="w-12 h-12 my-2"
                alt={item.desc}
              />
              <p className={`font-bold text-lg ${
                isToday ? 'text-white' : 'text-white'
              }`}>
                {`${item.temp.toFixed()}°`}
              </p>
              <p className={`font-light text-xs mt-1 text-center ${
                isToday ? 'text-white opacity-90' : 'text-white opacity-70'
              }`}>
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;