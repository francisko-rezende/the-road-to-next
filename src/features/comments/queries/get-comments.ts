import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string) => {
  console.log("comments");

  await new Promise((resolve) => {
    return setTimeout(resolve, 2000);
  });

  const comments = await prisma.comment.findMany({
    where: {
      ticketId,
    },
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
  });

  return comments;
};
