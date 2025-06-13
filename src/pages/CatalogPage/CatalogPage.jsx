import React from "react";
import FilterTab from "../../components/FilterTab/FilterTab";
import ItemList from "../../components/ItemList/ItemList";
import s from "./CatalogPage.module.css";
const CatalogPage = () => {
  return (
    <div className={s.catalog}>
      <FilterTab />
      <ItemList />
    </div>
  );
};

export default CatalogPage;
