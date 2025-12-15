"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import { toggleFullscreen, useFullScreenChange } from "./utils";
import SwiperSlider from "./_SwiperSlider";

export default function Slider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  useFullScreenChange(() => {
    setIsFullScreen(Boolean(document.fullscreenElement));
  });

  return (
    <div
      ref={sliderRef}
      className={`relative ${isFullScreen ? "h-screen" : "h-[90vh]"}`}
    >
      <SwiperSlider />

      <Button
        className="absolute left-4 bottom-4 z-50"
        variant="outline"
        onClick={() => toggleFullscreen(sliderRef)}
      >
        {!isFullScreen ? "Full screen" : "Exit"}
      </Button>
    </div>
  );
}
