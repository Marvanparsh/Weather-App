import React from "react";
import { formatToLocalTime } from "../services/weatherService";

function TimeAndLocation({
  weather: { dt, timezone, name, country },
}) {
  return (
    <div className="text-center mb-8">
      <div className="mb-4">
        <p className="text-white text-2xl font-light opacity-90">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div>
        <p className="text-white text-5xl font-bold drop-shadow-lg">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;