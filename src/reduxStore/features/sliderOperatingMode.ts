import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AutoplayOptions } from "swiper/types";
import type { SliderOperatingModes } from "@/types";

interface OperatingMode {
  operatingMode: SliderOperatingModes;
  sliderConfigs: {
    autoplay: AutoplayOptions | boolean;
  };
}

const autoPlaying: OperatingMode = {
  operatingMode: "auto-playing",
  sliderConfigs: {
    autoplay: { delay: 2000 },
  },
};

const manualControl: OperatingMode = {
  operatingMode: "manual-control",
  sliderConfigs: {
    autoplay: false,
  },
};

const randomPlaying: OperatingMode = {
  operatingMode: "random-playing",
  sliderConfigs: {
    autoplay: { delay: 2000 },
  },
};

const sliderOperatingModeSlice = createSlice({
  name: "sliderOperatingMode",
  initialState: autoPlaying,
  reducers: {
    changeOperatingMode: (
      state: OperatingMode,
      action: PayloadAction<SliderOperatingModes>
    ) => {
      switch (action.payload) {
        case "auto-playing":
          return autoPlaying;
        case "manual-control":
          return manualControl;
        case "random-playing":
          return randomPlaying;
        default:
          return state;
      }
    },
  },
});

export const { changeOperatingMode } = sliderOperatingModeSlice.actions;
export default sliderOperatingModeSlice.reducer;
