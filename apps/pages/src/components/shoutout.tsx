"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ShoutoutRootProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  title?: string;
  subtitle?: string;
  desc?: string;
  className?: string;
}

const ShoutoutRoot = React.forwardRef<HTMLElement, ShoutoutRootProps>(
  function ShoutoutRoot(
    {
      image,
      title,
      desc,
      className,
      ...otherProps
    }: ShoutoutRootProps,
    ref
  ) {
    return (
      <div
        className={cn(
          "flex w-full flex-col items-center gap-4 pt-6 pr-6 pb-6 pl-6",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 overflow-hidden rounded">
            {image ? <img className="h-11 w-11 flex-none" src={image} /> : null}
          </div>
          <div className="flex flex-col items-start gap-1">
            {title ? (
              <span className="line-clamp-1 w-full">
                {title}
              </span>
            ) : null}
          </div>
        </div>
        {desc ? (
          <span className="line-clamp-3 text-center">
            {desc}
          </span>
        ) : null}
      </div>
    );
  }
);

export const Shoutout = ShoutoutRoot;