"use client";

import React from "react";
import styles from "./FilterItem.module.scss";

function FilterItem(props) {
  const { name, type, id, checkboxFunc, description, isChecked } = props;

  return (
    <div className={styles.filterItem}>
      <label htmlFor={name}>{description}</label>
      <input
        className={styles.checkbox}
        checked={isChecked}
        onChange={checkboxFunc}
        type={type}
        id={id}
        name={name}
      ></input>
    </div>
  );
}

export default FilterItem;
