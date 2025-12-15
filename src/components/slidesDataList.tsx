"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "sonner";

import {
  RootState,
  useAppDispatch,
  useAppSelector,
  updateSlidesCaptions,
  updateSlidesOrder,
} from "@/reduxStore";

import { Slide } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { TypographyH1 } from "./ui/typography";

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function SlidesDataList() {
  const slides: Slide[] = useAppSelector((state: RootState) => state.slides);
  const [updatedCaptions, setUpdatedCaptions] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const handleSlidesShuffle = () => {
    const shuffledSlides = shuffleArray([...slides]);

    localStorage.setItem("slides", JSON.stringify(shuffledSlides));
    dispatch(updateSlidesOrder(shuffledSlides));

    toast.info("The Slider Order Is Shfuled");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const localStorageSlides = JSON.parse(
          localStorage.getItem("slides") ?? "[]"
        );

        if (localStorageSlides) {
          updatedCaptions.forEach((newCaption: string, index: number) => {
            if (newCaption) {
              localStorageSlides[index] = {
                ...localStorageSlides[index],
                caption: newCaption,
              };
            }
          });

          localStorage.setItem("slides", JSON.stringify(localStorageSlides));
        }

        dispatch(updateSlidesCaptions(updatedCaptions));
        toast.success("Captions Updated");
      }}
    >
      <TypographyH1 className="mb-5">Ordering Photos</TypographyH1>

      <div className="w-full">
        <SlidesBoxs setUpdatedCaptions={setUpdatedCaptions} />
      </div>
      <Button type="submit" className="w-full">
        Update
      </Button>
      <Button
        type="button"
        className="w-full mt-3"
        variant="outline"
        onClick={handleSlidesShuffle}
      >
        Shuffle The Slides Order
      </Button>
    </form>
  );
}

const SlidesBoxs = ({
  setUpdatedCaptions,
}: {
  setUpdatedCaptions: Dispatch<SetStateAction<string[]>>;
}) => {
  const slides: Slide[] = useAppSelector((state: RootState) => state.slides);
  const dispatch = useAppDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handlOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = slides.findIndex((item) => item.id === active.id);
    const newIndex = slides.findIndex((item) => item.id === over.id);

    const newSlides = arrayMove(slides, oldIndex, newIndex);

    localStorage.setItem("slides", JSON.stringify(newSlides));
    dispatch(updateSlidesOrder(newSlides));

    toast.info("Slider Order Changed");
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handlOnDragEnd}
      >
        <SortableContext
          items={slides.map((slide: Slide) => slide.id)}
          strategy={verticalListSortingStrategy}
        >
          {slides.map((slide: Slide, index: number) => {
            return (
              <SlideComponent
                key={slide.id}
                slide={slide}
                index={index}
                setUpdatedCaptions={setUpdatedCaptions}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </>
  );
};

const SlideComponent = ({
  slide,
  index,
  setUpdatedCaptions,
}: {
  slide: Slide;
  index: number;
  setUpdatedCaptions: Dispatch<SetStateAction<string[]>>;
}) => {
  const handleChange = (currentIndex: number, newCaption: string): void => {
    setUpdatedCaptions((prev) => {
      prev[currentIndex] = newCaption;
      return prev;
    });
  };

  const id = slide.id;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
    transition,
  };

  const styleWhenDragging =
    isDragging && `z-10 opacity-92 border-black dark:border-white`;

  return (
    <div
      className={`relative flex flex-col bg-white dark:bg-gray-900 p-4 border m-2 rounded-md cursor-grab touch-none active:cursor-grabbing ${styleWhenDragging}`}
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      <div className="w-50 mb-6">
        <AspectRatio
          ratio={1 / 1}
          className="g-muted rounded-md overflow-hidden"
        >
          <Image
            src={slide.imgUrl}
            alt={slide.caption}
            fill
            className="object-cover"
          />
        </AspectRatio>
      </div>

      <div className="flex-1">
        <Input
          type="text"
          onChange={(e) => handleChange(index, e?.target?.value)}
          placeholder={slide.caption}
        />
      </div>

      <FontAwesomeIcon
        icon={faGripVertical}
        className="absolute top-5 right-5"
      />
    </div>
  );
};
