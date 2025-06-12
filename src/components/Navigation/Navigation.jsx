import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
const Navigation = () => {
  return (
    <header className={s.header}>
      <svg width="104" height="16">
        <use xlink="#car"></use>
      </svg>
      <div className={s.divNav}>
        <NavLink className={s.nav} to="/">
          Home
        </NavLink>
        <NavLink className={s.nav} to="/catalog">
          Catalog
        </NavLink>
      </div>
    </header>
  );
};

export default Navigation;
