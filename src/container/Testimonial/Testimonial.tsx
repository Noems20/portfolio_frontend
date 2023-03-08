import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Testimonial.scss";

type Brand = {
  _id: string;
  name: string;
  imgUrl: SanityImageSource;
};
type Testimonial = {
  imgurl: SanityImageSource;
  name: string;
  feedback: string;
  company: string;
};

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const { theme } = useContext(ThemeContext);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  return (
    <>
      {testimonials.length && (
        <>
          <div
            className={`app__testimonial-item app__flex ${
              theme === "dark" ? "nightmode" : ""
            }`}
          >
            <img
              src={urlFor(testimonials[currentIndex].imgurl).url()}
              alt={testimonials[currentIndex].name}
            />
            <div
              className={`app__testimonial-content ${
                theme === "dark" ? "nightmode" : ""
              }`}
            >
              <p className={`p-text ${theme === "dark" ? "nightmode" : ""}`}>
                {testimonials[currentIndex].feedback}
              </p>
              <div>
                <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                <h5 className={`p-text ${theme === "dark" ? "nightmode" : ""}`}>
                  {testimonials[currentIndex].company}
                </h5>
              </div>
            </div>
          </div>

          <div
            className={`app__testimonial-btns app__flex ${
              theme === "dark" ? "nightmode" : ""
            }`}
          >
            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className="app__flex"
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl).url()} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__whitebg"
);
