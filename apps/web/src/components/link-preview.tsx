import { ReactNode } from "react";
import { ExternalLinkIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Linkpreview({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Button
      href={href}
      target="_blank"
    >
      {children}
      <ExternalLinkIcon className="size-4" />
    </Button>
  );
}