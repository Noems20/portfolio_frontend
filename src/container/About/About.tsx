import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { motion } from "framer-motion";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { urlFor, client } from "../../client";

type About = {
  title: string;
  description: string;
  imgUrl: SanityImageSource;
};

const About = () => {
  const [abouts, setAbouts] = useState<About[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const query = '*[_type == "abouts"] | order(order desc)';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <h2 className={`head-text ${theme === "dark" ? "nightmode" : ""}`}>
        I Know that <span>Good Design</span> <br />
        means <span>Good Business</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl).url()} alt={about.title} />
            <h2
              className={`bold-text ${theme === "dark" ? "nightmode" : ""}`}
              style={{ marginTop: 20 }}
            >
              {about.title}
            </h2>
            <p
              className={`p-text ${theme === "dark" ? "nightmode" : ""}`}
              style={{ marginTop: 10 }}
            >
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
