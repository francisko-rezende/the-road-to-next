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
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

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
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    await prisma.ticket.upsert({
      where: { id: ticketId || "" },
      update: data,
      create: data,
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
