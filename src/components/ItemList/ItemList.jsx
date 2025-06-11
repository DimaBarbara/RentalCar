import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/operation";

const ItemList = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  if (!data.length) {
    return <p>Машины не найдены</p>;
  }

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>{item.model}</li>
      ))}
    </ul>
  );
};

export default ItemList;
