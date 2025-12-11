"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import {
  RootState,
  useAppDispatch,
  useAppSelector,
  updateSlidesCaptions,
} from "@/reduxStore";
import { Slide } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

export default function SlidesDataList() {
  const [updatedCaptions, setUpdatedCaptions] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  return (
    <form
      className="rounded-lg border p-4"
      onSubmit={(e) => {
        e.preventDefault();

        const localStorageSlides = JSON.parse(
          localStorage.getItem("slides") ?? "[]"
        );

        if (localStorageSlides) {
          updatedCaptions.forEach((newCaption: string, index: number) => {
            if (newCaption) {
              localStorageSlides[index] = {
                ...localStorageSlides[index],
                caption: newCaption,
              };
            }
          });

          localStorage.setItem("slides", JSON.stringify(localStorageSlides));
        }

        dispatch(updateSlidesCaptions(updatedCaptions));
        toast.success("Captions Updated");
      }}
    >
      <SlidesBoxs setUpdatedCaptions={setUpdatedCaptions} />
      <Button type="submit" className="w-full">
        Update
      </Button>
    </form>
  );
}

const SlidesBoxs = ({
  setUpdatedCaptions,
}: {
  setUpdatedCaptions: Dispatch<SetStateAction<string[]>>;
}) => {
  const slides: Slide[] = useAppSelector((state: RootState) => state.slides);

  const handleChange = (currentIndex: number, newCaption: string): void => {
    setUpdatedCaptions((prev) => {
      prev[currentIndex] = newCaption;
      return prev;
    });
  };

  return (
    <>
      {slides.map((slide: Slide, index: number) => {
        return (
          <div
            key={slide.id}
            className="flex flex-col p-6 border m-6 rounded-md"
          >
            <div className="w-60 mb-6">
              <AspectRatio
                ratio={1 / 1}
                className="g-muted rounded-md overflow-hidden"
              >
                <Image
                  src={slide.imgUrl}
                  alt={slide.caption}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            </div>

            <div className="flex-1">
              <Input
                id={slide.id}
                type="text"
                onChange={(e) => handleChange(index, e?.target?.value)}
                placeholder={slide.caption}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
