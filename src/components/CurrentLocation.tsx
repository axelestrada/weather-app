import { FC } from "react";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (date: Date) =>
  days[date.getDay()] +
  ", " +
  ("0" + date.getDate()).slice(-2) +
  " " +
  months[date.getMonth()];

interface ICurrentLocation {
  location: string;
  date: Date;
}

const CurrentLocation: FC<ICurrentLocation> = ({ location, date }) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <div>
        <h3 className="text-2xl font-bold leading-7">{location}</h3>
        <p className="text-chinese-silver font-semibold">
          {formatDate(date)}
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
