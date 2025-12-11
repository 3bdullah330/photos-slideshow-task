import { createSlice } from "@reduxjs/toolkit";
import { Slide } from "@/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { removeDuplicatedImages } from "./utils";

const slidesSlice = createSlice({
  name: "slides",
  initialState: [],
  reducers: {
    addSlides: (state: Slide[], action: PayloadAction<Slide[]>) => {
      let newSlides: Slide[] = action.payload;

      newSlides = removeDuplicatedImages(state, newSlides);
      state.push(...newSlides);
    },
    updateSlidesCaptions: (state: Slide[], action: PayloadAction<string[]>) => {
      const updateSlidesCaptions = action.payload;

      updateSlidesCaptions.forEach((newCaption: string, index: number) => {
        if (newCaption) {
          state[index] = {
            ...state[index],
            caption: newCaption,
          };
        }
      });
    },
  },
});

export const { addSlides, updateSlidesCaptions } = slidesSlice.actions;
export default slidesSlice.reducer;
