const NavigationDots = ({
  active,
  theme,
}: {
  active: string;
  theme: string;
}) => (
  <div className="app__navigation">
    {["home", "about", "work", "experiences", "skills", "contact"].map(
      (item, index) => (
        <a
          href={`#${item}`}
          key={item + index}
          className={`app__navigation-dot ${
            theme === "dark" ? "nightmode" : ""
          }`}
          style={
            active === item
              ? { backgroundColor: theme === "dark" ? "#915eff" : "#313BAC" }
              : {}
          }
        />
      )
    )}
  </div>
);

export default NavigationDots;
