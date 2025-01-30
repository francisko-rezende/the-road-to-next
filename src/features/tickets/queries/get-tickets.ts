import { prisma } from "@/lib/prisma";

type GetTicketsArgs = {
  userId?: string;
};

export const getTickets = async ({ userId }: GetTicketsArgs) => {
  return await prisma.ticket.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
