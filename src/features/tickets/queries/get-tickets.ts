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
      ...(typeof searchParams.search === "string" && {
        title: {
          contains: searchParams.search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      ...(searchParams.sort === undefined && { createdAt: "desc" }),
      ...(searchParams.sort === "bounty" && { bounty: "desc" }),
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
