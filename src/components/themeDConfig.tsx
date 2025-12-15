"use client";

import {
  RootState,
  updateConfig,
  useAppDispatch,
  useAppSelector,
} from "@/reduxStore";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeDConfig as ThemeDConfigType } from "@/types";
import { toast } from "sonner";
import { TypographyH1 } from "./ui/typography";

export default function ThemeDConfig() {
  const dispatch = useAppDispatch();
  const themeDConfig = useAppSelector<ThemeDConfigType>(
    (state: RootState) => state.themeDConfig
  );

  return (
    <Tabs
      value={themeDConfig.direction as string}
      onValueChange={(value: string) => {
        const newConfig = {
          direction: value,
        };

        dispatch(updateConfig(newConfig as ThemeDConfigType));
        localStorage.setItem("themeDConfig", JSON.stringify(newConfig));
        toast.info(`Current Theme D Direction Is: ${value}`);
      }}
      className="items-center"
    >
      <TypographyH1 className="mb-5">Theme D Options</TypographyH1>

      <TabsList className="w-full">
        <TabsTrigger value="vertical">Vertical</TabsTrigger>
        <TabsTrigger value="horizontal">Horizontal</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
