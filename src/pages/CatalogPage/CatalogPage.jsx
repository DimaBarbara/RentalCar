import React from "react";
import FilterTab from "../../components/FilterTab/FilterTab";
import ItemList from "../../components/ItemList/ItemList";

const CatalogPage = () => {
  return (
    <div>
      <FilterTab />
      <ItemList />
    </div>
  );
};

export default CatalogPage;
