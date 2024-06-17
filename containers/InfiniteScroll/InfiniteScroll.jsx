"use client";

import React, { useEffect, useState } from "react";
import styles from './InfiniteScroll.module.scss';
import Card from "@/components/Card/Card";
import { paginatedResults } from "@/utils/actions";
import { useInView } from "react-intersection-observer";
import { SyncLoader } from "react-spinners";

const InfiniteScroll = ({ searchParams, initialData, pages }) => {
  const [data, setData] = useState(initialData);
  const [pageNumber, setPageNumber] = useState(1);

  const { ref, inView } = useInView({ threshold: 1 });

  // update page number when loading spinner in view
  useEffect(() => {
    if(inView){
      setPageNumber(prevNum => prevNum + 1);
    }
  },[inView]);
  
  // fetch more data when page number updated
  useEffect(() => {
    if(pageNumber > 1) {
      const getMoreResults = async () => {
        let moreData = await paginatedResults(pageNumber);
        setData(prevData => [...prevData, ...moreData]);
      };
      getMoreResults();
    }
  },[pageNumber]);

  return (
    <>
      {data.map((beer, i) => (
        <Card key={i} beer={beer} />
      ))}
      {pageNumber < pages && 
        <div className={styles.loader} ref={ref}>
          <SyncLoader color={'var(--textSecondaryColor)'} />
        </div>      
      }
      {!data.length && (
        <div className={styles.noResults}>
          <p className={styles.notFound}>Sorry, no beers were found</p>
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
