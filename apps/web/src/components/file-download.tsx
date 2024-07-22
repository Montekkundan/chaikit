import { ReactNode } from "react";
import { Download } from "lucide-react";
import { Button } from "./ui/button";

export default function FileDownload({
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
      <Download className="size-4" />
    </Button>
  );
}