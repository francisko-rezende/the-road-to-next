"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const deleteTicket = async (ticketId: string) => {
  await prisma.ticket.delete({ where: { id: ticketId } });

  await setCookieByKey({ key: "toast", value: "Ticket deleted!" });
  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
