import React from "react";
import { useNavigate } from "react-router-dom";
import { addSelected, removeSelected } from "../../redux/cars/slice";
import { useDispatch } from "react-redux";
import s from "./CarPreview.module.css";

const CarPreview = ({ list, selected }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSelected = selected.includes(list.id);
  const handleClick = (id) => {
    navigate(`/catalog/${id}`);
  };
  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      dispatch(removeSelected(id));
    } else {
      dispatch(addSelected(id));
    }
  };
  return (
    <div className={s.divPreview}>
      <img
        className={s.imgPreview}
        src={list.img}
        alt={`${list.brand} ${list.model}`}
      />
      <img
        className={s.heartIcon}
        src={isSelected ? "/icons/heart2.svg" : "/icons/heart1.svg"}
        alt={isSelected ? "Selected" : "Not selected"}
        onClick={() => toggleSelect(list.id)}
        style={{ cursor: "pointer" }}
      />

      <div className={s.divTextPreview}>
        <h3 className={s.h3Preview}>
          {list.brand}
          <span className={s.spanPreview}> {list.model}</span>, {list.year}
          <span className={s.spanPreviewP}> ${list.rentalPrice}</span>
        </h3>
        <p className={s.pPreview}>
          {list.address} | {list.rentalCompany} | {list.type} | {list.mileage}
        </p>

        <button
          className={s.buttonPreview}
          onClick={() => handleClick(list.id)}
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default CarPreview;
