import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

type GetTicketsArgs = {
  userId?: string;
  searchParams: ParsedSearchParams;
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
      [searchParams.sortKey]: searchParams.sortValue,
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
