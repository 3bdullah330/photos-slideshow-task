"use client";

import {
  RootState,
  updateThemeMode,
  useAppDispatch,
  useAppSelector,
} from "@/reduxStore";
import { SliderThemeModes } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { TypographyH1 } from "./ui/typography";

export default function SliderThemeModeTabs() {
  const dispatch = useAppDispatch();
  const sliderThemeMode = useAppSelector(
    (state: RootState) => state.sliderThemeMode
  );

  return (
    <Tabs
      value={sliderThemeMode}
      onValueChange={(value: string) => {
        dispatch(updateThemeMode(value as SliderThemeModes));
        localStorage.setItem("sliderThemeMode", value);

        toast.info(`Theme Mode Is: ${value}`);
      }}
      className="items-center"
    >
      <TypographyH1 className="mb-5">Themes</TypographyH1>

      <TabsList className="w-full">
        <TabsTrigger value="A">A</TabsTrigger>
        <TabsTrigger value="B">B</TabsTrigger>
        <TabsTrigger value="C">C</TabsTrigger>
        <TabsTrigger value="D">D</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
