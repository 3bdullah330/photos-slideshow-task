"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAppDispatch,
  changeOperatingMode,
  useAppSelector,
  RootState,
} from "@/reduxStore";
import type { SliderOperatingModes } from "@/types";
import { toast } from "sonner";

export default function SliderOperatingModeTabs() {
  const dispatch = useAppDispatch();
  const operatingModeDefaultValue = useAppSelector(
    (state: RootState) => state.sliderOperatingMode.operatingMode
  );

  return (
    <Tabs
      value={operatingModeDefaultValue}
      onValueChange={(value: string) => {
        dispatch(changeOperatingMode(value as SliderOperatingModes));

        localStorage.setItem("operatingMode", value);
        toast.info("Operating Mode Changed");
      }}
      className="my-6 items-center"
    >
      <TabsList>
        <TabsTrigger value="auto-playing">Auto Playing</TabsTrigger>
        <TabsTrigger value="manual-control">Manual Control</TabsTrigger>
        <TabsTrigger value="random-playing">Random Playing</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
