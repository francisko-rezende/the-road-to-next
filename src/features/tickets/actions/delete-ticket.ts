"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

export const deleteTicket = async (ticketId: string) => {
  await prisma.ticket.delete({ where: { id: ticketId } });

  revalidatePath(ticketPath(ticketId));
  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
