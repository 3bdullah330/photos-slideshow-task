"use client";

import {
  useAppDispatch,
  addSlides,
  changeOperatingMode,
  updateSlideDuration,
  updateIsSliderPlaying,
  updateThemeMode,
  updateConfig,
} from "@/reduxStore";
import { SliderOperatingModes, ThemeDConfig } from "@/types";
import { useEffect } from "react";
import { SliderThemeModes } from "@/types";

const loadSlides = (dispatch: any) => {
  const slides = JSON.parse(localStorage.getItem("slides") ?? "[]");
  if (slides.length) dispatch(addSlides(slides));
  else {
    const initialSlides = [
      {
        id: "slide-1",
        imgUrl: "/samples/place-bellecour-lyon.jpg",
        caption: "Place Bellecour Lyon",
      },
      {
        id: "slide-2",
        imgUrl: "/samples/tour-metalique-lyon.jpg",
        caption: "Tour Metalique Lyon",
      },
    ];

    localStorage.setItem("slides", JSON.stringify(initialSlides));
    dispatch(addSlides(initialSlides));
  }
};

const loadOperatingMode = (dispatch: any) => {
  let operatingMode = localStorage.getItem("operatingMode");

  if (!operatingMode) operatingMode = "auto-playing";

  dispatch(changeOperatingMode(operatingMode as SliderOperatingModes));
};

const loadSlideDuration = (dispatch: any) => {
  let slideDuration: any = localStorage.getItem("slideDuration");

  if (!slideDuration) slideDuration = 8;

  dispatch(updateSlideDuration(slideDuration as number));
};

const loadIsSliderPlaying = (dispatch: any) => {
  let isSliderPlaying: any = localStorage.getItem("isSliderPlaying");

  isSliderPlaying = isSliderPlaying === null ? true : isSliderPlaying == "true";

  dispatch(updateIsSliderPlaying(isSliderPlaying));
};

const loadSliderThemeMode = (dispatch: any) => {
  let sliderThemeMode: SliderThemeModes = localStorage.getItem(
    "sliderThemeMode"
  ) as SliderThemeModes;

  if (!sliderThemeMode) sliderThemeMode = "A";

  dispatch(updateThemeMode(sliderThemeMode));
};

const loadThemeDConfig = (dispatch: any) => {
  let themeDConfig: ThemeDConfig = JSON.parse(
    localStorage.getItem("themeDConfig") ?? "{}"
  ) as ThemeDConfig;

  if (!themeDConfig?.direction)
    themeDConfig = {
      direction: "horizontal",
    };

  dispatch(updateConfig(themeDConfig));
};

export default function LoadInitialDataFromLocalStorage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadSlides(dispatch);
    loadOperatingMode(dispatch);
    loadSlideDuration(dispatch);
    loadIsSliderPlaying(dispatch);
    loadSliderThemeMode(dispatch);
    loadThemeDConfig(dispatch);
  }, []);

  return <></>;
}
