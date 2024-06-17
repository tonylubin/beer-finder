"use client";

import React from "react";
import styles from "./LoadingSpinner.module.scss";
import { ClockLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div className={styles.loadingSpinner}>
      <ClockLoader color={'var(--textSecondaryColor)'} size={80} speedMultiplier={2}/>
      <h1>Loading</h1>
    </div>
  );
};

export default LoadingSpinner;
