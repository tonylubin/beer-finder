"use client";

import React, { useEffect, useState, useTransition } from "react";
import styles from "./SearchBox.module.scss";
import { usePathname, useSearchParams } from "next/navigation";
import SearchIcon from "../Icons/SearchIcon";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next-nprogress-bar";


const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isPending, startTransition] = useTransition();

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
      setSearchTerm("");
      router.push(`${pathName}?${params.toString()}`);
    }
  };

  // keep search input ui in sync with url
  useEffect(() => {
    let name = searchParams.has("name") ? searchParams.get("name") : "";
    setSearchTerm(name);
  }, [searchParams]);

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
      <button
        aria-label="search catalogue"
        className={styles.btn}
        type="button"
        onClick={() => {
          startTransition(() => handleSearch());
        }}
      >
        {isPending ? <ClipLoader data-testid="loader" size={20} color="#fff" /> : <SearchIcon classname={styles.icon} />}
      </button>
    </div>
  );
};

export default SearchBox;
