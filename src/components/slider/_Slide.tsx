"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, Transition } from "motion/react";

import { RootState, useAppSelector } from "@/reduxStore";

import type { SliderThemeModes, Slide as SlideType } from "@/types";

export default function Slide({
  slide,
  currentSlideIndex,
  index,
}: {
  slide: SlideType;
  currentSlideIndex: number;
  index: number;
}) {
  const sliderThemeMode = useAppSelector<SliderThemeModes>(
    (state: RootState) => state.sliderThemeMode
  );
  const [transition, setTransition] = useState<Transition<any> | undefined>({
    duration: 0,
    delay: 0,
  });

  useEffect(() => {
    switch (sliderThemeMode) {
      case "A":
        setTransition({ duration: 0, delay: 0 });
        break;
      case "B":
        setTransition({ duration: 0.5, delay: 0.3 });
        break;
    }
  }, [sliderThemeMode]);

  return (
    <div className="relative w-full h-full">
      {/* Background image */}
      <Image
        src={slide.imgUrl}
        alt={slide.caption}
        fill
        priority={index === 0}
        className="object-cover"
      />

      {/* Overlay with Framer Motion */}
      {sliderThemeMode !== "C" ? (
        <AOrBCaptionEffect
          id={slide.id}
          caption={slide.caption}
          currentSlideIndex={currentSlideIndex}
          index={index}
          transition={transition}
        />
      ) : (
        <CThemeCaptionEffect
          id={slide.id}
          caption={slide.caption}
          currentSlideIndex={currentSlideIndex}
          index={index}
        />
      )}
    </div>
  );
}

const AOrBCaptionEffect = ({
  currentSlideIndex,
  index,
  id,
  transition,
  caption,
}: {
  currentSlideIndex: number;
  index: number;
  id: string;
  transition: Transition<any> | undefined;
  caption: string;
}) => {
  return (
    <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center text-white px-4">
      {currentSlideIndex === index && (
        <motion.h1
          key={`slideCaption-${id}`}
          className="text-3xl md:text-6xl font-bold drop-shadow-lg max-w-80 sm:max-w-full px-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transition}
        >
          {caption}
        </motion.h1>
      )}
    </div>
  );
};

const CThemeCaptionEffect = ({
  currentSlideIndex,
  index,
  id,
  caption,
}: {
  currentSlideIndex: number;
  index: number;
  id: string;
  caption: string;
}) => {
  return (
    <div
      dir="ltr"
      className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center text-white px-4"
    >
      {currentSlideIndex === index && (
        <h1
          key={`slideCaption-${id}`}
          className="text-3xl md:text-6xl font-bold drop-shadow-lg max-w-80 sm:max-w-full px-4"
        >
          {caption.split(" ").map((word: string, i: number) => {
            return (
              <motion.span
                key={`word-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + i * 0.4,
                }}
              >
                {word}&nbsp;
              </motion.span>
            );
          })}
        </h1>
      )}
    </div>
  );
};
