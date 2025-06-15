import React, { useEffect } from "react";
import FilterTab from "../../components/FilterTab/FilterTab";
import ItemList from "../../components/ItemList/ItemList";
import s from "./CatalogPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/cars/slice";
import { DEFAULT_FILTERS } from "../../utils/constants";
const CatalogPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state?.reset) {
      dispatch(setFilters(DEFAULT_FILTERS));
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate, dispatch]);
  return (
    <div className={s.catalog}>
      <FilterTab />
      <ItemList />
    </div>
  );
};

export default CatalogPage;
