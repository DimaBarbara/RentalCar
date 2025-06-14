import React, { useState } from "react";
import s from "./FormSend.module.css";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";

registerLocale("enGB", enGB);

const FormSend = () => {
  const [startDate, setStartDate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!startDate) {
      newErrors.date = "Please select a date";
    } else if (startDate < new Date().setHours(0, 0, 0, 0)) {
      newErrors.date = "Date cannot be in the past";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    alert("Car booked successfully");

    setName("");
    setEmail("");
    setStartDate(null);
    setComment("");
    setErrors({});
  };

  return (
    <form className={s.formItem} onSubmit={handleSubmit} noValidate>
      <div className={s.divText}>
        <h3 className={s.h3Form}>Book your car now</h3>
        <p className={s.pItem}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <div className={s.divInputs}>
        <div className={s.inputWrapper}>
          <input
            className={s.inputItem}
            type="text"
            name="name"
            placeholder="Name*"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className={s.errorMessage}>{errors.name}</p>}
        </div>
        <div className={s.inputWrapper}>
          <input
            className={s.inputItem}
            type="email"
            placeholder="Email*"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className={s.errorMessage}>{errors.email}</p>}
        </div>
        <div className={s.inputWrapper}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd.MM.yyyy"
            placeholderText="Booking date"
            className="custom-datepicker"
            calendarClassName="custom-calendar"
            minDate={new Date()}
            showPopperArrow={false}
            locale="enGB"
            formatWeekDay={(nameOfDay) => nameOfDay.toUpperCase().slice(0, 3)}
          />
          {errors.date && <p className={s.errorMessage}>{errors.date}</p>}
        </div>

        <textarea
          className={s.textareaItem}
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button className={s.buttonItem} type="submit">
        Send
      </button>
    </form>
  );
};

export default FormSend;
