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
};

const Skills = () => {
  const { theme } = useContext(ThemeContext);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const query = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setSkills(data);
    });
  }, []);
  return (
    <>
      <h2 className={`head-text ${theme === "dark" ? "nightmode" : ""}`}>
        <span>Skills</span> also matters
      </h2>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {skills.map((skill) => (
          <div className="w-28 h-28" key={skill._id}>
            <BallCanvas icon={urlFor(skill.icon).url()} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__primarybg"
);
