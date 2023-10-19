import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: { value: { address: "GKP" } },
  reducers: {
    register: (state, action) => {
      state.value.address = action.payload;
      console.log(action.payload)
    },
  },
});

export const { register } = addressSlice.actions; 

export default addressSlice.reducer;
