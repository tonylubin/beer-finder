"use client";

import React, { useEffect, useState } from "react";
import styles from "./FiltersList.module.scss";
import BeerIcon from "@/components/Icons/BeerIcon";
import ClassicIcon from "@/components/Icons/ClassicIcon";
import FilterItem from "@/components/FilterItem/FilterItem";
import MealIcon from "@/components/Icons/MealIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FiltersList = () => {
  const [abvChecked, setAbvChecked] = useState(false);
  const [classicChecked, setClassicChecked] = useState(false);
  const [foodPairingSelected, setFoodPairingSelected] = useState("title");

  //  Router
  const router = useRouter();
  let pathName = usePathname();
  let searchParams = useSearchParams();

  const handleAbvCheckbox = (e) => {
    let params = new URLSearchParams(searchParams);
    if (e.target.checked) {
      setAbvChecked(true);
      params.set("abv_lt", 4);
      router.push(`${pathName}?${params.toString()}`);
    } else {
      setAbvChecked(false);
      params.delete(e.target.id);
      router.push(`${pathName}?${params.toString()}`);
    }
  };

  const handleClassicCheckbox = (e) => {
    let params = new URLSearchParams(searchParams);
    if (e.target.checked) {
      setClassicChecked(true);
      params.set("brewed_before", "2010-10-01");
      router.push(`${pathName}?${params.toString()}`);
    } else {
      setClassicChecked(false);
      params.delete(e.target.id);
      router.push(`${pathName}?${params.toString()}`);
    }
  };

  // handle dropdown menu selection
  const handleDropdownStatus = (e) => {
    let params = new URLSearchParams(searchParams);
    let foods = e.target.value;
    if (foods) {
      setFoodPairingSelected(foods);
      params.set("food_pairing", foods);
      router.push(`${pathName}?${params.toString()}`);
    } else {
      setFoodPairingSelected('');
      params.delete("food_pairing");
      router.push(`${pathName}?${params.toString()}`);
    }
  };

  // input element properties
  const abvFilter = {
    name: "abv",
    description: "Low Abv (< 4%)",
    checkboxFunc: handleAbvCheckbox,
    type: "checkbox",
    id: "abv_lt",
    icon: (
      <BeerIcon classname={`${styles.filterHolder__icon} ${styles.beer}`} />
    ),
  };

  const classicFilter = {
    name: "classic",
    description: "Classic Range",
    checkboxFunc: handleClassicCheckbox,
    type: "checkbox",
    id: "brewed_before",
    icon: <ClassicIcon classname={styles.filterHolder__icon} />,
  };

  // keep inputs UI in sync with url i.e back or refresh
  useEffect(() => {
    searchParams.has("abv_lt") ? setAbvChecked(true) : setAbvChecked(false);
    searchParams.has("brewed_before")
      ? setClassicChecked(true)
      : setClassicChecked(false);
    searchParams.has("food_pairing")
      ? setFoodPairingSelected(searchParams.get("food_pairing"))
      : setFoodPairingSelected("");
  }, [searchParams]);

  return (
    <>
      <div className={styles.filterHolder}>
        {abvFilter.icon}
        <FilterItem
          name={abvFilter.name}
          description={abvFilter.description}
          checkboxFunc={abvFilter.checkboxFunc}
          type={abvFilter.type}
          id={abvFilter.id}
          isChecked={abvChecked}
        />
      </div>
      <div className={styles.filterHolder}>
        {classicFilter.icon}
        <FilterItem
          name={classicFilter.name}
          description={classicFilter.description}
          checkboxFunc={classicFilter.checkboxFunc}
          type={classicFilter.type}
          id={classicFilter.id}
          isChecked={classicChecked}
        />
      </div>
      <div className={styles.dropdown}>
        <div className={styles.filterHolder}>
          <MealIcon classname={styles.filterHolder__icon} />
          <label htmlFor="food_pairing">Drinks well with:</label>
        </div>
        <select
          name="food_pairing"
          id="food_pairing"
          value={foodPairingSelected}
          onChange={handleDropdownStatus}
        >
          <option value={""}>Select food pairing--</option>
          <option value={"meat"}>Meat</option>
          <option value={"seafood"}>Seafood</option>
          <option value={"spicy"}>Spicy</option>
          <option value={"sweet"}>Sweet/Dessert</option>
        </select>
      </div>
    </>
  );
};

export default FiltersList;
