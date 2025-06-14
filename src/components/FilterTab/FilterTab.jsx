import axios from "../../utils/axios.js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { setFilters } from "../../redux/cars/slice";
import { fetchCars } from "../../redux/cars/operation";
const baseURL = "https://car-rental-api.goit.global";
import s from "./FilterTab.module.css";
import "./castomSelect.css";
import CustomDropdownIndicator from "./CustomDropdownIndicator";

const FilterTab = () => {
  const dispatch = useDispatch();
  const price = ["30", "40", "50", "60", "70", "80"];
  const [brands, setBrands] = useState([]);
  const [localFilters, setLocalFilters] = React.useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });

  const customComponents = {
    DropdownIndicator: CustomDropdownIndicator,
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${baseURL}/brands`);
        setBrands(response.data);
      } catch (error) {
        console.log("Error fetching brands:", error.message);
      }
    };

    fetchBrands();
  }, []);
  const onBrandChange = (selectedOption) => {
    setLocalFilters((prev) => ({ ...prev, brand: selectedOption?.value }));
  };
  const onPriceChange = (selectedOption) => {
    setLocalFilters((prev) => ({
      ...prev,
      rentalPrice: selectedOption?.value,
    }));
  };
  const onMinMileageChange = (e) => {
    setLocalFilters((prev) => ({ ...prev, minMileage: e.target.value }));
  };
  const onMaxMileageChange = (e) => {
    setLocalFilters((prev) => ({ ...prev, maxMileage: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters(localFilters));
    dispatch(fetchCars(localFilters));
  };
  return (
    <section className={s.filter} id="filter">
      <form className={s.formFilter} onSubmit={handleSubmit}>
        <label className={s.label}>
          Car brand
          <Select
            options={brands.map((brand) => ({
              value: brand,
              label: brand,
            }))}
            components={customComponents}
            className="customSelect"
            classNamePrefix="custom-select"
            placeholder="Choose a brand"
            onChange={onBrandChange}
          />
        </label>
        <label className={s.label}>
          Price/ 1 hour
          <Select
            options={price.map((price) => ({
              value: price,
              label: price,
            }))}
            components={customComponents}
            className="customSelect"
            classNamePrefix="custom-select"
            placeholder="Choose a price"
            onChange={onPriceChange}
          />
        </label>
        <fieldset className={s.fieldsetFilter}>
          <legend className={s.legend}>Car mileage / km</legend>
          <div className={s.inputDivFrom}>
            <p className={s.inputText}>From </p>
            <input
              className={s.inputFilter}
              placeholder=""
              onChange={onMinMileageChange}
            />
          </div>
          <div className={s.inputDivTo}>
            <p className={s.inputText}>To </p>
            <input
              className={s.inputFilter}
              placeholder=""
              onChange={onMaxMileageChange}
            />
          </div>
          <button className={s.buttonFilter} type="submit">
            Search
          </button>
        </fieldset>
      </form>
    </section>
  );
};

export default FilterTab;
