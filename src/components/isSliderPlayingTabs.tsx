"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RootState,
  updateIsSliderPlaying,
  useAppDispatch,
  useAppSelector,
} from "@/reduxStore";
import { toast } from "sonner";

export default function SliderPausePlayControl() {
  const dispatch = useAppDispatch();
  const isSliderPlaying = useAppSelector(
    (state: RootState) => state.isSliderPlaying
  );

  return (
    <Tabs
      value={(isSliderPlaying as boolean) ? "play" : "pause"}
      onValueChange={(value: string) => {
        const isPlaying = value == "play";

        dispatch(updateIsSliderPlaying(isPlaying));
        localStorage.setItem("isSliderPlaying", JSON.stringify(isPlaying));
        toast.info("Playing Mode Changed");
      }}
      className="items-center"
    >
      <TabsList className="w-full">
        <TabsTrigger value="play">Play</TabsTrigger>
        <TabsTrigger value="pause">Pause</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
