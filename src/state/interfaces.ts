import { SETTINGS, WEATHER } from "./ActionTypes";

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

export interface IWeatherAction {
  type: typeof WEATHER;
  payload: IWeather;
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
  weather: IWeather;
}

export type StateActions = ISettingsAction | IWeatherAction;
