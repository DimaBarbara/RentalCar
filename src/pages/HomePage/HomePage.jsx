import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/catalog");
  };
  return (
    <div>
      <h1>Find your perfect rental car</h1>
      <h2>Reliable and budget-friendly rentals for any journey</h2>
      <button onClick={handleClick}>View Catalog</button>
    </div>
  );
};

export default HomePage;
