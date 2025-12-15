import { createSlice } from "@reduxjs/toolkit";
import { Slide } from "@/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { removeDuplicatedImages } from "./utils";

const initialState: Slide[] = [];

const slidesSlice = createSlice({
  name: "slides",
  initialState,
  reducers: {
    addSlides: (state: Slide[], action: PayloadAction<Slide[]>) => {
      let newSlides: Slide[] = action.payload;

      newSlides = removeDuplicatedImages(state, newSlides);
      return [...state, ...newSlides];
    },
    updateSlidesCaptions: (state: Slide[], action: PayloadAction<string[]>) => {
      const updateSlidesCaptions = action.payload;
      const slides = state;

      updateSlidesCaptions.forEach((newCaption: string, index: number) => {
        if (newCaption) {
          slides[index] = {
            ...slides[index],
            caption: newCaption,
          };
        }
      });

      return slides;
    },
    updateSlidesOrder: (state: Slide[], action: PayloadAction<Slide[]>) => {
      return action.payload;
    },
  },
});

export const { addSlides, updateSlidesCaptions, updateSlidesOrder } =
  slidesSlice.actions;
export default slidesSlice.reducer;
