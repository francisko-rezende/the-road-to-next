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
import { TicketMoreMenu } from "@/features/tickets/components//ticket-more-menu";
import { TICKET_ICONS } from "@/features/tickets/constants";
import { TicketId, TicketWithMetadata } from "@/features/tickets/types";
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
  ticket: TicketWithMetadata;
  isDetail?: boolean;
  comments?: React.ReactNode;
};

export const TicketItem = ({ ticket, isDetail, comments }: TicketItemProps) => {
  // const { user } = await getAuth();

  // const isTicketOwner = isOwner({ authUser: user, entity: ticket });

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
            <>{ticket.isOwner && <EditButton ticketId={ticket.id} />}</>
          ) : (
            <>
              <DetailButton ticketId={ticket.id} />
              {ticket.isOwner && <EditButton ticketId={ticket.id} />}
            </>
          )}
          {ticket.isOwner && (
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
      {comments}
    </div>
  );
};
