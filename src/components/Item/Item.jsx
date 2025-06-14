import React, { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import axios from "../../utils/axios.js";
import s from "./Item.module.css";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { addressFormat, mileageFormat } from "../../utils/formatData.js";
import FormSend from "../FormSend/FormSend.jsx";

const Item = () => {
  const { loading, error } = useSelector((state) => state.cars);
  const { id } = useParams();
  const [car, setCar] = useState(null);
  console.log(car);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchCar();
  }, [id]);

  let formatMileage = "";
  let formatAdress = [];
  let minAge = "N/A";

  if (car) {
    formatMileage = mileageFormat(car.mileage);
    formatAdress = addressFormat(car.address);

    const minAgeString =
      car.rentalConditions?.find((item) => item.includes("Minimum age")) || "";
    minAge = minAgeString.match(/Minimum age: (\d+)/)?.[1] ?? "N/A";
  }
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
            <FormSend />
          </div>

          <div className={s.divRight}>
            <div className={s.divCar}>
              <h2 className={s.h2Item}>
                {car.brand} {car.model}, {car.year}
              </h2>
              <div className={s.divP}>
                <img
                  src="/icons/location.svg"
                  alt="arrow up"
                  width={20}
                  height={20}
                />
                <p className={s.pAdres}>
                  {`${formatAdress[1]}, ${formatAdress[2]}`}
                </p>
                <p className={s.pMileage}>Mileage: {formatMileage} km</p>
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
                      src="/icons/check-circle.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    Minimum age: {minAge}
                  </li>
                  <li className={s.liItem}>
                    {" "}
                    <img
                      src="/icons/check-circle.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    Security deposit required
                  </li>
                  <li className={s.liItem}>
                    {" "}
                    <img
                      src="/icons/check-circle.svg"
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
                      src="/icons/calendar.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    Year: {car.year}
                  </li>
                  <li className={s.liItem}>
                    {" "}
                    <img
                      src="/icons/car.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    Type: {car.type}
                  </li>
                  <li className={s.liItem}>
                    {" "}
                    <img
                      src="/icons/fuel-pump.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    Fuel Consumption: {car.fuelConsumption}
                  </li>
                  <li className={s.liItem}>
                    <img
                      src="/icons/gear.svg"
                      alt="arrow up"
                      width={20}
                      height={20}
                    />
                    Engine Size: {car.engineSize}
                  </li>
                </ul>
              </div>

              <div className={s.divAccessories}>
                <h3 className={s.h3Item}>Accessories and functionalities:</h3>
                <ul className={s.ulItem}>
                  {car.accessories?.map((item, i) => (
                    <li className={s.liItem} key={i}>
                      <img
                        src="/icons/check-circle.svg"
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
