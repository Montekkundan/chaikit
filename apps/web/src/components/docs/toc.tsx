"use client";

import * as React from "react";
import { useMounted } from "@/lib/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ExternalLinkIcon } from "lucide-react";


interface Item {
  title: string;
  url: string;
  items?: Item[];
}

interface TableofContents {
  items?: Item[];
}

interface TocProps {
  toc: TableofContents;
  slug: string[]; 
}
export function TableOfContents({ toc, slug }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
          .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
          .flat()
          .filter(Boolean)
          .map((id) => id?.split("#")[1])
        : [],
    [toc]
  );
  const activeHeading = useActiveItem(itemIds as string[]);
  const mounted = useMounted();

  if (!toc?.items || !mounted) {
    return null;
  }

  const metadata = {
    links: [
      {
        label: "Edit this page on GitHub",
        href: `https://github.com/chaikitxyz/chaikit/tree/docs/apps/web/content/${slug.join('/')}.mdx`,
      },
      {
        label: "Report an issue",
        href: "https://github.com/chaikitxyz/chaikit/issues/new"
      },
    ],
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading ?? undefined} />
      <hr className="pt-4" />
      {metadata.links.map((link, index) => (
        <Button
          key={index}
          href={link.href}
          suffix={<ExternalLinkIcon />}
          size="sm"
          className="h-6 text-xs w-full font-semibold [&_svg]:size-3"
          target="_blank"
        >
          {link.label}
        </Button>
      ))}
    </div>
  );
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds?.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableofContents;
  level?: number;
  activeItem?: string;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn("m-0 list-none pb-4", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={cn("mt-0 pt-2")}>
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline transition-colors hover:text-fg",
                item.url === `#${activeItem}` ? "font-medium text-fg" : "text-fg-muted"
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}