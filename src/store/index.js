import { configureStore } from "@reduxjs/toolkit";
import cardDetailsReducer from "./cardDetails";

const store = configureStore({
  reducer: { cardDetails: cardDetailsReducer },
});

export default store;
