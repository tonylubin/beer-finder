import React from "react";
import Card from "../../components/Card/Card";
import styles from "./Main.module.scss";
import { getAllBeers, addFilters } from "@/utils/actions";


const Main = async ({ searchParams }) => {
  const fetchData = async (searchFilters) => {
    let queryCheck = Object.entries(searchFilters).length;
    if (queryCheck) {
      return await addFilters(searchFilters);
    } else {
      return await getAllBeers();
    }
  };
  
  const beerData = await fetchData(searchParams);

  return (
    <>
      {beerData.map((beer, i) => (
        <Card key={i} beer={beer} />
      ))}
      {beerData.length === 0 && (
        <div className={styles.noResults}>
          <p className={styles.notFound}>Sorry, no beers were found</p>
        </div>
      )}
    </>
  );
};

export default Main;
