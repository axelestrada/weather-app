import { useEffect, useState } from "react";
import StatusBar, { StatusBarButton } from "./components/StatusBar";
import { BiMenuAltLeft, BiCog } from "react-icons/bi";
import CurrentLocation from "./components/CurrentLocation";
import CurrentWeather from "./components/CurrentWeather";
import NextHours from "./components/NextHours";

export default function App() {
  const [weatherData, setWeatherData] = useState({
    dt: 0,
    weather: [
      {
        icon: "",
        description: "",
        main: "",
      },
    ],
    main: {
      temp: 0,
      feels_like: 0,
      humidity: 0,
      pressure: 0
    },
    wind: {
      speed: 0,
    },
    sys: {
      country: "",
    },
    name: "",
  });

  const lat = 14.065597048714784;
  const lon = -87.17647758156913;
  const apiKey = "dd9ccd7de32bbcca969504a02f4cabfa";
  const unit = "metric";

  const getImageUrl = (image: string) => {
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

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&APPID=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

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
        location={weatherData.name + ", " + weatherData.sys.country}
        date={new Date(weatherData.dt * 1000)}
      />

      <CurrentWeather
        image={{
          src: getImageUrl(weatherData.weather[0].icon),
          alt: weatherData.weather[0].description,
        }}
        type={weatherData.weather[0].main}
        description={weatherData.weather[0].description}
        temperature={Math.round(weatherData.main.temp)}
        feelsLike={Math.round(weatherData.main.feels_like)}
        airPressure={weatherData.main.pressure}
        windSpeed={Math.round(weatherData.wind.speed * 3.6)}
        humidity={weatherData.main.humidity}
      />

      <NextHours />
    </main>
  );
}
