import { BsTwitter, BsInstagram, BsLinkedin } from "react-icons/bs";

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
        href="https://www.instagram.com/noemunozsanchezz/"
        target="_blank"
        rel="noreferrer"
        className={`${theme === "dark" ? "nightmode" : ""}`}
      >
        <BsInstagram />
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
