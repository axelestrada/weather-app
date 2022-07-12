import { CURRENT_WEATHER, FORECAST, SETTINGS } from "./ActionTypes";

//Weather Data
export interface IWeather {
  dt: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
  };
  weather: [
    {
      description: string;
      icon: string;
      main: string;
    }
  ];
  wind: { speed: number };
}

export interface ICurrentWeatherAction {
  type: typeof CURRENT_WEATHER;
  payload: IWeather;
}

// Forecast
export interface IForecast {
  list: [IWeather];
}

export interface IForecastAction {
  type: typeof FORECAST;
  payload: IForecast;
}

// Settings
export interface ISettings {
  location: {
    lat: number;
    lon: number;
  };
  units: {
    temperature: "celsius" | "fahrenheit";
    speed: "km/h" | "m/s";
  };
  timeFormat: "12" | "24";
}

export interface ISettingsAction {
  type: typeof SETTINGS;
  payload: ISettings;
}

// State
export interface IState {
  settings: ISettings;
  currentWeather: IWeather;
  forecast: IForecast;
}

export type StateActions =
  | ISettingsAction
  | ICurrentWeatherAction
  | IForecastAction;
