import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "./address"; // Import your reducer(s)

const store = configureStore({
  reducer: {
    address: addressReducer, // Add your reducer(s) here
    // Add more reducers as needed
  },
});

export default store;
