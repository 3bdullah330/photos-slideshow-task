import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeDConfig } from "@/types";

const initialState: ThemeDConfig = {
  direction: "horizontal",
};

const themeDConfigSlice = createSlice({
  name: "themeDConfig",
  initialState,
  reducers: {
    updateConfig: (state: ThemeDConfig, action: PayloadAction<ThemeDConfig>) =>
      action.payload,
  },
});

export const { updateConfig } = themeDConfigSlice.actions;
export default themeDConfigSlice.reducer;
