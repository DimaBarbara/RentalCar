import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operation";

const initialState = {
  list: [],
  selected: [],
  filters: {
    brand: "",
    rentalPrice: "",
    minMileage: "",
    maxMileage: "",
    limit: 12,
    page: 1,
  },
  loading: false,
  error: null,
};

const carsSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCars(state) {
      state.list = [];
      state.totalCars = 0;
      state.totalPages = 0;
      state.error = null;
    },
    addSelected(state, action) {
      if (!state.selected.includes(action.payload)) {
        state.selected.push(action.payload);
      }
    },
    removeSelected(state, action) {
      state.selected = state.selected.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        const page = Number(action.payload.page);
        if (page === 1) {
          state.list = action.payload.cars;
        } else {
          const combinedCars = [...state.list, ...action.payload.cars];
          const uniqueCarsMap = new Map();
          combinedCars.forEach((car) => uniqueCarsMap.set(car.id, car));
          state.list = Array.from(uniqueCarsMap.values());
        }
        state.filters.page = page;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cars";
      });
  },
});

export const { setFilters, clearCars, addSelected, removeSelected } =
  carsSlice.actions;
export default carsSlice.reducer;
