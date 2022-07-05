export const weatherImageUrl = (image: string) => {
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

export const UTCToHour = (seconds: number) => {
  const date = new Date(seconds * 1000);

  return (
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2)
  );
}