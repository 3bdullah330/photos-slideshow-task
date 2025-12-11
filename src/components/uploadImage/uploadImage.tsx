"use client";

import { UploadDropzone } from "@/components/ui/upload-dropzone";
import { Slide } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch, addSlides } from "@/reduxStore";
import {
  addSlidesToLocalStorage,
  removeFileExtension,
  removeSlugAndFormatFileName,
} from "./utils";
import { toast } from "sonner";

export default function Uploader() {
  const dispatch = useAppDispatch();

  const uploadImgToSlides = (...args: unknown[]): void => {
    const files = args[0] as File[];
    const slides: Slide[] = [];

    files.forEach((image: File) => {
      const url: string = URL.createObjectURL(image);

      let caption: string = image?.name;
      caption = removeFileExtension(caption);
      caption = removeSlugAndFormatFileName(caption);

      slides.push({ id: uuidv4(), imgUrl: url, caption });
    });

    addSlidesToLocalStorage(slides);

    dispatch(addSlides(slides));
    toast.success("Image Uploaded");
  };

  return (
    <div className="p-10">
      <UploadDropzone accept="image/*" uploadOverride={uploadImgToSlides} />
    </div>
  );
}
