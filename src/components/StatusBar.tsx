import { FC, ReactElement } from "react";

interface IStatusBar {
  children: ReactElement[];
  title?: string;
}

const StatusBar: FC<IStatusBar> = ({ children, title }) => (
  <div className="flex justify-between items-center">
    {children && children[0]}

    {title && <h2 className="text-blueberry font-medium">{title}</h2>}

    {children && children[1]}
  </div>
);

interface IStatusBarButton {
  children: ReactElement;
  className?: string;
}

export const StatusBarButton: FC<IStatusBarButton> = ({
  children,
  className,
}) => (
  <button
    type="button"
    className={`flex justify-center items-center w-11 h-11 rounded-lg text-3xl shadow-lg shadow-gray-150 bg-white ${
      className || ""
    }`}
  >
    {children}
  </button>
);

export default StatusBar;
