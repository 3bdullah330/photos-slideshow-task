"use client";

"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useEffect } from "react";
import {
  changeOperatingMode,
  RootState,
  updateIsSliderPlaying,
  updateSlidesOrder,
  updateThemeMode,
  useAppDispatch,
  useAppSelector,
} from "@/reduxStore";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { shuffleArray } from "./slider/utils";
import { Slide } from "@/types";

export default function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();
  const slides: Slide[] = useAppSelector((state: RootState) => state.slides);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p
        className="text-muted-foreground text-lg text-center p-3"
        onClick={() => setOpen(true)}
      >
        Press{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-sm font-medium opacity-100 select-none">
          <span className="text-lg">⌘</span>K
        </kbd>{" "}
        Or{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-sm font-medium opacity-100 select-none">
          /
        </kbd>{" "}
        Or Click Here To Activate Command Bar
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Operating Modes">
            <CommandItem
              onSelect={() => {
                dispatch(changeOperatingMode("manual-control"));

                localStorage.setItem("operatingMode", "manual-control");
                toast.info("Operating Mode Changed");

                setOpen(false);
              }}
            >
              <span className="w-full">Change to manual control mode</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                dispatch(changeOperatingMode("auto-playing"));

                localStorage.setItem("operatingMode", "auto-playing");
                toast.info("Operating Mode Changed");

                setOpen(false);
              }}
            >
              <span className="w-full">Change to auto-playing mode</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                dispatch(changeOperatingMode("random-playing"));

                localStorage.setItem("operatingMode", "random-playing");
                toast.info("Operating Mode Changed");

                setOpen(false);
              }}
            >
              <span className="w-full">Change to random playing mode</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Available Slider Themes">
            <CommandItem
              onSelect={() => {
                dispatch(updateThemeMode("A"));
                localStorage.setItem("sliderThemeMode", "A");

                toast.info(`Theme Mode Is: ${"A"}`);

                setOpen(false);
              }}
            >
              <span className="w-full">Switch to theme A</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                dispatch(updateThemeMode("B"));
                localStorage.setItem("sliderThemeMode", "B");

                toast.info(`Theme Mode Is: ${"B"}`);

                setOpen(false);
              }}
            >
              <span className="w-full">Switch to theme B</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                dispatch(updateThemeMode("C"));
                localStorage.setItem("sliderThemeMode", "C");

                toast.info(`Theme Mode Is: ${"C"}`);

                setOpen(false);
              }}
            >
              <span className="w-full">Switch to theme C</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                dispatch(updateThemeMode("D"));
                localStorage.setItem("sliderThemeMode", "D");

                toast.info(`Theme Mode Is: ${"D"}`);

                setOpen(false);
              }}
            >
              <span className="w-full">Switch to theme D</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Theme Mode">
            <CommandItem
              onSelect={() => {
                setTheme("light");
                setOpen(false);
              }}
            >
              <span className="w-full">Light mode</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTheme("dark");
                setOpen(false);
              }}
            >
              <span className="w-full">Dark mode</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup>
            <CommandItem
              onSelect={() => {
                const shuffledSlides = shuffleArray([...slides]);

                localStorage.setItem("slides", JSON.stringify(shuffledSlides));
                dispatch(updateSlidesOrder(shuffledSlides));

                toast.info("The Slider Order Is Shfuled");

                setOpen(false);
              }}
            >
              <span className="w-full">Shuffle photos</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                dispatch(updateIsSliderPlaying(false));
                localStorage.setItem("isSliderPlaying", JSON.stringify(false));
                toast.info("Playing Mode Changed");

                setOpen(false);
              }}
            >
              <span className="w-full">Pause slideshow</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                dispatch(updateIsSliderPlaying(true));
                localStorage.setItem("isSliderPlaying", JSON.stringify(true));
                toast.info("Playing Mode Changed");

                setOpen(false);
              }}
            >
              <span className="w-full">Play slideshow</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
