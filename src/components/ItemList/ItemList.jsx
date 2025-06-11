import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/operation";
import CarPreview from "../CarPreview/CarPreview";

const ItemList = () => {
  const dispatch = useDispatch();
  const { list, loading, error, filters, selected } = useSelector(
    (state) => state.cars
  );
  console.log(list);

  useEffect(() => {
    dispatch(fetchCars(filters));
  }, [filters, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      {list && list.length > 0 ? (
        <ul>
          {list?.map((car) => (
            <li key={car.id}>
              <CarPreview list={car} selected={selected} />
            </li>
          ))}
        </ul>
      ) : (
        <h1>Нема машинок</h1>
      )}
    </>
  );
};

export default ItemList;
