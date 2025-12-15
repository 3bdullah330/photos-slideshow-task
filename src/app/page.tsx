import { Slider } from "@/components/slider";
import LoadInitialDataFromLocalStorage from "@/components/loadInitialDataFromLocalStorage";
import ThemeModeToggle from "@/components/themeModeToggle";
import Configuration from "@/components/configuration";
import CommandBar from "@/components/commandBar";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Slider />
      <CommandBar />

      <div className="fixed top-10 left-5 z-50 flex flex-col gap-3">
        <Configuration />
        <ThemeModeToggle />
      </div>

      <LoadInitialDataFromLocalStorage />
    </div>
  );
}
