import Link from "next/link";
import { Icons } from "./icons";
import { UserButton } from "./auth/user-button";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { LoginButton } from "./auth/login-button";

export function SiteHeader() {
    const user = useCurrentUser();
    return (
        <>
            <header className="container flex justify-between gap-4px-6 pt-6 text-sm">
                <Link href="/" className="flex gap-1 items-center">
                    <Icons.logo className="h-8 w-8" /> Chaikit
                </Link>
                {user ? <UserButton /> : <LoginButton >
                    Sign in
                </LoginButton>}
            </header>
        </>
    ); 
}
