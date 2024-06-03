import React, { Suspense } from "react";
import Main from "../../containers/Main/Main";
import styles from "./styles.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

const Beers = ({ searchParams }) => {
  return (
    <main className={styles.mainContainer}>
      <Suspense key={JSON.stringify(searchParams)} fallback={<LoadingSpinner />}>
        <Main searchParams={searchParams} />
      </Suspense>
    </main>
  );
};

export default Beers;
