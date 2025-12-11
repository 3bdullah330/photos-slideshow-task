import { Slide } from "@/types";

export const removeDuplicatedImages = (
  oldSlides: Slide[],
  newSlides: Slide[]
): Slide[] => {
  return newSlides.filter((newSlide: Slide) => {
    let isSlideDuplicated: boolean = false;

    oldSlides.forEach((oldSlide: Slide) => {
      isSlideDuplicated = oldSlide.caption == newSlide.caption;
    });

    return !isSlideDuplicated;
  });
};
