"use client";

import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

import type { Slide as SlideType } from "@/types";
import { v4 as UUIDv4 } from "uuid";

import {
  shuffleArray,
  swiperConfigs,
  useHandleUpdateSliderConfigs,
  useHandleUpdateSliderSlides,
  getSlidesState,
  getSliderOperatingModeState,
  getSlideDurationState,
  getIsSliderPlayingState,
  getSliderThemeModeState,
  getSliderConfigsBasedOnTheme,
  getThemeDConfigState,
} from "./utils";
import Slide from "./_Slide";

export default function SwiperSlider() {
  const [swiperkey, setSwiperkey] = useState(UUIDv4());
  const [slides, setSlides] = useState<SlideType[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [autoplay, setAutoplay] = useState<any>(false);
  const [slideTransitionSpeed, setSlideTransitionSpeed] = useState<number>(300);
  const [sliderDirection, setSliderDirection] = useState<
    "vertical" | "horizontal"
  >("horizontal");

  const stateSlides = getSlidesState();
  const sliderOperatingMode = getSliderOperatingModeState();
  const slideDuration = getSlideDurationState();
  const isSliderPlaying = getIsSliderPlayingState();
  const sliderThemeMode = getSliderThemeModeState();
  const themeDConfig = getThemeDConfigState();

  useHandleUpdateSliderConfigs(() => {
    const isManual = sliderOperatingMode === "manual-control";
    const autoPlayDelay = (slideDuration * 1000) / stateSlides.length;

    let { autoplay, speed, direction } = getSliderConfigsBasedOnTheme(
      sliderThemeMode,
      autoPlayDelay,
      themeDConfig.direction
    );

    if (isManual || !isSliderPlaying) autoplay = false;

    setAutoplay(autoplay);
    setSlideTransitionSpeed(speed);
    setSliderDirection(direction);
    setSwiperkey(UUIDv4());
  }, [
    sliderOperatingMode,
    slideDuration,
    isSliderPlaying,
    sliderThemeMode,
    themeDConfig,
  ]);

  useHandleUpdateSliderSlides(() => {
    const isRandom = sliderOperatingMode === "random-playing";
    const slides = isRandom ? shuffleArray([...stateSlides]) : stateSlides;

    setSlides(slides);
    setSwiperkey(UUIDv4());
  }, [stateSlides, sliderOperatingMode]);

  return (
    <Swiper
      dir="rtl"
      key={swiperkey}
      {...swiperConfigs({
        autoplay: autoplay,
        initialSlide: currentSlideIndex,
        speed: slideTransitionSpeed,
        direction: sliderDirection,
      })}
      onSlideChange={(swiper: SwiperType) =>
        setCurrentSlideIndex(swiper.realIndex)
      }
      className="w-full h-full"
    >
      {slides.map((slide: SlideType, index: number) => (
        <SwiperSlide key={`slide-${slide.id}`}>
          <Slide
            slide={slide}
            currentSlideIndex={currentSlideIndex}
            index={index}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
