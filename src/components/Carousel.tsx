import { FC, ReactNode } from "react";

interface ICarousel {
  children: ReactNode;
}

const Carousel: FC<ICarousel> = ({ children }) => {
  return (
    <div className="flex items-center overflow-x-scroll w-screen gap-5 p-8 -m-8 scrollbar-none">
      {children}
    </div>
  );
};

interface ICarouselItem {
  time: string;
  image: {
    src: string;
    alt: string;
  };
  temperature: string;
  active?: boolean;
  onClick?: () => void;
}

export const CarouselItem: FC<ICarouselItem> = ({
  time,
  image,
  temperature,
  active,
  onClick
}) => (
  <div
    className={`flex flex-col items-center justify-between h-34 py-4 px-4 font-semibold rounded-full ${
      active
        ? "shadow-xl shadow-violets-are-blue-250 bg-gradient-to-b from-maximum-blue-purple to-violets-are-blue text-white"
        : "text-chinese-silver shadow-lg shadow-french-sky-blue-300"
    }`}
    onClick={onClick}
  >
    <h6 className="text-sm">{time}</h6>
    <img className="w-10" src={image.src} alt={image.alt} />
    <p className="text-lg">{temperature}</p>
  </div>
);

export default Carousel;
