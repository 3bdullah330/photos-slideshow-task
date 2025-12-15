"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UploadImage } from "@/components/uploadImage";
import SlidesDataList from "@/components/slidesDataList";
import SliderOperatingModeTabs from "@/components/sliderOperatingModeTabs";
import PlaybackSettings from "@/components/playbackSettings";
import SliderThemeModeTabs from "@/components/sliderThemeModeTabs";
import ThemeDConfig from "@/components/themeDConfig";

export default function Configuration() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="p-0!">
          <FontAwesomeIcon icon={faSliders} />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Slider Configuration</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-16 px-4 my-10">
          <UploadImage />
          <SliderOperatingModeTabs />
          <SlidesDataList />
          <PlaybackSettings />
          <SliderThemeModeTabs />
          <ThemeDConfig />
        </div>
      </SheetContent>
    </Sheet>
  );
}
