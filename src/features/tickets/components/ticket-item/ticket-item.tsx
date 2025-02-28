import { Prisma } from "@prisma/client";
import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { Comments } from "@/features/comments/components/comments";
import { CommentWithMetadata } from "@/features/comments/types/comment-with-metadata";
import { TicketMoreMenu } from "@/features/tickets/components//ticket-more-menu";
import { TICKET_ICONS } from "@/features/tickets/constants";
import { TicketId } from "@/features/tickets/types";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";

type DetailButtonProps = {
  ticketId: TicketId;
};

const DetailButton = ({ ticketId }: DetailButtonProps) => {
  return (
    <Button variant={"outline"} size={"icon"} asChild>
      <Link prefetch href={ticketPath(ticketId)}>
        <LucideSquareArrowUpRight />
      </Link>
    </Button>
  );
};

type EditButtonProps = {
  ticketId: TicketId;
};

const EditButton = ({ ticketId }: EditButtonProps) => {
  return (
    <Button variant={"outline"} size={"icon"} asChild>
      <Link prefetch href={ticketEditPath(ticketId)}>
        <LucidePencil />
      </Link>
    </Button>
  );
};

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true;
        };
      };
    };
  }>;
  isDetail?: boolean;
  comments?: CommentWithMetadata[];
};

export const TicketItem = async ({
  ticket,
  isDetail,
  comments,
}: TicketItemProps) => {
  const { user } = await getAuth();

  const isTicketOwner = isOwner({ authUser: user, entity: ticket });

  return (
    <div
      className={clsx("flex w-full flex-col gap-4", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-x-2">
              <span>{TICKET_ICONS[ticket.status]}</span>
              <span className="truncate text-lg font-semibold">
                {ticket.title}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p
              className={clsx("whitespace-break-spaces", {
                "line-clamp-3": !isDetail,
              })}
            >
              {ticket.content}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>{isTicketOwner && <EditButton ticketId={ticket.id} />}</>
          ) : (
            <>
              <DetailButton ticketId={ticket.id} />
              {isTicketOwner && <EditButton ticketId={ticket.id} />}
            </>
          )}
          {isTicketOwner && (
            <TicketMoreMenu
              ticket={ticket}
              trigger={
                <Button variant="outline" size="icon">
                  <LucideMoreVertical className="h-4 w-4" />
                </Button>
              }
            />
          )}
        </div>
      </div>
      {isDetail ? <Comments comments={comments} ticketId={ticket.id} /> : null}
    </div>
  );
};
