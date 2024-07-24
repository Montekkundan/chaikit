"use client";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
};

export const BackButton = ({
  href,
  label,
}: BackButtonProps) => {
  return (
    <Button
      variant="outline"
      className="font-normal w-full"
      size="sm"
      href={href}
    >
        {label}
    </Button>
  );
};