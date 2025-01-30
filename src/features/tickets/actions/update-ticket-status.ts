"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

type UpdateTicketStatusProps = {
  ticketId: string;
  ticketStatus: TicketStatus;
};

export const updateTicketStatus = async ({
  ticketId,
  ticketStatus,
}: UpdateTicketStatusProps) => {
  const { user } = await getAuthOrRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

    if (!ticket || !isOwner({ authUser: user, entity: ticket })) {
      return toActionState({ status: "ERROR", message: "Not authorized" });
    }

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: ticketStatus },
    });

    revalidatePath(ticketsPath());
  } catch (error) {
    return fromErrorToActionState({ error });
  }

  return toActionState({ status: "SUCCESS", message: "Status updated" });
};
