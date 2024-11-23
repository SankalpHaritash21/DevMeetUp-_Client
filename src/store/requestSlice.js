import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload, // Fixed parameter typo
    removeRequest: (state, action) => {
      return state.filter((r) => r._id !== action.payload); // Corrected logic
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
