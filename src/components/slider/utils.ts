import { RootState, useAppSelector } from "@/reduxStore";
import {
  Slide,
  SliderOperatingModes,
  SliderThemeModes,
  ThemeDConfig,
} from "@/types";
import React, { useEffect } from "react";
import { Autoplay, Pagination, Keyboard, Navigation } from "swiper/modules";
import { AutoplayOptions, SwiperOptions } from "swiper/types";

export const useFullScreenChange = (callback: () => void) => {
  useEffect(() => {
    document.addEventListener("fullscreenchange", callback);
    return () => document.removeEventListener("fullscreenchange", callback);
  }, [callback]);
};

export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const toggleFullscreen = (
  sliderRef: React.RefObject<HTMLDivElement | null>
) => {
  if (!document.fullscreenElement) {
    sliderRef.current?.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
};

export const swiperConfigs = ({
  autoplay,
  initialSlide,
  speed,
  direction,
}: {
  autoplay?: boolean | AutoplayOptions;
  initialSlide: number | undefined;
  speed: number;
  direction: "vertical" | "horizontal";
}): SwiperOptions => {
  return {
    direction,
    modules: [Navigation, Pagination, Autoplay, Keyboard],
    keyboard: { enabled: true },
    navigation: true,
    pagination: { clickable: true },
    loop: true,
    autoplay,
    initialSlide,
    speed,
  };
};

export const useHandleUpdateSliderConfigs = (
  callback: () => void,
  deps: any[]
) => {
  useEffect(() => {
    callback();
  }, [...deps]);
};

export const useHandleUpdateSliderSlides = (
  callback: () => void,
  deps: any[]
) => {
  useEffect(() => {
    callback();
  }, [...deps]);
};

export const getSlidesState = () =>
  useAppSelector<Slide[]>((state: RootState) => state.slides);
export const getSliderOperatingModeState = () =>
  useAppSelector<SliderOperatingModes>(
    (state: RootState) => state.sliderOperatingMode
  );
export const getSlideDurationState = () =>
  useAppSelector<number>((state: RootState) => state.slideDuration);

export const getIsSliderPlayingState = () =>
  useAppSelector<boolean>((state: RootState) => state.isSliderPlaying);

export const getSliderThemeModeState = () =>
  useAppSelector<SliderThemeModes>((state: RootState) => state.sliderThemeMode);

export const getThemeDConfigState = () =>
  useAppSelector<ThemeDConfig>((state: RootState) => state.themeDConfig);

export const getSliderConfigsBasedOnTheme = (
  sliderThemeMode: SliderThemeModes,
  autoPlayDelay: number,
  direction: "vertical" | "horizontal" = "horizontal"
): {
  autoplay: AutoplayOptions | boolean;
  speed: number;
  direction: "vertical" | "horizontal";
} => {
  let speed: number = 300;
  let autoplay: AutoplayOptions | boolean = { delay: autoPlayDelay };

  switch (sliderThemeMode) {
    case "A":
      autoplay = {
        delay: autoPlayDelay,
        waitForTransition: false,
        disableOnInteraction: true,
      };
      speed = 0;
      direction = "horizontal";
      break;

    case "B":
      direction = "horizontal";
      break;

    case "C":
      direction = "vertical";
      break;
  }

  return { autoplay, speed, direction };
};
