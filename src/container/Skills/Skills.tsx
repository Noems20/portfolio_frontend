import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { motion } from "framer-motion";
import ReactTooltip from "react-tooltip";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Fragment } from "react";

import "./Skills.scss";

type Skill = {
  name: string;
  icon: SanityImageSource;
  bgColor: string;
};
type Experience = {
  works: Work[];
  year: number;
};
type Work = {
  name: string;
  desc: string;
  company: string;
};

const Skills = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className={`head-text ${theme === "dark" ? "nightmode" : ""}`}>
        Skills & Experiences
      </h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={`${index}-${skill.name}`}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon).url()} alt={skill.name} />
              </div>
              <p className={`p-text ${theme === "dark" ? "nightmode" : ""}`}>
                {skill.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <Fragment key={experience.year}>
              <motion.div className="app__skills-exp-item">
                <div
                  className={`app__skills-exp-year ${
                    theme === "dark" ? "nightmode" : ""
                  }`}
                >
                  <p className={`bold-text`}>{experience.year}</p>
                </div>
                <motion.div className="app__skills-exp-works">
                  {experience.works.map((work, index) => (
                    <Fragment key={`${index}-${work.name}`}>
                      <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        className="app__skills-exp-work"
                        data-tip
                        data-for={work.name}
                      >
                        <h4
                          className={`bold-text ${
                            theme === "dark" ? "nightmode" : ""
                          }`}
                        >
                          {work.name}
                        </h4>
                        <p
                          className={`p-text ${
                            theme === "dark" ? "nightmode" : ""
                          }`}
                        >
                          {work.company}
                        </p>
                      </motion.div>
                      <ReactTooltip
                        id={work.name}
                        effect="solid"
                        arrowColor="#fff"
                        className="skills-tooltip"
                      >
                        {work.desc}
                      </ReactTooltip>
                    </Fragment>
                  ))}
                </motion.div>
              </motion.div>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
