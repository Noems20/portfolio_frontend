import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";

const SocialMedia = ({ theme }: { theme: string }) => {
  return (
    <div className={`app__social`}>
      <a
        href="https://www.linkedin.com/in/noems20/"
        target="_blank"
        rel="noreferrer"
        className={`${theme === "dark" ? "nightmode" : ""}`}
      >
        <BsLinkedin />
      </a>
      <a
        href="https://github.com/Noems20"
        target="_blank"
        rel="noreferrer"
        className={`${theme === "dark" ? "nightmode" : ""}`}
      >
        <BsGithub />
      </a>
      <a
        href="https://twitter.com/noemunozsanchez"
        target="_blank"
        rel="noreferrer"
        className={`${theme === "dark" ? "nightmode" : ""}`}
      >
        <BsTwitter />
      </a>
    </div>
  );
};

export default SocialMedia;
