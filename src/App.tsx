import { useContext, useEffect, useState } from "react";
import StatusBar, { StatusBarButton } from "./components/StatusBar";
import { BiMenuAltLeft, BiCog } from "react-icons/bi";
import CurrentLocation from "./components/CurrentLocation";
import CurrentWeather from "./components/CurrentWeather";
import NextHours from "./components/NextHours";
import { AppContext } from "./state/AppProvider";
import { WEATHER } from "./state/ActionTypes";
import { IWeather } from "./state/interfaces";

export default function App() {
  const { state, dispatch } = useContext(AppContext);

  const { weather, settings } = state;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        settings.location.lat
      }&lon=${settings.location.lon}&units=${
        settings.units.temperature === "celsius" ? "metric" : "imperial"
      }&APPID=dd9ccd7de32bbcca969504a02f4cabfa`
    )
      .then((response) => response.json())
      .then((data: IWeather) => {
        console.log(data);

        dispatch({
          type: WEATHER,
          payload: data,
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const imageUrl = (image: string) => {
    switch (image.slice(0, 2)) {
      case "03":
      case "04":
      case "50":
        image = "03";
        break;

      case "09":
      case "13":
        image = "09";
        break;

      case "11":
        image = "11";
        break;

      default:
        image = image;
        break;
    }

    return `/assets/images/${image}.png`;
  };

  return (
    <main className="w-full min-h-screen flex flex-col justify-between gap-8 p-8 bg-white text-dark-gunmetal">
      <StatusBar>
        <StatusBarButton>
          <BiMenuAltLeft />
        </StatusBarButton>

        <StatusBarButton className="text-white bg-gradient-to-br from-pale-cornflower-blue to-blueberry !shadow-french-sky-blue-300">
          <BiCog />
        </StatusBarButton>
      </StatusBar>

      <CurrentLocation
        location={weather.name + ", " + weather.sys.country}
        date={new Date(weather.dt * 1000)}
      />

      <CurrentWeather
        image={{
          src: imageUrl(weather.weather[0].icon),
          alt: weather.weather[0].description,
        }}
        type={weather.weather[0].main}
        description={weather.weather[0].description}
        temperature={Math.round(weather.main.temp)}
        feelsLike={Math.round(weather.main.feels_like)}
        airPressure={weather.main.pressure}
        windSpeed={Math.round(weather.wind.speed * 3.6)}
        humidity={weather.main.humidity}
      />

      <NextHours />
    </main>
  );
}
