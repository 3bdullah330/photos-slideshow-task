"use client";

import { useAppDispatch, addSlides, changeOperatingMode } from "@/reduxStore";
import { SliderOperatingModes } from "@/types";
import { useEffect } from "react";

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

export default function LoadInitialDataFromLocalStorage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadSlides(dispatch);
    loadOperatingMode(dispatch);
  }, []);

  return <></>;
}
