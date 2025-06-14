import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
const Navigation = () => {
  return (
    <header className={s.header}>
      <img src="/icons/logo.svg" alt="logo" />

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
