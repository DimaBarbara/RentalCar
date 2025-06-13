import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./Item.module.css";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
const baseURL = "https://car-rental-api.goit.global";

const Item = () => {
  const { loading, error } = useSelector((state) => state.cars);
  const { id } = useParams();
  const [car, setCar] = useState(null);

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

  const minAgeString =
    car?.rentalConditions?.find((item) => item.includes("Minimum age")) || "";

  const minAge = minAgeString.match(/Minimum age: (\d+)/)?.[1] ?? "N/A";

  return (
    <div className={s.divItem}>
      {loading ? (
        <div className={s.loaderWrapper}>
          <Loader />
        </div>
      ) : error ? (
        <p className={s.errorText}>{error}</p>
      ) : !car ? null : (
        <>
          <div className={s.divLeft}>
            <img
              className={s.imgItem}
              src={car.img}
              alt={`${car.brand} ${car.model}`}
            />

            <form className={s.formItem}>
              <div className={s.divText}>
                <h3 className={s.h3Form}>Book your car now</h3>
                <p className={s.pItem}>
                  Stay connected! We are always ready to help you.
                </p>
              </div>
              <div className={s.divInputs}>
                <input
                  className={s.inputItem}
                  type="text"
                  placeholder="Name*"
                />
                <input
                  className={s.inputItem}
                  type="email"
                  placeholder="Email*"
                />
                <input
                  className={s.inputItem}
                  type="date"
                  placeholder="Booking date"
                />
                <textarea className={s.textareaItem} placeholder="Comment" />
              </div>
              <button className={s.buttonItem}>Send</button>
            </form>
          </div>

          <div className={s.divRight}>
            <div className={s.divCar}>
              <h2 className={s.h2Item}>
                {car.brand} {car.model}, {car.year}
              </h2>
              <div className={s.divP}>
                <p className={s.pAdres}>
                  <img
                    src="/public/icons/location.svg"
                    alt="arrow up"
                    width={20}
                    height={20}
                  />
                  {car.address}
                </p>
                <p className={s.pMileage}>Mileage: {car.mileage} km</p>
              </div>
              <p className={s.pPrice}>${car.rentalPrice}</p>
              <p className={s.pDescr}>{car.description}</p>
            </div>

            <div className={s.divCharacteristic}>
              <div className={s.divRental}>
                <h3 className={s.h3Item}>Rental Conditions</h3>
                <ul className={s.ulItem}>
                  <li className={s.liItem}>
                    {" "}
                    <img
                      src="/public/icons/check-circle.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    Minimum age: {minAge}
                  </li>
                  <li className={s.liItem}>
                    {" "}
                    <img
                      src="/public/icons/check-circle.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    Security deposit required
                  </li>
                  <li className={s.liItem}>
                    {" "}
                    <img
                      src="/public/icons/check-circle.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    Valid drivers license
                  </li>
                </ul>
              </div>

              <div className={s.divSpecification}>
                <h2 className={s.h3Item}>Car Specifications:</h2>
                <ul className={s.ulItem}>
                  <li className={s.liItem}>
                    <img
                      src="/public/icons/calendar.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    Year: {car.year}
                  </li>
                  <li className={s.liItem}>
                    {" "}
                    <img
                      src="/public/icons/car.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    Type: {car.type}
                  </li>
                  <li className={s.liItem}>
                    {" "}
                    <img
                      src="/public/icons/fuel-pump.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    <img
                      src="/public/icons/gear.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    Fuel Consumption: {car.fuelConsumption}
                  </li>
                  <li className={s.liItem}>Engine Size: {car.engineSize}</li>
                </ul>
              </div>

              <div className={s.divAccessories}>
                <h3 className={s.h3Item}>Accessories and functionalities:</h3>
                <ul className={s.ulItem}>
                  {car.accessories?.map((item, i) => (
                    <li className={s.liItem} key={i}>
                      <img
                        src="/public/icons/check-circle.svg"
                        alt="arrow up"
                        width={20}
                        height={20}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
