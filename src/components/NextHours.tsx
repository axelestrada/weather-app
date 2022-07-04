import { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import Carousel, { CarouselItem } from "./Carousel";

const NextHours = () => {
  const [forecast, setForecast] = useState({
    list: [
      {
        dt: 0,
        main: {
          temp: 0,
        },
        weather: [{ icon: "", description: "" }],
      },
    ],
  });

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

  const lat = 14.065597048714784;
  const lon = -87.17647758156913;
  const apiKey = "dd9ccd7de32bbcca969504a02f4cabfa";
  const unit = "metric";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&APPID=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setForecast(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const getHour = (seconds: number) => {
    const date = new Date(seconds * 1000);

    return (
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2)
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center font-semibold">
        <h4 className="text-xl">Later</h4>

        <a href="#" className="flex items-center text-blueberry">
          Next 5 Days
          <BiChevronRight className="text-2xl" />
        </a>
      </div>

      <Carousel>
        {forecast.list.slice(0, 8).map((weather, index) => (
          <CarouselItem
            key={index}
            title={getHour(weather.dt)}
            image={{
              src: getImageUrl(weather.weather[0].icon),
              alt: weather.weather[0].description,
            }}
            value={Math.round(weather.main.temp) + "°"}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default NextHours;
