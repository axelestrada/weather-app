import { IForecast, StateActions } from "../interfaces";

import { FORECAST } from "../ActionTypes";

const forecastReducer = (forecast: IForecast, action: StateActions) => {
  switch (action.type) {
    case FORECAST:
      return { ...forecast, ...action.payload };

    default:
      return forecast;
  }
};

export default forecastReducer;
