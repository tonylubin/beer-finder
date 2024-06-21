"use client";

import React, { useEffect, useState } from "react";
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
      router.push(`${pathName}?${params.toString()}`);
    } else {
      params.delete("name");
      setSearchTerm('');
      router.push(`${pathName}?${params.toString()}`);
    }
  };

  // keep search input ui in sync with url
  useEffect(() => {
    let name = searchParams.has('name') ? searchParams.get('name') : '';
    setSearchTerm(name)
  }, [searchParams])

  return (
    <div className={styles.wrapper}>
        <input
          className={styles.inputBox}
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        ></input>
        <button className={styles.btn} type="button" onClick={handleSearch}>
          <SearchIcon classname={styles.icon} />
        </button>
    </div>
  );
};

export default SearchBox;
