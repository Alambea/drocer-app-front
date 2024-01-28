import React, { useState } from "react";
import Button from "../Button/Button";
import "./SearchBar.scss";

interface SearchBarProps {
  actionOnSubmit: (updatedSearch: string) => void;
  currentQuery?: string;
}

const SearchBar = ({
  actionOnSubmit,
  currentQuery,
}: SearchBarProps): React.ReactElement => {
  const initialQuery = currentQuery ?? "";

  const [updatedSearch, setUpdatedSearch] = useState<string>(initialQuery);

  const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedSearch(() => event.target.value);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    actionOnSubmit(updatedSearch);
  };

  return (
    <form className="search-bar" onSubmit={submit}>
      <label htmlFor="query" className="search-bar__label">
        Search
      </label>
      <input
        type="search"
        id="query"
        className="search-bar__input"
        value={updatedSearch}
        onChange={updateSearch}
      />
      <Button className="icon search-bar__button" type="submit">
        <img
          src="/images/search_icon.svg"
          alt="Magnifying glass icon"
          width="20"
          height="20"
        />
      </Button>
    </form>
  );
};

export default SearchBar;
