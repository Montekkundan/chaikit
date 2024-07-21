"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Icons } from "@/components/icons";
import { useScrolled } from "@/lib/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { focusRing } from "@/lib/utils/styles";
import { Button } from "../ui/button";
import { Dialog, DialogRoot } from "../ui/dialog";
import { siteConfig } from "@/config/site";
import { Badge } from "../ui/badge";
import { SearchDocs } from "./search-docs";

const config = siteConfig.header;

export const Header = () => {
    const { scrolled } = useScrolled({ initial: false });

    return (
        <header
            className={cn(
                "sticky top-0 z-50 flex h-14 rounded-md max-md:border-b max-md:bg-bg md:h-16",
                scrolled && "pointer-events-none"
            )}
        >
            <div className="z-50 container flex h-full max-w-screen-2xl items-center">
                {/* Desktop Nav */}
                <div className="hidden w-full items-center justify-between md:flex">
                    <div className="w-[130px]">
                        <Link
                            href="/"
                            className={cn(
                                focusRing(),
                                "flex items-center space-x-2 rounded opacity-100 transition-[opacity,transform] duration-300 ease-out",
                                scrolled && "pointer-events-none -translate-x-2 opacity-0"
                            )}
                            aria-hidden={scrolled}
                        >

                            <div className="mt-1 font-josephin whitespace-nowrap font-bold leading-normal tracking-tighter">
                            <Icons.logo className="h-6 w-6" />
                            </div>
                            <Badge className="border">
                                beta
                            </Badge>
                        </Link>
                    </div>
                    <div
                        className={cn(
                            "relative flex items-center gap-6 overflow-hidden rounded-md bg-transparent px-4 py-1 transition-[padding,background-color] duration-300 ease-out",
                            scrolled && "pointer-events-auto bg-bg-muted shadow-md"
                        )}
                    >
                        {/* <Link
                            href="/"
                            className={cn(
                                focusRing(),
                                "pointer-events-none absolute -translate-x-14 rounded opacity-0 transition-[opacity,transform] duration-300 ease-out",
                                scrolled && "-translate-x-10 opacity-100"
                            )}
                            aria-hidden={!scrolled}
                            tabIndex={scrolled ? undefined : -1}
                        >
                            any other link
                        </Link> */}
                        <Nav items={config.nav.links} />
                    </div>
                    <div
                        className={cn(
                            "flex w-[130px] items-center justify-end space-x-2 opacity-100 transition-[opacity,transform] duration-300 ease-out",
                            scrolled && "pointer-events-none translate-x-2 opacity-0"
                        )}
                        aria-hidden={scrolled}
                        tabIndex={scrolled ? -1 : undefined}
                    >
                        <Button
                            href={siteConfig.links.github}
                            target="_blank"
                            size="sm"
                            shape="square"
                            aria-label="github"
                        >
                            <Icons.GitHubIcon />
                        </Button>
                        <Button
                            href={siteConfig.links.twitter}
                            target="_blank"
                            size="sm"
                            shape="square"
                            aria-label="twitter"
                        >
                            <Icons.TwitterIcon />
                        </Button>
                    </div>
                </div>
                {/* Mobile nav */}
                <div className="flex w-full items-center gap-4 md:hidden">
                    <Link
                        href="/"
                        className={cn(
                            focusRing(),
                            "flex items-center space-x-2 rounded transition-opacity hover:opacity-80"
                        )}
                    >
                        <div className="mt-1 font-josephin font-bold leading-normal tracking-tighter">
                        <Icons.logo className="h-6 w-6" />
                        </div>

                    </Link>
                    <SearchDocs className="flex-1 mx-6" size="sm">
                        <span className="mr-4 flex-1 text-left">Search...</span>
                    </SearchDocs>
                    <DialogRoot>
                        <Button size="sm" shape="square" aria-label="Open menu">
                            <MenuIcon />
                        </Button>
                        <Dialog type="drawer">
                            {({ close }) => (
                                <Nav
                                    direction="col"
                                    items={[{ label: "Home", href: "/" }, ...config.nav.links]}
                                    onNavItemClick={close}
                                />
                            )}
                        </Dialog>
                    </DialogRoot>
                </div>
            </div>
        </header>
    );
};

interface NavItem {
    label: string;
    href?: string;
}

interface NavProps {
    items: NavItem[];
    direction?: "col" | "row";
    onNavItemClick?: () => void;
}

const Nav = (props: NavProps) => {
    const { items, direction = "row", onNavItemClick } = props;
    const pathname = usePathname();

    return (
        <nav
            className={cn("flex items-center gap-0 sm:gap-2", {
                "flex-col gap-2": direction === "col",
            })}
        >
            {items.map(
                (item, index) =>
                    item.href && (
                        <Link
                            key={index}
                            className={cn(
                                focusRing(),
                                "flex items-center justify-center gap-2 rounded px-4 py-1 text-sm font-medium text-fg/60 transition-colors hover:text-fg",
                                pathname.startsWith(item.href) && item.href !== "/" && "bg-bg-inverse/10 text-fg",
                                direction === "col" && "text-md w-full py-2"
                            )}
                            href={item.href}
                            onClick={onNavItemClick}
                        >
                            <span>{item.label}</span>
                        </Link>
                    )
            )}
        </nav>
    );
};