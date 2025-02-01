import { ReactElement } from "react";

export type NavItem = {
  separator?: boolean;
  title: string;
  href: string;
  icon: ReactElement;
};
