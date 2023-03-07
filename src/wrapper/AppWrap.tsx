import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { NavigationDots, SocialMedia } from "../components";
import { FC } from "react";

const AppWrap = (Component: FC, idName: string, classNames = "") =>
  function HOC() {
    const { theme } = useContext(ThemeContext);
    return (
      <div
        id={idName}
        className={`app__container ${classNames} ${
          theme === "dark" ? "nightmode" : ""
        }`}
      >
        <SocialMedia theme={theme} />
        <div className="app__wrapper app__flex">
          <Component />

          <div className={`copyright ${theme === "dark" ? "nightmode" : ""}`}>
            <p className="p-text">@{new Date().getFullYear()} Noé</p>
            <p className="p-text">All rights reserved</p>
          </div>
        </div>
        <NavigationDots active={idName} theme={theme} />
      </div>
    );
  };

export default AppWrap;
