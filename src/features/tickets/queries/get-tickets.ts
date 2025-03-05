import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

type GetTicketsArgs = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

export const getTickets = async ({ userId, searchParams }: GetTicketsArgs) => {
  const { user } = await getAuth();

  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  const skip = searchParams.page * searchParams.size;
  const take = searchParams.size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
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
    }),
    prisma.ticket.count({ where }),
  ]);

  const ticketList = tickets.map((ticket) => {
    return {
      ...ticket,
      isOwner: isOwner({ authUser: user, entity: ticket }),
    };
  });
  return {
    list: ticketList,
    metada: { count, hasNextPage: count > skip + take },
  };
};
