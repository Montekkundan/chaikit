"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface EditorTopBarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  heading: string;
}

const EditorTopBarRoot = React.forwardRef<HTMLElement, EditorTopBarRootProps>(
  function EditorTopBarRoot(
    { heading, className, ...otherProps }: EditorTopBarRootProps,
    ref
  ) {
    return (
      <div
        className={cn(
          "z-20 flex w-full items-center gap-2 pr-4 pl-4",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <div className="flex grow shrink-0 basis-0 items-center gap-4">
         <Link href="/"><Icons.logo className="h-6 w-6" /></Link>
         <Badge>BETA</Badge>

        </div>
        <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch">
          {heading}
        </div>
        <div className="flex grow shrink-0 basis-0 items-center justify-end gap-2 self-stretch">
        <ToggleGroup type="single">
            <ToggleGroupItem className="h-6" value="preview">Preview</ToggleGroupItem>
            <ToggleGroupItem className="h-6" value="design">Design</ToggleGroupItem>
          </ToggleGroup>
          <Button className="h-6 m-2">
            Publish
          </Button>
        </div>
      </div>
    );
  }
);

export const EditorTopBar = EditorTopBarRoot;
