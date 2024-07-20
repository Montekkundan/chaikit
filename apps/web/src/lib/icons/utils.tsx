"use client";

import React from "react";
import { useConfig } from "@/lib/hooks/use-config";
import { icons } from "./registry";

const createIcon = (iconName: keyof typeof icons) => {
  const icon = icons[iconName];
  const Icon = (props: { className?: string }) => {
    const { iconLibrary } = useConfig();

    if (!icon) {
      return null;
    }

    const LibraryIcon = icon[iconLibrary]?.icon as React.ComponentType<{ className?: string }>;

    if (!LibraryIcon) {
      return null;
    }

    return <LibraryIcon {...props} />;
  };
  return Icon;
};

export { createIcon };
