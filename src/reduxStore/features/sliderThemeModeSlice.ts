import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliderThemeModes } from "@/types";

const initialState = "A" as SliderThemeModes;

const sliderThemeModeSlice = createSlice({
  name: "sliderTheme",
  initialState,
  reducers: {
    updateThemeMode: (
      state: SliderThemeModes,
      action: PayloadAction<SliderThemeModes>
    ) => action.payload,
  },
});

export const { updateThemeMode } = sliderThemeModeSlice.actions;
export default sliderThemeModeSlice.reducer;
