"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { accountPasswordPath, accountProfilePath } from "@/paths";

export const AccountTabs = () => {
  const pathName = usePathname();
  const tabsValue = pathName.split("/").at(-1);

  return (
    <Tabs value={tabsValue}>
      <TabsList>
        <TabsTrigger asChild value="profile">
          <Link href={accountProfilePath()}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger asChild value="password">
          <Link href={accountPasswordPath()}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
