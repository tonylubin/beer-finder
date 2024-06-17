import React, { Suspense } from "react";
import styles from "./styles.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import InfiniteScroll from "@/containers/InfiniteScroll/InfiniteScroll";
import { getInitialBeers } from "@/utils/actions";
import { resultsPerPage } from "@/utils/constants";


const Beers = async ({ searchParams }) => {
  
  // fetching initial data & total document count in DB
  const { data, dbEntries } = await getInitialBeers();
  
  const totalPages = dbEntries / resultsPerPage;

  return (
    <main className={styles.mainContainer}>
      <Suspense key={JSON.stringify(searchParams)} fallback={<LoadingSpinner />}>
        <InfiniteScroll searchParams={searchParams} initialData={data} pages={totalPages} />
      </Suspense>
    </main>
  );
};

export default Beers;