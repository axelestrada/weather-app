import { IWeather, StateActions } from "../interfaces";

import { CURRENT_WEATHER } from "../ActionTypes";

const currentWeatherReducer = (weather: IWeather, action: StateActions) => {
  switch (action.type) {
    case CURRENT_WEATHER:
      return { ...weather, ...action.payload };

    default:
      return weather;
  }
};

export default currentWeatherReducer;
