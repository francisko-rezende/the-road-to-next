"use server";

import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  fromErrorToActionState,
  FromErrorToActionStateReturn,
} from "@/components/form/utils/to-action-state";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine((value) => {
        return value.includes("");
      }, "Username cannot contain spaces"),
    email: z.string().min(1).max(191).email(),
    password: z.string().min(1).max(191),
    confirmPassword: z.string().min(1).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const signUp = async (
  _actionState: FromErrorToActionStateReturn,
  formData: FormData,
) => {
  console.log(formData);
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData),
    );
    const passwordHash = await hash(password);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
      },
    });

    const cookieStore = await cookies();
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    return fromErrorToActionState({ error, formData });
  }

  redirect(ticketsPath());
};
