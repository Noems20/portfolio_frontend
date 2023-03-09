import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import ComputersCanvas from "../../components/canvas/computers";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { styles } from "../../styles";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import "./Header.scss";

const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div
            className={`w-5 h-5 rounded-full ${
              theme === "dark" ? "bg-[#915EFF]" : "bg-[#313bac]"
            }`}
          />
          <div
            className={`w-1 sm:h-80 h-40 ${
              theme === "light" ? "secondary-gradient" : "violet-gradient"
            }`}
          />
        </div>

        <div>
          <Typewriter
            options={{
              strings: [`Hi, I'm <span >Noé!</span>`, "Welcome!"],
              autoStart: true,
              loop: true,
              wrapperClassName: `${styles.heroHeadText} ${
                theme === "light" ? "text-black" : "text-white"
              } typewritter-text ${theme === "dark" ? "nightmode" : ""}`,
              cursorClassName: `${styles.heroHeadText} ${
                theme === "light" ? "text-black" : "text-white"
              } font-extralight`,
            }}
          />
          <p
            className={`${styles.heroSubText} mt-2 ${
              theme === "light" ? "text-[#313bac]" : "text-[#dfd9ff]"
            }`}
          >
            I develop 3D visuals, user <br className="sm:block hidden" />
            interfaces and web applications
          </p>
        </div>
      </div>
      {theme === "light" && (
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          src={images.circle}
          alt="profile_circle"
          className="overlay_circle"
        />
      )}

      <ComputersCanvas />
    </section>
  );
};

export default AppWrap(Header, "home");
