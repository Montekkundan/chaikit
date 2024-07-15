import Link from "next/link";
import { Icons } from "./icons";

export function SiteHeader() {
    return (
        <>
            <header className="container flex gap-4px-6 pt-6 text-sm">
                <Link href="/" className="flex gap-1 items-center">
                    <Icons.logo className="h-8 w-8" /> Chaikit
                </Link>
            </header>
        </>
    );
}
