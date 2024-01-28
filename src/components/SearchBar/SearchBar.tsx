import React from "react";
import Button from "../Button/Button";
import "./SearchBar.scss";

const SearchBar = (): React.ReactElement => {
  return (
    <search className="search-bar">
      <form className="search-bar__form">
        <label htmlFor="query" className="search-bar__label">
          Search
        </label>
        <input type="search" id="query" className="search-bar__input" />
        <Button className="icon search-bar__button" type="submit">
          <img
            src="/images/search_icon.svg"
            alt="Magnifying glass icon"
            width="20"
            height="20"
          />
        </Button>
      </form>
    </search>
  );
};

export default SearchBar;
