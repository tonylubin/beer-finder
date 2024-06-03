import React from "react";
import styles from "./CardBack.module.scss";


const CardBack = (props) => {
  const { description, first_brewed, food_pairing, ebc } = props;

  // checking which ranges/condition in switch statement is true
  let beerColor = { id: null, beerColor: null };

  switch (true) {
    case ebc <= 4:
      beerColor = { id: 1, beerColor: ebc };
      break;
    case ebc > 4 && ebc <= 6:
      beerColor = { id: 2, beerColor: ebc };
      break;
    case ebc > 6 && ebc <= 12:
      beerColor = { id: 3, beerColor: ebc };
      break;
    case ebc > 12 && ebc <= 19:
      beerColor = { id: 4, beerColor: ebc };
      break;
    case ebc >= 20 && ebc <= 38:
      beerColor = { id: 5, beerColor: ebc };
      break;
    case ebc >= 39 && ebc <= 46:
      beerColor = { id: 6, beerColor: ebc };
      break;
    case ebc >= 47 && ebc <= 56:
      beerColor = { id: 7, beerColor: ebc };
      break;
    case ebc >= 57 && ebc <= 137:
      beerColor = { id: 8, beerColor: ebc };
      break;
    case ebc >= 138:
      beerColor = { id: 9, beerColor: ebc };
      break;
    default:
      beerColor = { id: null, beerColor: 'N/A'}
      break;
  }

  // beer color chart/list
  let numOfColors = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const colorBars = numOfColors.map((el, i) => (
    <li
      key={i}
      className={`${styles[`chart__color${el}`]} ${
        beerColor.id === el ? styles.chart__highlight : ""
      }`}
    >
      {beerColor.id === el && beerColor.beerColor}
    </li>
  ));

 
  return (
    <div className={styles.cardBack}>
      <h3>Description</h3>
      <p className={styles.foodPairing}>{description}</p>
      <h3>Pairs well with</h3>
      <ul className={styles.foodList}>
        {food_pairing.map((meal, i) => (
          <li key={i}>{meal}</li>
        ))}
      </ul>
      <h3>First brewed in</h3>
      <p>{first_brewed.toLocaleDateString('en-GB',{month: '2-digit', year: 'numeric' })}</p>
      <h3>EBC (beer colour)</h3>
      <ul className={styles.chart}>{colorBars}</ul>
    </div>
  );
};

export default CardBack;
