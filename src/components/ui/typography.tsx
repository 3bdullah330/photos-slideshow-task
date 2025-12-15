"use client";

import { cn } from "@/lib/utils";

export function TypographyH1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        className,
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
      )}
    >
      {children}
    </h1>
  );
}
