import React from "react";
import "./Navigation.scss";
import Button from "../Button/Button";
import { paths } from "../../routers/paths";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Navigation = (): React.ReactElement => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="nav-bar">
      <ul className="nav-bar__list">
        <li className="nav-bar__element">
          <NavLink to={paths.addRecord} className="nav-bar__link">
            <img
              className="nav-bar__icon"
              src="../images/add_icon.svg"
              alt="Add icon"
              width="25"
              height="25"
            />
            <span className="nav-bar__text">Add</span>
          </NavLink>
        </li>
        <li className="nav-bar__element">
          <NavLink to={paths.records} className="nav-bar__link">
            <img
              className="nav-bar__icon"
              src="../images/record_icon.svg"
              alt="Vinyl icon"
              width="25"
              height="25"
            />
            <span className="nav-bar__text">Records</span>
          </NavLink>
        </li>
        <li className="nav-bar__element">
          <Button className="nav-bar__button" actionOnClick={logout}>
            <>
              <img
                className="nav-bar__icon"
                src="../images/logout_icon.svg"
                alt="Logout icon"
                width="25"
                height="25"
              />
              <span className="nav-bar__text">Logout</span>
            </>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
