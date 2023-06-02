import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import SearchIcon from "../UI/SearchIcon";
import { paginationActions } from "../../store/pagination";
import { useDispatch } from "react-redux";
import optionsDropdown from "../../constants/searchBarDropdownOptions";
import DropdownOption from "../../models/searchBarDropdownOption";
import { useRouter } from "next/navigation";

function SearchBar() {
  const [inputText, setInputText] = useState("");
  const [searchOption, setSearchOption] = useState("q");

  const router = useRouter();
  const dispatch = useDispatch();

  const inputTextChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputText(event.target.value);
  };

  const searchButtonClickHandler = () => {
    dispatch(paginationActions.setLimit(10));
    dispatch(paginationActions.goToAPage(1));
    router.push(`/search/${searchOption}/${inputText}`);
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
