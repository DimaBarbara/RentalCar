import React from "react";
import { useNavigate } from "react-router-dom";
import { addSelected, removeSelected } from "../../redux/cars/slice";
import { useDispatch } from "react-redux";

const CarPreview = ({ list, selected }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div>
      <img src={list.img} alt={`${list.brand} ${list.model}`} />
      <h3>
        {list.brand} {list.model}, {list.year}
      </h3>
      <p>
        {list.address} |{list.rentalCompany} | {list.type} | {list.mileage}
      </p>
      <button onClick={() => toggleSelect(list.id)}>
        {selected.includes(list.id)
          ? "Remove from selected"
          : "Add to selected"}
      </button>
      <button onClick={() => handleClick(list.id)}>Read more</button>
    </div>
  );
};

export default CarPreview;
