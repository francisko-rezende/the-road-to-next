"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath } from "@/paths";
import { ThemeSwitcher } from "../../../components/theme/theme-switcher";
import { AccountDropdown } from "../account-dropdown";

export const Header = () => {
  const { user, isFetched } = useAuth();

  const navItems = user ? (
    <AccountDropdown user={user} />
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign in
      </Link>
    </>
  );

  if (!isFetched) {
    return null;
  }

  return (
    <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 flex w-full animate-header-from-top justify-between border-b bg-background/95 px-5 py-2.5 backdrop-blur">
      <div className="flex items-center gap-x-2">
        <Button asChild variant={"ghost"}>
          <Link href={homePath()}>
            <LucideKanban />
            <h1 className="ml-2 text-lg font-semibold">TicketBounty</h1>
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};
