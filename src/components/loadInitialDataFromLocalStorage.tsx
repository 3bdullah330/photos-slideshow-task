"use client";

import {
  useAppDispatch,
  addSlides,
  useAppSelector,
  RootState,
} from "@/reduxStore";
import { useEffect } from "react";

export default function LoadInitialDataFromLocalStorage() {
  const dispatch = useAppDispatch();
  const initialSlides = useAppSelector((state: RootState) => state.slides);

  useEffect(() => {
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
  }, []);

  return <></>;
}
