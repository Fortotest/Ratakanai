import { cn } from "@/lib/utils";
import React from "react";

type CardGlassProps = {
  children: React.ReactNode;
  className?: string;
};

export function CardGlass({ children, className }: CardGlassProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/20 bg-white/50 p-6 shadow-lg backdrop-blur-md dark:bg-black/20",
        className
      )}
    >
      {children}
    </div>
  );
}
