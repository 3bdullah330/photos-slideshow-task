import { configureStore } from "@reduxjs/toolkit";
import SlidesReducer from "./features/slidesSlice";
import SliderOperatingModeReducer from "./features/sliderOperatingMode";

export const makeStore = () => {
  return configureStore({
    reducer: {
      slides: SlidesReducer,
      sliderOperatingMode: SliderOperatingModeReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
