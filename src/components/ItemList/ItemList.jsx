import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/cars/operation";
import CarPreview from "../CarPreview/CarPreview";
import { setFilters } from "../../redux/cars/slice";
import s from "./ItemList.module.css";
import Loader from "../Loader/Loader";

const DEFAULT_FILTERS = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
  limit: 12,
  page: 1,
};

const ItemList = () => {
  const dispatch = useDispatch();
  const { list, loading, error, filters, selected } = useSelector(
    (state) => state.cars
  );

  useEffect(() => {
    dispatch(fetchCars(filters));
  }, [filters, dispatch]);

  const handleLoadMore = () => {
    dispatch(setFilters({ ...filters, page: Number(filters.page) + 1 }));
  };

  const resetFilters = () => {
    dispatch(setFilters(DEFAULT_FILTERS));
  };

  const isLastPage = filters.page >= filters.totalPages;

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
            <button className={s.buttonList} onClick={handleLoadMore}>
              Load more
            </button>
          )}
        </>
      ) : (
        <div className={s.NotFound}>
          <p className={s.pList}>No cars found matching your filters 😢</p>
          <button className={s.buttonList} onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default ItemList;
