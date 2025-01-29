"use server";

import { verify } from "@node-rs/argon2";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  fromErrorToActionState,
  FromErrorToActionStateReturn,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { createSession, generateSessionToken } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { setSessionTokenCookie } from "@/utils/cookies";

const signInSchema = z.object({
  email: z.string().min(1).max(191).email(),
  password: z.string().min(1).max(191),
});

export const signIn = async (
  _actionState: FromErrorToActionStateReturn,
  formData: FormData,
) => {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData),
    );
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return toActionState({
        message: "Incorrect email or password",
        status: "ERROR",
        payload: formData,
      });
    }
    const validPassword = await verify(user.passwordHash, password);

    if (!validPassword) {
      return toActionState({
        message: "Incorrect email or password",
        status: "ERROR",
        payload: formData,
      });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState({ error, formData });
  }

  redirect(ticketsPath());
};
