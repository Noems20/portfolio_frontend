import React, { useState, useEffect } from "react";
const ThemeContext = React.createContext({
  theme: "dark",
  toggleTheme: () => {},
});

function ThemeContextProvider(props: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setTheme(theme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { ThemeContextProvider, ThemeContext };
