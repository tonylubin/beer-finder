import React, { Suspense } from "react";
import styles from "./styles.module.scss";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import InfiniteScroll from "@/containers/InfiniteScroll/InfiniteScroll";
import { getFilteredResults, paginatedResults } from "@/utils/actions";

const Beers = async ({ searchParams }) => {
  const pageNumber = 1;
  let beerData;
  let collectionCount;

  await new Promise(resolve => setTimeout(resolve,3000))

  // check if search params present
  if (Object.keys(searchParams).length) {
    const { totalCount, resultsQuery } = await getFilteredResults(
      pageNumber,
      searchParams
    );
    beerData = resultsQuery;
    collectionCount = totalCount;
  } else {
    const { data, totalCount } = await paginatedResults(
      pageNumber,
      searchParams
    );
    beerData = data;
    collectionCount = totalCount;
  }

  return (
    <main className={styles.mainContainer} key={JSON.stringify(searchParams)}>
      <Suspense fallback={<LoadingSpinner />}>
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
