import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
    <div>
      <img src={car.img} alt={`${car.brand} ${car.model}`} />

      <form>
        <h2>Book your car now</h2>
        <p>Stay connected! We are always ready to help you.</p>

        <input type="text" placeholder="Name*" />
        <input type="email" placeholder="Email*" />
        <input type="date" placeholder="Booking date" />
        <textarea placeholder="Comment" />

        <div>
          <h2>
            {car.brand} {car.model}
          </h2>
          <p>Price: {car.rentalPrice}</p>
          <p>Location: {car.address}</p>
          <h2>Details</h2>
          <p>{car.description}</p>
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
