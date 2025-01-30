import { ReactNode } from "react";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";

type AuthenticatedLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default async function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  await getAuthOrRedirect();
  return <>{children}</>;
}
