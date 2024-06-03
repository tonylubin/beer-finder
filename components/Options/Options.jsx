'use client';

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import FiltersList from "../../containers/FiltersList/FiltersList";
import SearchBox from "../SearchBox/SearchBox";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import styles from "./Options.module.scss";

const Options = () => {
  const [visibility, setVisibility] = useState(false);

  const { pending } = useFormStatus();

  const revealBox = () => {
    setVisibility(!visibility);
  };

  return (
    <section className={styles.options}>
      <div
        className={`${styles.options__box} ${
          !visibility ? styles.options__hiddenBox : null
        }`}
      >
        <SearchBox pending={pending} />
        {pending && <p className={styles.msg}>searching....</p>}
        <div className={styles.options__filters}>
          <FiltersList />
        </div>
      </div>
      <div className={styles.switch}>
        <ToggleSwitch />
      </div>
      <div className={styles.btnHolder}>
        <button className={styles.btnHolder__btn} onClick={revealBox}>
          Filter / Search
        </button>
      </div>
    </section>
  );
};

export default Options;
