import { IForecast, IWeather } from "./state/interfaces";

import { apiKey } from "./constants";

export const getCurrentWeather = (
  location: { lat: number; lon: number },
  units: "metric" | "imperial"
): Promise<IWeather> =>
  new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data: IWeather) => resolve(data))
      .catch((error) => reject(error.message));
  });

export const getForecast = (
  location: { lat: number; lon: number },
  units: "metric" | "imperial"
): Promise<IForecast> =>
  new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=${units}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data: IForecast) => resolve(data))
      .catch((error) => reject(error.message));
  });
