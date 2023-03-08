import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import "./Experiences.scss";

type Experience = {
  title: string;
  company_name: string;
  date: string;
  iconBg?: string;
  icon: SanityImageSource;
  activities: string[];
};

const ExperienceCard = ({
  experience,
  theme,
}: {
  experience: Experience;
  theme: string;
}) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: theme === "light" ? "#262e86" : "#1d1836",
      }}
      contentArrowStyle={{
        borderRight: `7px solid  ${theme === "light" ? "#262e86" : "#1d1836"}`,
      }}
      date={experience.date}
      dateClassName={`timeline_date ${theme === "light" ? "lightmode" : ""}`}
      iconStyle={{
        background: experience.iconBg || "#E6DEDD",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={urlFor(experience.icon).url()}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.activities.map((activity, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {activity}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const query = '*[_type == "experiences"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });
  }, []);

  return (
    <>
      <h2 className={`head-text ${theme === "dark" ? "nightmode" : ""}`}>
        Work <span>Experiences</span>
      </h2>

      <div className="app__experiences-container">
        <div className="app__experiences-exp">
          <VerticalTimeline
            lineColor={`${theme === "light" ? "#262e86" : "#fff"}`}
          >
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
                theme={theme}
              />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Experiences, "app__experiences"),
  "experiences",
  "app__whitebg"
);
