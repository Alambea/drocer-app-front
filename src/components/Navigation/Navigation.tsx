import React from "react";

const Navigation = (): React.ReactElement => {
  return (
    <nav className="nav-bar">
      <ul className="nav-bar__list">
        <li className="nav-bar__element">
          <a href="/add-new-record" className="nav-bar__link">
            <img
              className="nav-bar__icon"
              src="../images/add_icon.svg"
              alt="Add icon"
              width="25"
              height="25"
            />
            <span className="nav-bar__text">Add</span>
          </a>
        </li>
        <li className="nav-bar__element">
          <a href="/records" className="nav-bar__link">
            <img
              className="nav-bar__icon"
              src="../images/record_icon.svg"
              alt="Vinyl icon"
              width="25"
              height="25"
            />
            <span className="nav-bar__text">Records</span>
          </a>
        </li>
        <li className="nav-bar__element">
          <button className="nav-bar__button" onClick={() => {}}>
            <img
              className="nav-bar__icon"
              src="../images/logout_icon.svg"
              alt="Logout icon"
              width="25"
              height="25"
            />
            <span className="nav-bar__text">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
