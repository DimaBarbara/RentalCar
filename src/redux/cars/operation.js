import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js";
export const fetchCars = createAsyncThunk(
  "cars/fetch",
  async (filters, thunkAPI) => {
    try {
      const params = {
        ...filters,
        limit: filters.limit || 12,
        page: filters.page || 1,
      };

      const response = await axios.get("/cars", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
