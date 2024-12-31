"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const updateTicket = async (ticketId: string, formData: FormData) => {
  const data = {
    id: ticketId,
    title: formData.get("title"),
    content: formData.get("content"),
  };

  await prisma.ticket.update({
    where: { id: data.id as string },
    data: { title: data.title as string, content: data.content as string },
  });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
