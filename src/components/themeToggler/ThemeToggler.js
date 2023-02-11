import "./themeToggler.css";

import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function ThemeToggler() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const handleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };
  return (
    <>
        <label className="switch">
            <input type="checkbox" onChange={handleTheme}/>
            <span className="slider"></span>
        </label>
    </>
    
  );
};

export default ThemeToggler;
