import { days, months } from "../constants";

import { AppContext } from "../state/AppProvider";
import { useContext } from "react";

const formatDate = (date: Date) =>
  days.large[date.getDay()] +
  ", " +
  ("0" + date.getDate()).slice(-2) +
  " " +
  months.short[date.getMonth()];

const CurrentLocation = () => {
  const { state } = useContext(AppContext);
  const { weather } = state;

  return (
    <div className="flex justify-between items-center gap-4">
      <div>
        <h3 className="text-2xl font-bold leading-7">
          {weather.name + ", " + weather.sys.country}
        </h3>
        <p className="text-chinese-silver font-semibold">
          {formatDate(new Date(weather.dt * 1000))}
        </p>
      </div>

      <img
        src="/assets/images/map.png"
        alt="map"
        className="w-28 drop-shadow-2xl"
      />
    </div>
  );
};

export default CurrentLocation;
