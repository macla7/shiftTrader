import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  money: 0,
};

export const moneySlice = createSlice({
  name: "money",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setMoney: (state, action) => {
      state.money = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export const { setMoney } = moneySlice.actions;

export const selectMoney = (state) => {
  return state.money.money;
};

export default moneySlice.reducer;
