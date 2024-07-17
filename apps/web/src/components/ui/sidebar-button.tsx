"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SidebarButtonRootProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: string;
  text?: string;
  className?: string;
}

const SidebarButtonRoot = React.forwardRef<HTMLElement, SidebarButtonRootProps>(
  function SidebarButtonRoot(
    {
      icon = "FeatherPlus",
      text,
      className,
      ...otherProps
    }: SidebarButtonRootProps,
    ref
  ) {
    return (
      <div
        className={cn(
          "group/315250d8 flex w-full cursor-pointer items-center gap-4 border-t border-solid border-neutral-border pt-4 pr-4 pb-4 pl-4 hover:bg-neutral-50 active:bg-neutral-100",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        icon
        {text ? (
          <span className="text-body-bold font-body-bold text-subtext-color group-hover/315250d8:text-default-font group-active/315250d8:text-default-font">
            {text}
          </span>
        ) : null}
      </div>
    );
  }
);

export const SidebarButton = SidebarButtonRoot;