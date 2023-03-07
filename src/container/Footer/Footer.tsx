import React, { useState, useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  const { username, email, message } = formData;

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client
      .create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2 className={`head-text ${theme === "dark" ? "nightmode" : ""}`}>
        Take a coffee & chat with me
      </h2>

      <div className="app__footer-cards">
        <div
          className={`app__footer-card ${theme === "dark" ? "nightmode" : ""}`}
        >
          <img src={images.email} alt="email" />
          <a
            href="mailto:noesm.16@gmail.com"
            className={`p-text ${theme === "dark" ? "nightmode" : ""}`}
          >
            noesm.16@gmail.com
          </a>
        </div>
        <div
          className={`app__footer-card ${theme === "dark" ? "nightmode" : ""}`}
        >
          <img src={images.whatsapp} alt="phone" />
          <a
            href="https://api.whatsapp.com/send?phone=524929420411&text=Hola!%20Vi%20tu%20contacto%20en%20tu%20sitio%20web."
            className={`p-text ${theme === "dark" ? "nightmode" : ""}`}
            target="_blank"
          >
            +52 (492) 942-0411
          </a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div
          className={`app__footer-form app__flex ${
            theme === "dark" ? "nightmode" : ""
          }`}
        >
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="username"
              value={username}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>
            {!loading ? "Send Message" : "Sending..."}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
