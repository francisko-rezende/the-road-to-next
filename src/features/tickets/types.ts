import { Prisma } from "@prisma/client";

export type TicketId = string;

export type TicketWithMetadata = Prisma.TicketGetPayload<{
  include: {
    user: {
      select: {
        username: true;
      };
    };
  };
}> & { isOwner: boolean };
