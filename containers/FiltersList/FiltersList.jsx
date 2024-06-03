"use client";

import React, { useState } from "react";
import styles from "./FiltersList.module.scss";
import BeerIcon from "@/components/Icons/BeerIcon";
import ClassicIcon from "@/components/Icons/ClassicIcon";
import FilterItem from "@/components/FilterItem/FilterItem";
import MealIcon from "@/components/Icons/MealIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FiltersList = () => {

  const [abvChecked, setAbvChecked] = useState(false);
  const [classicChecked, setClassicChecked] = useState(false);

  //  Router
  const router = useRouter();
  let pathName = usePathname();
  let searchParams = useSearchParams();

  // handle checkbox status (ON/OFF)
  // const getCheckboxId = (e) => {
  //   let params = new URLSearchParams(searchParams);
  //   let id = e.target.id;
  //   let boxChecked = e.target.checked;

  //   if (id === "abv_lt" && boxChecked) {
  //     setAbvChecked(true);
  //     params.set("abv_lt", 4);
  //     router.push(`${pathName}?${params.toString()}`);
  //   } else if (id === "brewed_before" && boxChecked) {
  //     setClassicChecked(true);
  //     params.set("brewed_before", "2010-10-01");
  //     router.push(`${pathName}?${params.toString()}`);
  //   } else {
  //     params.delete(id);
  //     router.push(`${pathName}?${params.toString()}`);
  //   }
  // };

  const handleAbvCheckbox = (e) => {
    let params = new URLSearchParams(searchParams);
    if(e.target.checked) {
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
    if(e.target.checked) {
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
      params.set("food_pairing", foods);
      router.replace(`${pathName}?${params.toString()}`);
    } else {
      params.delete("food_pairing");
      router.replace(`${pathName}?${params.toString()}`);
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
