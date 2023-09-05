import React from "react";
import "./Header.scss";
import { paths } from "../../routers/paths";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <a href={paths.home}>
        <h1 className="header__title">Drocer</h1>
      </a>
      <a href={paths.home}>
        <img
          src="./images/drocer_logo.svg"
          alt="Drocer's app logo"
          className="header__logo"
          width="37"
          height="26"
        />
      </a>
    </header>
  );
};

export default Header;
