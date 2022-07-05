import { BiCog, BiMenuAltLeft } from "react-icons/bi";
import { useContext, useEffect } from "react";

import { AppContext } from "../state/AppProvider";
import CurrentLocation from "../components/CurrentLocation";
import CurrentWeather from "../components/CurrentWeather";
import StatusBar from "../components/StatusBar";
import { WEATHER } from "../state/ActionTypes";
import WeatherLater from "../components/WeatherLater";
import { getCurrentWeather } from "../apiCalls";
import { weatherImageUrl } from "../functions";

const Home = () => {
  const { state, dispatch } = useContext(AppContext);
  const { weather, settings } = state;

  useEffect(() => {
    getCurrentWeather(
      settings.location,
      settings.units.temperature === "celsius" ? "metric" : "imperial"
    )
      .then((currentWeather) =>
        dispatch({
          type: WEATHER,
          payload: currentWeather,
        })
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-between gap-8 p-8 ">
      <StatusBar leftIcon={<BiMenuAltLeft />} rightIcon={<BiCog />} />

      <CurrentLocation />

      <CurrentWeather />

      <WeatherLater />
    </section>
  );
};

export default Home;
