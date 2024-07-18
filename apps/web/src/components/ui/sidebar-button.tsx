"use client";

import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";

interface SidebarButtonRootProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  text?: string;
  className?: string;
  link?: string;
}

const SidebarButtonRoot = React.forwardRef<HTMLElement, SidebarButtonRootProps>(
  function SidebarButtonRoot(
    {
      icon,
      text,
      className,
      link,
      ...otherProps
    }: SidebarButtonRootProps,
    ref
  ) {
    const content = (
      <div
        className={cn(
          "group/315250d8 flex w-full cursor-pointer items-center gap-4 border-t border-solid border-neutral-border pt-4 pr-4 pb-4 pl-4",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        {icon}
        {text ? (
          <span className="text-body-bold font-body-bold text-subtext-color group-hover/315250d8:text-default-font group-active/315250d8:text-default-font">
            {text}
          </span>
        ) : null}
      </div>
    );

    return link ? <Link href={link}>{content}</Link> : content;
  }
);

export const SidebarButton = SidebarButtonRoot;
