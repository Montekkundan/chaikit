"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect",
  asChild?: boolean;
};

export const LoginButton = ({
  children,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };


  return (
    <Button onClick={onClick} className="cursor-pointer">
      {children}
    </Button>
  );
};