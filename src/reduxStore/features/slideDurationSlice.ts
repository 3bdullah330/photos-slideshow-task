import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type slideDuration = number;

const initialState: slideDuration = 12;

const slideDurationSlice = createSlice({
  name: "slideDuration",
  initialState,
  reducers: {
    updateSlideDuration: (state, action) => action.payload,
  },
});

export const { updateSlideDuration } = slideDurationSlice.actions;
export default slideDurationSlice.reducer;
