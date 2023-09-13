import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

const customerInfoSlice = createSlice({
  name: "customerInfo",
  initialState,
  reducers: {
    setCustomerInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { setCustomerInfo } = customerInfoSlice.actions;

export default customerInfoSlice.reducer;
