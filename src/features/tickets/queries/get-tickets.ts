import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

type GetTicketsArgs = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

export const getTickets = async ({ userId, searchParams }: GetTicketsArgs) => {
  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const tickets = await prisma.ticket.findMany({
    where,
    skip,
    take,
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

  const count = await prisma.ticket.count({ where });

  return { list: tickets, metada: { count, hasNextPage: count > skip + take } };
};
