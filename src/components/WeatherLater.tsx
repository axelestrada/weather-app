import Carousel, { CarouselItem } from "./Carousel";
import { UTCToHour, weatherImageUrl } from "../functions";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "../state/AppProvider";
import { BiChevronRight } from "react-icons/bi";
import { FORECAST } from "../state/ActionTypes";
import { IForecast } from "../state/interfaces";
import { getForecast } from "../apiCalls";

const WeatherLater = () => {
  const { state, dispatch } = useContext(AppContext);
  const { settings, forecast } = state;

  useEffect(() => {
    getForecast(
      settings.location,
      settings.units.temperature === "celsius" ? "metric" : "imperial"
    ).then((forecastData: IForecast) =>
      dispatch({
        type: FORECAST,
        payload: forecastData,
      })
    );
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center font-semibold">
        <h4 className="text-xl">Later</h4>

        <a href="#" className="flex items-center text-blueberry">
          Next 5 Days
          <BiChevronRight className="text-2xl" />
        </a>
      </div>

      <Carousel>
        {forecast.list.slice(0, 8).map((weather, index) => (
          <CarouselItem
            key={index}
            title={UTCToHour(weather.dt)}
            image={{
              src: weatherImageUrl(weather.weather[0].icon),
              alt: weather.weather[0].description,
            }}
            value={Math.round(weather.main.temp) + "°"}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default WeatherLater;
