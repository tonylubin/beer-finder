'use client'

import React, { useContext, useEffect } from "react";
import styles from "./ToggleSwitch.module.scss";
import { ThemeContext } from "../../containers/ThemeContext";
import MoonIcon from "../Icons/MoonIcon";
import SunIcon from "../Icons/SunIcon";


const ToggleSwitch = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  const toggleTheme = () =>
    theme === "light" ? setTheme("dark") : setTheme("light");

  // set data attribute on html document with theme value  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button type="button" onClick={toggleTheme} className={styles.btn}>
      {theme === "light" && <MoonIcon classname={styles.moon} />}
      {theme === "dark" && <SunIcon classname={styles.sun} />}
    </button>
  );
};

export default ToggleSwitch;
