import { LucideBook, LucideCircleUser, LucideLibrary } from "lucide-react";
import {
  accountPasswordPath,
  accountProfilePath,
  homePath,
  ticketsPath,
} from "@/paths";
import { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    title: "All tickets",
    href: homePath(),
    icon: <LucideLibrary />,
    matching: [homePath()],
  },
  {
    title: "My tickets",
    href: ticketsPath(),
    icon: <LucideBook />,
    matching: [ticketsPath()],
  },
  {
    separator: true,
    title: "Account",
    href: accountProfilePath(),
    icon: <LucideCircleUser />,
    matching: [accountPasswordPath(), accountProfilePath()],
  },
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
