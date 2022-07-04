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
  title: string;
  image: {
    src: string;
    alt: string;
  };
  value: string;
  active?: boolean;
}

export const CarouselItem: FC<ICarouselItem> = ({
  title,
  image,
  value,
  active,
}) => (
  <div
    className={`flex flex-col items-center justify-between h-34 py-4 px-4 font-semibold rounded-full ${
      active
        ? "shadow-xl shadow-violets-are-blue-250 bg-gradient-to-b from-maximum-blue-purple to-violets-are-blue text-white"
        : "text-chinese-silver shadow-lg shadow-french-sky-blue-300"
    }`}
  >
    <h6 className="text-sm">{title}</h6>
    <img className="w-10" src={image.src} alt={image.alt} />
    <p className="text-lg">{value}</p>
  </div>
);

export default Carousel;
