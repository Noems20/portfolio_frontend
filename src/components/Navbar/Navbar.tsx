import { useState, useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { MdNightsStay, MdSunny } from "react-icons/md";

import { images } from "../../constants";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

import "./Navbar.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`app__navbar ${theme === "dark" ? "nightmode" : ""}`}>
      <div className="app__navbar-logo">
        <img
          src={theme === "dark" ? images.logo : images.logoLight}
          alt="logo"
        />
      </div>
      <ul className="app__navbar-links">
        {["home", "about", "work", "experiences", "skills", "contact"].map(
          (item) => (
            <li
              key={`link-${item}`}
              className={`app__flex p-text ${
                theme === "dark" ? "nightmode" : ""
              }`}
            >
              <a href={`#${item}`}>{item}</a>
            </li>
          )
        )}
        <li
          onClick={() => toggleTheme()}
          className={`${theme === "dark" ? "nightmode" : ""}`}
        >
          {theme === "light" ? <MdNightsStay /> : <MdSunny />}
        </li>
      </ul>

      <div
        className={`app__navbar-menu ${theme === "dark" ? "nightmode" : ""}`}
      >
        <HiMenuAlt4 className="bars" onClick={() => setToggle(true)} />
        <AnimatePresence>
          {toggle && (
            <motion.div
              initial={{ x: 1000 }}
              animate={{ x: 0 }}
              exit={{ x: 1000 }}
              transition={{ type: "spring", damping: 15, mass: 0.5 }}
            >
              <HiX className="close" onClick={() => setToggle(false)} />
              <ul>
                {[
                  "home",
                  "about",
                  "work",
                  "experiences",
                  "skills",
                  "contact",
                ].map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={() => setToggle(false)}>
                      {item}
                    </a>
                  </li>
                ))}
                <li
                  onClick={() => toggleTheme()}
                  className={`${theme === "dark" ? "nightmode" : ""}`}
                >
                  {theme === "light" ? <MdNightsStay /> : <MdSunny />}
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
