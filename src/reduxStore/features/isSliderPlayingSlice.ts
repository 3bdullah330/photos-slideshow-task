import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = true;

const isSliderPlayingSlice = createSlice({
  name: "isSliderPlaying",
  initialState,
  reducers: {
    updateIsSliderPlaying: (state, action) => action.payload,
  },
});

export const { updateIsSliderPlaying } = isSliderPlayingSlice.actions;
export default isSliderPlayingSlice.reducer;
