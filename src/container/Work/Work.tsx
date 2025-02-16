import { useState, useEffect, useContext, useMemo } from "react";
import { ThemeContext } from "../../ThemeContext";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Work.scss";

type Work = {
  title: string;
  imgUrl: SanityImageSource;
  tags: string[];
  projectLink: string;
  codeLink: string;
  description: string;
  _id: string;
};

const Work = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [filterWork, setFilterWork] = useState<Work[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const query = '*[_type == "works"] | order(order desc)';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item: string) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });

      if (item === "All") {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  const tags = useMemo(() => {
    const workTags = Array.from(
      works.reduce((acc, work) => {
        work.tags.forEach((tag) => acc.add(tag));
        return acc;
      }, new Set<string>())
    );
    workTags.push("All");
    return workTags;
  }, [works]);

  return (
    <>
      <h2 className={`head-text ${theme === "dark" ? "nightmode" : ""}`}>
        My Creative <span>Portfolio</span> Section
      </h2>

      <div className="app__work-filter">
        {tags.map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            } ${theme === "dark" ? "nightmode" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work: Work, index) => (
          <div
            className="background green-pink-gradient rounded-[20px] p-[1px]"
            key={work._id}
          >
            <div
              className={`app__work-item app__flex ${
                theme === "dark" ? "nightmode" : ""
              } rounded-[20px]`}
              key={index}
            >
              <div className="app__work-img app__flex">
                <img src={urlFor(work.imgUrl).url()} alt={work.title} />

                <motion.div
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                    staggerChildren: 0.5,
                  }}
                  className="app__work-hover app__flex"
                >
                  {work.projectLink && (
                    <a href={work.projectLink} target="_blank" rel="noreferrer">
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillEye />
                      </motion.div>
                    </a>
                  )}
                  {work.codeLink && (
                    <a href={work.codeLink} target="_blank" rel="noreferrer">
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillGithub />
                      </motion.div>
                    </a>
                  )}
                </motion.div>
              </div>

              <div className="app__work-content app__flex">
                <h4
                  className={`bold-text ${theme === "dark" ? "nightmode" : ""}`}
                >
                  {work.title}
                </h4>
                <p
                  className={`p-text ${theme === "dark" ? "nightmode" : ""}`}
                  style={{ marginTop: 10 }}
                >
                  {work.description}
                </p>

                <div
                  className={`app__work-tag app__flex ${
                    theme === "dark" ? "nightmode" : ""
                  }`}
                >
                  <p
                    className={`p-text ${theme === "dark" ? "nightmode" : ""}`}
                  >
                    {work.tags[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
