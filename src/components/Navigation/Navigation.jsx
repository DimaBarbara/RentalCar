import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
const Navigation = () => {
  return (
    <header className={s.header}>
      <img src="/icons/logo.svg" alt="logo" />

      <div className={s.divNav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.nav} ${s.active}` : s.nav
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${s.nav} ${s.active}` : s.nav
          }
          to="/catalog"
          state={{ reset: true }}
        >
          Catalog
        </NavLink>
      </div>
    </header>
  );
};

export default Navigation;
