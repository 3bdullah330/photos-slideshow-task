import { createSlice } from "@reduxjs/toolkit";
import type { SliderOperatingModes } from "@/types";

const initialState: SliderOperatingModes = "auto-playing";

const sliderOperatingModeSlice = createSlice({
  name: "sliderOperatingMode",
  initialState: initialState,
  reducers: {
    changeOperatingMode: (state, action) => action.payload,
  },
});

export const { changeOperatingMode } = sliderOperatingModeSlice.actions;
export default sliderOperatingModeSlice.reducer;
