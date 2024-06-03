import React from "react";
import styles from "./CardFront.module.scss";
import Image from "next/image";

const CardFront = (props) => {
  const { image, name, abv, tagline } = props;

  return (
    <div className={styles.cardFront}>
      <div className={styles.imageContainer}>
        <div className={styles.imageContainer__holder}>
          <Image src={`/images/${image}`} alt={name} fill={true} sizes="500px" />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <h2>{name.toUpperCase()}</h2>
        <p className={styles.infoContainer__abv}>ABV: {abv}%</p>
        <h4>{`"${tagline}"`}</h4>
      </div>
    </div>
  );
};

export default CardFront;
