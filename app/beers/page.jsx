import React, { Suspense } from "react";
import styles from "./styles.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import InfiniteScroll from "@/containers/InfiniteScroll/InfiniteScroll";
import {
  getFilteredResults,
  paginatedResults,
} from "@/utils/actions";

const Beers = async ({ searchParams }) => {

  const pageNumber = 1;
  let beerData;
  let collectionCount;

  // check if search params present
  if (Object.keys(searchParams).length) {
    const { totalCount, resultsQuery } = await getFilteredResults(pageNumber, searchParams);
    beerData = resultsQuery;
    collectionCount = totalCount;
  } else {
    const { data, totalCount } = await paginatedResults(pageNumber, searchParams);
    beerData = data;
    collectionCount = totalCount;
  }

  return (
    <main className={styles.mainContainer}>
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<LoadingSpinner />}
      >
        <InfiniteScroll
          searchParams={searchParams}
          collectionCount={collectionCount}
          beerData={beerData}
        />
      </Suspense>
    </main>
  );
};

export default Beers;
