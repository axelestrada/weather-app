import { FC, useContext } from "react";

import { AppContext } from "../state/AppProvider";
import { weatherImageUrl } from "../functions";

const CurrentWeather = () => {
  const { state } = useContext(AppContext);
  const { weather } = state;

  return (
    <div className="flex flex-col gap-8">
      <div className="mt-10 flex justify-between items-center gap-4 p-4 rounded-3xl bg-gradient-to-br from-pale-cornflower-blue to-blueberry shadow-xl shadow-french-sky-blue-300">
        <div className="flex flex-col justify-between gap-4 h-full">
          <div>
            <img
              className="w-36 -mt-14 drop-shadow-2xl"
              src={weatherImageUrl(weather.weather[0].icon)}
              alt={weather.weather[0].description}
            />
          </div>

          <div className="text-white capitalize">
            <h3 className="font-bold text-xl leading-6">
              {weather.weather[0].main}
            </h3>
            <h5 className="font-medium">{weather.weather[0].description}</h5>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h3 className="font-bold text-7xl leading-12 text-transparent bg-clip-text bg-gradient-to-b from-alice-blue to-pale-cornflower-blue">
            {Math.round(weather.main.temp)}°
          </h3>
          <p className="text-white font-medium">
            Feels like {Math.round(weather.main.feels_like)}°
          </p>

          <img className="w-24" src="/assets/images/breeze.png" alt="breeze" />
        </div>
      </div>

      <div className="w-full flex justify-center gap-6">
        <DetailsItem
          image={{ src: "/assets/images/cloudy.png", alt: "cloudy" }}
          value={weather.main.pressure + " hPa"}
        />

        <DetailsItem
          image={{ src: "/assets/images/wind.png", alt: "wind" }}
          value={Math.round(weather.wind.speed) + " km/h"}
        />

        <DetailsItem
          image={{ src: "/assets/images/drop.png", alt: "drop" }}
          value={weather.main.humidity + " %"}
        />
      </div>
    </div>
  );
};

interface IDetailsItem {
  image: {
    src: string;
    alt: string;
  };
  value: string;
}

const DetailsItem: FC<IDetailsItem> = ({ image, value }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="flex justify-center items-center w-16 h-16 rounded-2xl bg-cultured">
      <img className="w-10" src={image.src} alt={image.alt} />
    </div>
    <h5 className="text-quartz font-semibold">{value}</h5>
  </div>
);

export default CurrentWeather;
