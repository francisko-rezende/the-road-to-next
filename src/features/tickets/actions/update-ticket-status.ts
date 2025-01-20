"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

type UpdateTicketStatusProps = {
  id: string;
  ticketStatus: TicketStatus;
};

export const updateTicketStatus = async ({
  id,
  ticketStatus,
}: UpdateTicketStatusProps) => {
  try {
    await prisma.ticket.update({
      where: { id },
      data: { status: ticketStatus },
    });

    revalidatePath(ticketsPath());
  } catch (error) {
    return fromErrorToActionState({ error });
  }

  return toActionState({ status: "SUCCESS", message: "Status updated" });
};
