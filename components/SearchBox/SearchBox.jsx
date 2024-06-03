"use client";

import React, { useState } from "react";
import styles from "./SearchBox.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchIcon from "../Icons/SearchIcon";

const SearchBox = () => {

  const [searchTerm, setSearchTerm] = useState('');

  //  Router
  const router = useRouter();
  let pathName = usePathname();
  let searchParams = useSearchParams();

  const handleSearch = () => {
    let params = new URLSearchParams(searchParams);
    if (searchTerm.length) {
      params.set("name", searchTerm);
      router.replace(`${pathName}?${params.toString()}`);
    } else {
      params.delete("name");
      router.replace(`${pathName}?${params.toString()}`);
    }
  };

  return (
    <div className={styles.wrapper}>
        <input
          className={styles.inputBox}
          type="text"
          placeholder="Search..."
          onInput={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          defaultValue={searchParams.get("name")?.toString()}
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        ></input>
        <button className={styles.btn} type="button" onClick={handleSearch}>
          <SearchIcon classname={styles.icon} />
        </button>
    </div>
  );
};

export default SearchBox;
