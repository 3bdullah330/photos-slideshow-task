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
import { TypographyH1 } from "./ui/typography";

export default function SliderOperatingModeTabs() {
  const dispatch = useAppDispatch();
  const operatingModeDefaultValue = useAppSelector(
    (state: RootState) => state.sliderOperatingMode
  );

  return (
    <Tabs
      value={operatingModeDefaultValue}
      onValueChange={(value: string) => {
        dispatch(changeOperatingMode(value as SliderOperatingModes));

        localStorage.setItem("operatingMode", value);
        toast.info("Operating Mode Changed");
      }}
      className="items-center"
    >
      <TypographyH1 className="mb-5">Switching Operating</TypographyH1>

      <TabsList>
        <TabsTrigger value="auto-playing">Auto Playing</TabsTrigger>
        <TabsTrigger value="manual-control">Manual Control</TabsTrigger>
        <TabsTrigger value="random-playing">Random Playing</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
