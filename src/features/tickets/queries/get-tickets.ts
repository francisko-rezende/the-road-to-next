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
      ...(searchParams.sort === "newest" && { createdAt: "desc" }),
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
