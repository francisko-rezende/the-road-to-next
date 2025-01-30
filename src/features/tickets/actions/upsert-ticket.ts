"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToActionState,
  FromErrorToActionStateReturn,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuth } from "@/features/auth/actions/get-auth";
import { prisma } from "@/lib/prisma";
import { signInPath, ticketPath, ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1024),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Is required"),
  bounty: z.coerce.number().positive(),
});

export const upsertTicket = async (
  ticketId: string | undefined,
  _actionState: FromErrorToActionStateReturn,
  formData: FormData,
) => {
  const { user } = await getAuth();

  if (!user) {
    redirect(signInPath());
  }
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const dbData = { ...data, userId: user.id, bounty: toCent(data.bounty) };

    await prisma.ticket.upsert({
      where: { id: ticketId || "" },
      update: dbData,
      create: dbData,
    });
  } catch (error) {
    return fromErrorToActionState({ error, formData });
  }

  revalidatePath(ticketsPath());

  if (ticketId) {
    await setCookieByKey({ key: "toast", value: "Ticket updated" });
    redirect(ticketPath(ticketId));
  }

  return toActionState({ message: "Ticket created!", status: "SUCCESS" });
};
