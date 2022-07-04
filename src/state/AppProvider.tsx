import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { ISettingsAction, IState, IWeatherAction, StateActions } from "./interfaces";
import settingsReducer from "./reducers/settingsReducer";
import weatherReducer from "./reducers/weatherReducer";

const APP_STATE_NAME = "GlobalState";

const initialState: IState = JSON.parse(
  localStorage.getItem(APP_STATE_NAME)!
) || {
  settings: {
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
  weather: {
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
};

const AppContext = createContext<{
  state: IState;
  dispatch: Dispatch<StateActions>;
}>({ state: initialState, dispatch: () => null });

const combinedReducers = (
  { settings, weather }: IState,
  action: ISettingsAction | IWeatherAction
) => ({
  settings: settingsReducer(settings, action),
  weather: weatherReducer(weather, action),
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(combinedReducers, initialState);

  useEffect(() => {
    localStorage.setItem(APP_STATE_NAME, JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
export { AppContext, AppProvider };
