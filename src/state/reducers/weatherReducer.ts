import { WEATHER } from "../ActionTypes";
import { IWeather, StateActions } from "./../interfaces";

const weatherReducer = (weather: IWeather, action: StateActions) => {
  switch (action.type) {
    case WEATHER:
      return { ...weather, ...action.payload };

    default:
      return weather;
  }
};

export default weatherReducer;
