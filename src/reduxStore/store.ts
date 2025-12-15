import { configureStore } from "@reduxjs/toolkit";
import SlidesReducer from "./features/slidesSlice";
import SliderOperatingModeReducer from "./features/sliderOperatingModeSlice";
import SlideDurationReducer from "./features/slideDurationSlice";
import IsSliderPlayingReducer from "./features/isSliderPlayingSlice";
import SliderThemeModeReducer from "./features/sliderThemeModeSlice";
import ThemeDConfigReducer from "./features/themeDConfigSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      slides: SlidesReducer,
      sliderOperatingMode: SliderOperatingModeReducer,
      slideDuration: SlideDurationReducer,
      isSliderPlaying: IsSliderPlayingReducer,
      sliderThemeMode: SliderThemeModeReducer,
      themeDConfig: ThemeDConfigReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
