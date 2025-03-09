"use server";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string, cursor?: number) => {
  const take = 2;
  const where = {
    ticketId,
    createdAt: {
      lt: cursor ? new Date(cursor) : new Date(),
    },
  };

  const { user } = await getAuth();
  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      take,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  return {
    list: comments.map((comment) => {
      return {
        ...comment,
        isOwner: isOwner({ authUser: user, entity: comment }),
      };
    }),
    metadata: {
      count,
      hasNextPage: true, //todo
      cursor: comments.at(-1)?.createdAt.valueOf(),
    },
  };
};
