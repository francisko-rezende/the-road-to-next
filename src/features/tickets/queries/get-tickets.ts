import { prisma } from "@/lib/prisma";
import { Ticket } from "../types";

export const getTickets = async (): Promise<Ticket[]> => {
  return await prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
