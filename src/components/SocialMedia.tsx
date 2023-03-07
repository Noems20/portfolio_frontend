import { BsTwitter, BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const SocialMedia = ({ theme }: { theme: string }) => {
  return (
    <div className={`app__social`}>
      <div className={`${theme === "dark" ? "nightmode" : ""}`}>
        <BsTwitter />
      </div>
      <div className={`${theme === "dark" ? "nightmode" : ""}`}>
        <FaFacebookF />
      </div>
      <div className={`${theme === "dark" ? "nightmode" : ""}`}>
        <BsInstagram />
      </div>
    </div>
  );
};

export default SocialMedia;
