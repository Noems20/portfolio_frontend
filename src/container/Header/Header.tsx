import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import ComputersCanvas from "../../components/canvas/computers";
import { styles } from "../../styles";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import "./Header.scss";

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1
            className={`${styles.heroHeadText} ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            Hi, I'm <span className="text-[#915EFF]">Noé</span>
          </h1>
          <p
            className={`${styles.heroSubText} mt-2 ${
              theme === "light" ? "text-[#915EFF]" : "text-[#dfd9ff] "
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
