import { days, months } from "../constants";

import { AppContext } from "../state/AppProvider";
import { UTCToHour } from "../functions";
import { useContext } from "react";

const formatDate = (date: Date) =>
  days.large[date.getDay()] +
  ", " +
  ("0" + date.getDate()).slice(-2) +
  " " +
  months.short[date.getMonth()];

const CurrentLocation = () => {
  const { state } = useContext(AppContext);
  const { currentWeather } = state;

  return (
    <div className="flex justify-between items-center gap-4">
      <div>
        <h3 className="text-2xl font-bold leading-7">
          {currentWeather.name + ", " + currentWeather.sys.country}
        </h3>
        <p className="text-chinese-silver font-semibold">
          {formatDate(new Date(currentWeather.dt * 1000))}
          {" - "}
          {UTCToHour(currentWeather.dt).slice(-2) !== "00"
            ? "Now"
            : UTCToHour(currentWeather.dt)}
        </p>
        <p className="text-chinese-silver font-semibold"></p>
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
