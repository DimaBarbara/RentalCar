import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export default axiosInstance;
