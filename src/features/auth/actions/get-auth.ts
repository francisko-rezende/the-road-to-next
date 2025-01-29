"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { validateSessionToken } from "@/lib/lucia";

export const getAuth = cache(async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value ?? null;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  return await validateSessionToken(sessionId);
});
