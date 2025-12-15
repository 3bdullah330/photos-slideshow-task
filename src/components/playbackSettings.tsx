"use client";

import { Slider } from "@/components/ui/slider";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  updateSlideDuration,
} from "@/reduxStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import IsSliderPlayingTabs from "./isSliderPlayingTabs";
import { TypographyH1 } from "./ui/typography";

export default function playbackSettings() {
  const dispatch = useAppDispatch();

  const [slideDuration, setSlideDuration] = useState<number[]>([12]);
  const stateSlideDuration = useAppSelector(
    (state: RootState) => state.slideDuration
  );

  useEffect(() => {
    setSlideDuration([stateSlideDuration]);
  }, [stateSlideDuration]);

  return (
    <div className="self-center w-full">
      <TypographyH1 className="mb-5">Playback Settings</TypographyH1>

      <div className="p-4 bg-white/70 dark:bg-gray-800 border rounded-xl">
        <h1>{slideDuration[0]} S</h1>
        <Slider
          className="mb-6"
          min={1}
          max={30}
          step={1}
          value={slideDuration}
          onValueChange={setSlideDuration}
          onValueCommit={(value: number[]) => {
            localStorage.setItem("slideDuration", JSON.stringify(value[0]));
            dispatch(updateSlideDuration(value[0]));
            toast.info(`New Slide Duration Is: ${value[0]}s`);
          }}
        />
        <IsSliderPlayingTabs />
      </div>
    </div>
  );
}
