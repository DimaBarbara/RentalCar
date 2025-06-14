export const addressFormat = (str) => str.split(", ");

export const carTypeFormat = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const mileageFormat = (num) => num.toLocaleString("uk-UA");
