import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = (props) => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("DARK_MODE"))
  );

  useEffect(() => {
    localStorage.setItem("DARK_MODE", darkMode);
    }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {props.children}
    </ThemeContext.Provider>
  );
};