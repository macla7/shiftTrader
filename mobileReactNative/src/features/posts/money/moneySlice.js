import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const initialState = {
  dollars: 0,
  cents: 0,
};

export const moneySlice = createSlice({
  name: "money",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setMoney: (state, action) => {
      if (action.payload.moneyType == "dollars") {
        state.dollars = action.payload.money;
      } else if (action.payload.moneyType == "cents") {
        state.cents = action.payload.money;
      }
      console.log("setting money in moneySlice");
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export const { setMoney } = moneySlice.actions;

export const selectDollars = (state) => state.money.dollars;

export const selectCents = (state) => state.money.cents;

export const selectMoney = (state) => {
  if (state.money.dollars < 0) {
    return (state.money.dollars * 100 - state.money.cents) * 1000000;
  }
  return (state.money.dollars * 100 + state.money.cents) * 1000000;
};

export default moneySlice.reducer;
