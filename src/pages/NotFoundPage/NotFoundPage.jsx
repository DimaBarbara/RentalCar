import React from "react";
import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404 — Page Not Found</h1>
      <p className={s.text}>Oops, nothing here. Looks like you’re lost!</p>
      <Link to="/" className={s.link}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
