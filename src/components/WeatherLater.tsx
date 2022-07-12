import { CURRENT_WEATHER, FORECAST } from "../state/ActionTypes";
import Carousel, { CarouselItem } from "./Carousel";
import { FC, useContext, useEffect, useState } from "react";
import { UTCToHour, weatherImageUrl } from "../functions";

import { AppContext } from "../state/AppProvider";
import { BiChevronRight } from "react-icons/bi";
import { IWeather } from "../state/interfaces";

const WeatherLater: FC<{ now: IWeather }> = ({ now }) => {
  const { state, dispatch } = useContext(AppContext);
  const { forecast, currentWeather } = state;

  const handleClick = (weather: IWeather) => {
    dispatch({
      type: CURRENT_WEATHER,
      payload: {...weather, ...{sys: currentWeather.sys}},
    });
  };

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
        <CarouselItem
          time="Now"
          image={{
            src: weatherImageUrl(now.weather[0].icon),
            alt: now.weather[0].description,
          }}
          temperature={Math.round(now.main.temp) + "°"}
          active={currentWeather.dt === now.dt}
          onClick={() => {
            handleClick(now);
          }}
        />

        {forecast.list.slice(0, 8).map((weather, index) => (
          <CarouselItem
            key={index}
            time={UTCToHour(weather.dt)}
            image={{
              src: weatherImageUrl(weather.weather[0].icon),
              alt: weatherImageUrl(weather.weather[0].description),
            }}
            temperature={Math.round(weather.main.temp) + "°"}
            active={currentWeather.dt === weather.dt}
            onClick={() => {
              handleClick(weather);
            }}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default WeatherLater;
