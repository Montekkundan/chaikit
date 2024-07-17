"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SidebarTileRootProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  text?: string;
  className?: string;
}

const SidebarTileRoot = React.forwardRef<HTMLElement, SidebarTileRootProps>(
  function SidebarTileRoot(
    {
      icon = "FeatherPlus",
      text,
      className,
      ...otherProps
    }: SidebarTileRootProps,
    ref
  ) {
    return (
      <div
        className={cn(
          "group/e8211096 flex w-full cursor-pointer flex-col items-center justify-center gap-2 bg-default-background pt-6 pr-6 pb-6 pl-6 hover:bg-neutral-50 active:bg-neutral-100",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        icon
        {text ? (
          <span className="text-caption-bold font-caption-bold text-subtext-color group-hover/e8211096:text-default-font group-active/e8211096:text-default-font">
            {text}
          </span>
        ) : null}
      </div>
    );
  }
);

export const SidebarTile = SidebarTileRoot;