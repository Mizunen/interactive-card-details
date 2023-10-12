import { createSlice } from "@reduxjs/toolkit";
import cardLogo from "../images/card-logo.svg";
const initialState = {
  name: "Jane Appleseed",
  cardNumber: "0000 0000 0000 0000",
  expDate: "00/00",
  cvc: "123",
  logo: cardLogo,
  wasUpdated: false,
};

const cardDetailsSlice = createSlice({
  name: "CardDetails",
  initialState,
  reducers: {
    update(state, action) {
      return { ...state, ...action.payload, wasUpdated: true };
    },
    reset(state) {
      return { ...initialState };
    },
  },
});

export const cardActions = cardDetailsSlice.actions;

export default cardDetailsSlice.reducer;
