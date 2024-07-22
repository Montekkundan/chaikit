import { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";

export default function Linkpreview({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      className={cn(
        buttonStyles({
          variant: "outline",
        }),
        "not-prose group relative w-full gap-2",
      )}
      href={href}
      target="_blank"
    >
      {children}
      <ExternalLinkIcon className="size-4" />
    </Link>
  );
}