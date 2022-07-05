import { FC, ReactElement } from "react";

interface IStatusBar {
  title?: string;
  leftIcon: ReactElement;
  rightIcon: ReactElement;
}

const StatusBar: FC<IStatusBar> = ({ title, leftIcon, rightIcon }) => (
  <div className="flex justify-between items-center">
    <StatusBarButton icon={leftIcon} />

    {title && <h2 className="text-blueberry font-medium">{title}</h2>}

    <StatusBarButton icon={rightIcon} type="gradient" />
  </div>
);

interface IStatusBarButton {
  icon: ReactElement;
  type?: "gradient" | "default";
}

const StatusBarButton: FC<IStatusBarButton> = ({ icon, type }) => (
  <button
    type="button"
    className={`flex justify-center items-center w-11 h-11 rounded-lg text-3xl shadow-lg ${
      type === "gradient"
        ? "text-white bg-gradient-to-br from-pale-cornflower-blue to-blueberry shadow-french-sky-blue-300"
        : "bg-white shadow-gray-150"
    }`}
  >
    {icon}
  </button>
);

export default StatusBar;
