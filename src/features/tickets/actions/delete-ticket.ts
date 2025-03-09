"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const deleteTicket = async (ticketId: string) => {
  const { user } = await getAuthOrRedirect();
  try {
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

    if (!ticket || !isOwner({ authUser: user, entity: ticket })) {
      return toActionState({ status: "ERROR", message: "Not authorized" });
    }
    await prisma.ticket.delete({ where: { id: ticketId } });
  } catch (error) {
    return fromErrorToActionState({ error });
  }
  await setCookieByKey({ key: "toast", value: "Ticket deleted!" });
  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
