import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./HomePage.module.css";
const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/catalog");
  };
  return (
    <section id="hero" className={s.hero}>
      <h1 className={s.h1Hero}>Find your perfect rental car</h1>
      <h2 className={s.h2Hero}>
        Reliable and budget-friendly rentals for any journey
      </h2>
      <button className={s.buttonHero} onClick={handleClick}>
        View Catalog
      </button>
    </section>
  );
};

export default HomePage;
