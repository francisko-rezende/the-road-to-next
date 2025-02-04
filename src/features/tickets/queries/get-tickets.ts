import { prisma } from "@/lib/prisma";
import { SearchParams } from "../search-params";

type GetTicketsArgs = {
  userId?: string;
  searchParams: SearchParams;
};

export const getTickets = async ({ userId, searchParams }: GetTicketsArgs) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
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
