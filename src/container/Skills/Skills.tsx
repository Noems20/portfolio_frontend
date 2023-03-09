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

  useEffect(() => {
    const query = '*[_type == "skills"] | order(order asc)';

    client.fetch(query).then((data) => {
      setSkills(data);
    });
  }, []);
  return (
    <>
      <h2 className={`head-text ${theme === "dark" ? "nightmode" : ""}`}>
        <span>Skills</span> also matter
      </h2>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {skills.map((skill) => (
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
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__primarybg app__skills"
);
