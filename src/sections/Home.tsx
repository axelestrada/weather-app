import { BiCog, BiMenuAltLeft } from "react-icons/bi";
import { CURRENT_WEATHER, FORECAST } from "../state/ActionTypes";
import { IForecast, IWeather } from "../state/interfaces";
import { getCurrentWeather, getForecast } from "../apiCalls";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "../state/AppProvider";
import CurrentLocation from "../components/CurrentLocation";
import CurrentWeather from "../components/CurrentWeather";
import StatusBar from "../components/StatusBar";
import WeatherLater from "../components/WeatherLater";
import { weatherImageUrl } from "../functions";

const Home = () => {
  const { state, dispatch } = useContext(AppContext);
  const { currentWeather, settings } = state;

  const [loading, setLoading] = useState(true);
  const [weatherNow, setWeatherNow] = useState(currentWeather);

  useEffect(() => {
    const getData = async () => {
      await getCurrentWeather(
        settings.location,
        settings.units.temperature === "celsius" ? "metric" : "imperial"
      )
        .then((currentWeather) => {
          setWeatherNow(currentWeather);

          dispatch({
            type: CURRENT_WEATHER,
            payload: currentWeather,
          });
        })
        .catch((err) => console.error(err));

      await getForecast(
        settings.location,
        settings.units.temperature === "celsius" ? "metric" : "imperial"
      )
        .then((forecastData: IForecast) => {
          dispatch({
            type: FORECAST,
            payload: forecastData,
          });
        })
        .catch((err) => console.log(err));

      setLoading(false);
    };

    getData().catch((err) => console.error(err));
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col justify-between gap-8 p-8 ">
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-white flex justify-center items-center">
          Loading...
        </div>
      )}

      <StatusBar leftIcon={<BiMenuAltLeft />} rightIcon={<BiCog />} />

      <CurrentLocation />

      <CurrentWeather />

      <WeatherLater now={weatherNow} />
    </section>
  );
};

export default Home;
