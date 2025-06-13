import React from "react";
import Item from "../../components/Item/Item";
import s from "./ItemPage.module.css";
const ItemPage = () => {
  return (
    <div className={s.item}>
      <Item />
    </div>
  );
};

export default ItemPage;
