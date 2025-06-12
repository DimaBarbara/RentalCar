import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/operation";
import CarPreview from "../CarPreview/CarPreview";
import { setFilters } from "../../redux/cars/slice";
import s from "./ItemList.module.css";

const ItemList = () => {
  const dispatch = useDispatch();
  const { list, loading, error, filters, selected } = useSelector(
    (state) => state.cars
  );
  console.log(list);

  useEffect(() => {
    dispatch(fetchCars(filters));
    console.log("Current page:", filters.page);
  }, [filters, dispatch]);
  const handlePageChange = (newPage) => {
    console.log("CLICK! Trying to change page to:", newPage);
    dispatch(setFilters({ ...filters, page: newPage }));
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <section className={s.ItemList} id="ItemList">
      {list && list.length > 0 ? (
        <>
          <ul className={s.ulList}>
            {list?.map((car) => (
              <li key={car.id}>
                <CarPreview list={car} selected={selected} />
              </li>
            ))}
          </ul>
          <button
            className={s.buttonList}
            onClick={() => handlePageChange(+filters.page + 1)}
          >
            Load more
          </button>
        </>
      ) : (
        <h1>Нема машинок</h1>
      )}
    </section>
  );
};

export default ItemList;
