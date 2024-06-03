import React from "react";
import FiltersList from "../FiltersList/FiltersList";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <h3 className={styles.nav__header}>Filters:</h3>
        <FiltersList />
        <p className={styles.info}>Click on card for more information</p>
      </nav>
    </div>
  );
};

export default NavBar;
