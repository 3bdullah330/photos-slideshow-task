import Slider from "@/components/slider";
import { UploadImage } from "@/components/uploadImage";
import SlidesDataList from "@/components/slidesDataList";
import LoadInitialDataFromLocalStorage from "@/components/loadInitialDataFromLocalStorage";
import SliderOperatingModeTabs from "@/components/sliderOperatingModeTabs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Slider />
      <UploadImage />
      <SlidesDataList />
      <LoadInitialDataFromLocalStorage />
      <SliderOperatingModeTabs />
    </div>
  );
}
