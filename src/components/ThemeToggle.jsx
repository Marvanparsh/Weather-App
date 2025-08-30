import React from "react";
import { UilSun, UilMoon } from "@iconscout/react-unicons";

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 z-50 p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-30 transition-all duration-300"
    >
      {darkMode ? (
        <UilSun size={24} className="text-yellow-300" />
      ) : (
        <UilMoon size={24} className="text-blue-200" />
      )}
    </button>
  );
}

export default ThemeToggle;