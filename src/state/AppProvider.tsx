import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";
import {
  ICurrentWeatherAction,
  IForecastAction,
  ISettingsAction,
  IState,
  StateActions,
} from "./interfaces";

import currentWeatherReducer from "./reducers/currentWeatherReducer";
import forecastReducer from "./reducers/forecastReducer";
import settingsReducer from "./reducers/settingsReducer";

const APP_STATE_NAME = "AppSettings";

const initialState: IState = {
  settings: JSON.parse(localStorage.getItem(APP_STATE_NAME)!)?.settings || {
    location: {
      lat: 37.7749,
      lon: -122.4194,
    },
    units: {
      temperature: "celsius",
      speed: "km/h",
    },
    timeFormat: "24",
  },
  currentWeather: {
    dt: 0,
    main: {
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    name: "",
    sys: {
      country: "",
    },
    weather: [
      {
        description: "",
        icon: "",
        main: "",
      },
    ],
    wind: { speed: 0 },
  },
  forecast: {
    list: [
      {
        dt: 0,
        main: {
          feels_like: 0,
          humidity: 0,
          pressure: 0,
          temp: 0,
          temp_max: 0,
          temp_min: 0,
        },
        name: "",
        sys: {
          country: "",
        },
        weather: [
          {
            description: "",
            icon: "",
            main: "",
          },
        ],
        wind: { speed: 0 },
      },
    ],
  },
};

const AppContext = createContext<{
  state: IState;
  dispatch: Dispatch<StateActions>;
}>({ state: initialState, dispatch: () => null });

const combinedReducers = (
  { settings, currentWeather, forecast }: IState,
  action: ISettingsAction | ICurrentWeatherAction | IForecastAction
) => ({
  settings: settingsReducer(settings, action),
  currentWeather: currentWeatherReducer(currentWeather, action),
  forecast: forecastReducer(forecast, action),
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(combinedReducers, initialState);

  useEffect(() => {
    localStorage.setItem(
      APP_STATE_NAME,
      JSON.stringify({
        settings: state.settings,
      })
    );
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export { AppContext, AppProvider };
