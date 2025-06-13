import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/operation";
import CarPreview from "../CarPreview/CarPreview";
import { setFilters } from "../../redux/cars/slice";
import s from "./ItemList.module.css";
import Loader from "../Loader/Loader";

const ItemList = () => {
  const dispatch = useDispatch();
  const { list, loading, error, filters, selected } = useSelector(
    (state) => state.cars
  );

  useEffect(() => {
    dispatch(fetchCars(filters));
  }, [filters, dispatch]);
  const handlePageChange = (newPage) => {
    dispatch(setFilters({ ...filters, page: newPage }));
  };
  const isLastPage = list.length < filters.limit || list.length === 0;

  return (
    <section className={s.ItemList} id="ItemList">
      {loading ? (
        <div className={s.LoaderWrapper}>
          <Loader />
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : list && list.length > 0 ? (
        <>
          <ul className={s.ulList}>
            {list.map((car) => (
              <li key={car.id}>
                <CarPreview list={car} selected={selected} />
              </li>
            ))}
          </ul>
          {!isLastPage && (
            <button
              className={s.buttonList}
              onClick={() => handlePageChange(+filters.page + 1)}
            >
              Load more
            </button>
          )}
        </>
      ) : (
        <h1>Нема машинок</h1>
      )}
    </section>
  );
};

export default ItemList;
