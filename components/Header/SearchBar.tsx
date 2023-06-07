import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import SearchIcon from "../UI/SearchIcon";

import optionsDropdown from "../../constants/searchBarDropdownOptions";
import DropdownOption from "../../models/searchBarDropdownOption";
import { useRouter } from "next/navigation";
import { montserrat } from "@/styles/fonts";

function SearchBar() {
  const [inputText, setInputText] = useState("");
  const [searchOption, setSearchOption] = useState("q");

  const router = useRouter();

  const inputTextChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputText(event.target.value);
  };

  const searchButtonClickHandler = () => {
    router.push(`/search/${searchOption}/${inputText}/${1}/${10}`);
    setInputText("");
    setSearchOption("q");
  };

  const selectedOptionDropdownChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchOption(e.target.value);
  };

  return (
    <div className={styles["nav-searchbar"]}>
      <select
        className={styles["nav-searchbar-dropdown"]}
        name="dropdownSearchBar"
        id="dropdownSearchBar"
        onChange={selectedOptionDropdownChangeHandler}
        value={searchOption}
      >
        {optionsDropdown.map((opt: DropdownOption) => (
          <option key={opt.name} value={opt.id} defaultValue="Todos">
            {opt.name}
          </option>
        ))}
      </select>
      <div className={styles["nav-searchbar-dividor"]} />
      <input
        type="text"
        value={inputText}
        id="searchBarMain"
        name="searchBarMain"
        placeholder="Buscar"
        onChange={inputTextChangeHandler}
        className={montserrat.className}
      />
      <button
        onClick={searchButtonClickHandler}
        className={styles["nav-searchbar-logo"]}
      >
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchBar;
