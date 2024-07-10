"use client";

import React, { useEffect, useState } from "react";
import styles from "./InfiniteScroll.module.scss";
import Card from "@/components/Card/Card";
import { getFilteredResults, paginatedResults } from "@/utils/actions";
import { useInView } from "react-intersection-observer";
import { SyncLoader } from "react-spinners";

const InfiniteScroll = ({ searchParams, beerData, collectionCount }) => {
  const [data, setData] = useState(beerData);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({ threshold: 1 });

  // update page number when loading spinner in view
  useEffect(() => {
    if (inView) {
      setLoading(true);
      setPageNumber((prevNum) => prevNum + 1);
    }
  }, [inView]);

  // fetch more data when page number updated
  useEffect(() => {
    if (pageNumber > 1) {
      const getMoreResults = async () => {
        let moreData;
        if(searchParams) {
          const { resultsQuery } = await getFilteredResults(pageNumber, searchParams);
          moreData = resultsQuery;
        } else {
          const { data } = await paginatedResults(pageNumber, searchParams);
          moreData = data;
        }
        setData((prevData) => [...prevData, ...moreData]);
      };
      getMoreResults().then(() => setLoading(false));
    }
  }, [pageNumber, searchParams]);

  return (
    <>
      {data.map((beer, i) =>
        data.length - 1 ? (
          <Card key={i} beer={beer} ref={ref} />
        ) : (
          <Card key={i} beer={beer} />
        )
      )}
      {loading && (data.length !== collectionCount) && (
        <div className={styles.loader}>
          <SyncLoader color={"var(--textSecondaryColor)"} data-testid="next-page" />
        </div>
      )}
      {!data.length && (
        <div className={styles.noResults}>
          <p className={styles.notFound}>Sorry, no beers were found</p>
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
