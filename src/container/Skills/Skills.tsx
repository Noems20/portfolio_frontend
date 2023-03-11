import { useState, useEffect, useContext } from "react";
import { urlFor, client } from "../../client";
import BallCanvas from "../../components/canvas/Ball";

import { AppWrap, MotionWrap } from "../../wrapper";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ThemeContext } from "../../ThemeContext";

import "./Skills.scss";

type Skill = {
  _id: string;
  icon: SanityImageSource;
  name: string;
};

const Skills = () => {
  const { theme } = useContext(ThemeContext);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isMobile, setIsMobile] = useState<Boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const query = '*[_type == "skills"] | order(order asc)';

    client.fetch(query).then((data) => {
      setSkills(data);
    });
  }, []);

  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <>
      <h2 className={`head-text ${theme === "dark" ? "nightmode" : ""}`}>
        <span>Skills</span> also matter
      </h2>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {skills.map(
          (skill, index) =>
            ((isMobile && index < 5) || !isMobile) && (
              <div
                key={skill._id}
                className="w-30 h-30 flex flex-col justify-center justify-items-center"
              >
                <div className="ball flex flex-col justify-center justify-items-center">
                  <BallCanvas icon={urlFor(skill.icon).url()} />
                  <p
                    className={`p-text ${
                      theme === "dark" ? "nightmode" : ""
                    } text-center pt-1 text-sm`}
                  >
                    {skill.name}
                  </p>
                </div>
              </div>
            )
        )}
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-10 mt-8">
        {skills.map(
          (skill, index) =>
            isMobile &&
            index >= 5 && (
              <div className="flex flex-col justify-center justify-items-center">
                <div
                  key={skill._id}
                  className={`skill-circle ${
                    theme === "dark" ? "nightmode" : ""
                  }`}
                >
                  <img src={urlFor(skill.icon).url()} alt="{skill.name}" />
                </div>
                <p
                  className={`p-text ${
                    theme === "dark" ? "nightmode" : ""
                  } text-center pt-3 text-sm`}
                >
                  {skill.name}
                </p>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__primarybg app__skills"
);
