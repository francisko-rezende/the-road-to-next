"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
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
    redirect(ticketPath(ticketId));
  }

  return toActionState({ message: "Ticket created!", status: "SUCCESS" });
};
