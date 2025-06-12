import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./Item.module.css";
const baseURL = "https://car-rental-api.goit.global";

const Item = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  console.log(`ID: ${id}`);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`${baseURL}/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCar();
  }, [id]);

  if (!car) return <p>Loading...</p>;
  const minAgeString =
    car.rentalConditions?.find((item) => item.includes("Minimum age")) || "";
  const minAge = minAgeString.match(/Minimum age: (\d+)/)?.[1] ?? "N/A";
  return (
    <div className={s.divItem}>
      <img
        className={s.imgItem}
        src={car.img}
        alt={`${car.brand} ${car.model}`}
      />

      <form className={s.formItem}>
        <h2 className={s.h2Item}>Book your car now</h2>
        <p className={s.pItem}>
          Stay connected! We are always ready to help you.
        </p>

        <input className={s.inputItem} type="text" placeholder="Name*" />
        <input className={s.inputItem} type="email" placeholder="Email*" />
        <input className={s.inputItem} type="date" placeholder="Booking date" />
        <textarea className={s.textareaItem} placeholder="Comment" />
        <div>
          <h2 className={s.h2Item}>
            {car.brand} {car.model}
          </h2>
          <p className={s.pItem}>Price: {car.rentalPrice}</p>
          <p className={s.pItem}>Location: {car.address}</p>
          <h2 className={s.h2Item}>Details</h2>
          <p className={s.pItem}>{car.description}</p>
        </div>

        <div>
          <div>
            <h3>Rental Conditions</h3>
            <ul>
              <li>Minimum age: {minAge}</li>
              <li>Security deposit required</li>
              <li>Valid drivers license</li>
            </ul>
          </div>
          <div>
            <h3>Car Specifications:</h3>
            <ul>
              <li>Year: {car.year}</li>
              <li>Type: {car.type}</li>
              <li>Fuel Consumption: {car.fuelConsumption}</li>
              <li>Engine Size: {car.engineSize}</li>
            </ul>
          </div>
          <div>
            <h3>Accessories and functionalities:</h3>
            <ul>
              {car.accessories?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Item;
