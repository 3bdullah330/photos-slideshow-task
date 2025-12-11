import { Slide } from "@/types";

export const isFirstLetter = (currentIndex: number): boolean => {
  return currentIndex == 0;
};

export const isSlug = (letter: string): boolean => {
  return letter == "_" || letter == "-";
};

export const isFirstLetterInAWord = (letter: string): boolean => {
  return letter == "_" || letter == "-";
};

export const removeFileExtension = (fileName: string): string => {
  return fileName.slice(0, fileName.indexOf("."));
};

export const removeSlugAndFormatFileName = (fileName: string): string => {
  let formatedFileName: string[] = fileName.split("");

  formatedFileName = formatedFileName.reduce(
    (accumulator: any, currentValue: any, currentIndex: number) => {
      if (isFirstLetter(currentIndex)) return currentValue.toUpperCase();

      if (isSlug(currentValue)) return accumulator + " ";

      if (isFirstLetterInAWord(formatedFileName[currentIndex - 1]))
        return accumulator + currentValue.toUpperCase();

      return accumulator + currentValue;
    },
    ""
  );

  return formatedFileName.toString();
};

export const addSlidesToLocalStorage = (slides: Slide[]): void => {
  const localStorageSlides = JSON.parse(localStorage.getItem("slides") ?? "[]");
  if (localStorageSlides)
    localStorage.setItem(
      "slides",
      JSON.stringify([...localStorageSlides, ...slides])
    );
};
