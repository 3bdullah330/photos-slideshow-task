"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import { RootState, useAppSelector } from "@/reduxStore";

import type { Slide } from "@/types";
import { Button } from "./ui/button";

import { useEffect } from "react";

const useFullscreenChange = (callback: () => void) => {
  useEffect(() => {
    document.addEventListener("fullscreenchange", callback);
    return () => document.removeEventListener("fullscreenchange", callback);
  }, [callback]);
};

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function Slider() {
  // I create this state to start caption animation when slide change
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      sliderRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useFullscreenChange(() => {
    setIsFullScreen(Boolean(document.fullscreenElement));
  });

  return (
    <div
      ref={sliderRef}
      className={`relative ${isFullScreen ? "h-screen" : "h-[90vh]"}`}
    >
      <SliderConfig setCurrentSlideIndex={setCurrentSlideIndex}>
        {Slides({ currentSlideIndex })}
      </SliderConfig>

      <Button
        className="absolute left-4 bottom-4 z-50"
        variant="outline"
        onClick={toggleFullscreen}
      >
        {!isFullScreen ? "Full screen" : "Exit"}
      </Button>
    </div>
  );
}

const SliderConfig = ({
  setCurrentSlideIndex,
  children,
}: {
  setCurrentSlideIndex: (index: number) => void;
  children: React.ReactNode;
}) => {
  const sliderConfigs = useAppSelector(
    (state: RootState) => state.sliderOperatingMode.sliderConfigs
  );
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    if (sliderConfigs.autoplay) swiperRef.current?.autoplay.start();
    else swiperRef.current?.autoplay.stop();
  }, [sliderConfigs]);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, Keyboard]}
      keyboard={{ enabled: true }}
      navigation
      pagination={{ clickable: true }}
      autoplay={sliderConfigs.autoplay}
      loop
      onSlideChange={(swiper: SwiperType) =>
        setCurrentSlideIndex(swiper.realIndex)
      }
      onSwiper={(swiper: SwiperType) => {
        swiperRef.current = swiper;
      }}
      className="w-full h-full"
    >
      {children}
    </Swiper>
  );
};

const Slides = ({ currentSlideIndex }: { currentSlideIndex: number }) => {
  const stateSlides = useAppSelector((state: RootState) => state.slides);
  const sliderOperatingMode = useAppSelector(
    (state: RootState) => state.sliderOperatingMode.operatingMode
  );
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    if (!stateSlides.length) return;

    setSlides(
      sliderOperatingMode === "random-playing"
        ? shuffleArray([...stateSlides])
        : stateSlides
    );
  }, [stateSlides, sliderOperatingMode]);

  return slides.map((slide: Slide, index: number) => (
    <SwiperSlide key={slide.id}>
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
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center text-white px-4">
          {currentSlideIndex === index && ( // 👈 render only if active
            <motion.h1
              key={slide.id}
              className="text-3xl md:text-6xl font-bold drop-shadow-lg max-w-80 sm:max-w-full px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {slide.caption}
            </motion.h1>
          )}
        </div>
      </div>
    </SwiperSlide>
  ));
};
