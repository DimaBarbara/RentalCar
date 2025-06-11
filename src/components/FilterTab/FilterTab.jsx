import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { setFilters } from "../../redux/cars/slice";
import { fetchCars } from "../../redux/cars/operation";
const baseURL = "https://car-rental-api.goit.global";
const FilterTab = () => {
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [localFilters, setLocalFilters] = React.useState({
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
  });
  console.log(localFilters);

  const price = ["30", "40", "50", "60", "70", "80"];
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${baseURL}/brands`);
        console.log(response.data);
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
    <section id="filter">
      <form onSubmit={handleSubmit}>
        <Select
          options={brands.map((brand) => ({
            value: brand,
            label: brand,
          }))}
          id=""
          name=""
          className=""
          classNamePrefix="custom-select"
          placeholder="Choose a brand"
          onChange={onBrandChange}
        />
        <Select
          options={price.map((price) => ({
            value: price,
            label: price,
          }))}
          id=""
          name=""
          className=""
          classNamePrefix="custom-select"
          placeholder="Choose a price"
          onChange={onPriceChange}
        />
        <fieldset>
          <input placeholder="From" onChange={onMinMileageChange} />
          <input placeholder="To" onChange={onMaxMileageChange} />
        </fieldset>
        <button type="submit">Search</button>
      </form>
    </section>
  );
};

export default FilterTab;
