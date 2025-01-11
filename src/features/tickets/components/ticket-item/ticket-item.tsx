import { Ticket } from "@prisma/client";
import clsx from "clsx";
import {
  LucidePencil,
  LucideSquareArrowUpRight,
  LucideTrash,
} from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteTicket } from "@/features/tickets/actions/delete-ticket";
import { TICKET_ICONS } from "@/features/tickets/constants";
import { TicketId } from "@/features/tickets/types";
import { ticketEditPath, ticketPath } from "@/paths";

type DeleteButtonProps = ComponentProps<typeof Button> & {
  ticketId: TicketId;
};

const DeleteButton = ({ ticketId, ...props }: DeleteButtonProps) => {
  return (
    <form action={deleteTicket.bind(null, ticketId)}>
      <Button variant="outline" size="icon" {...props}>
        <LucideTrash className="h-4 w-4" />
      </Button>
    </form>
  );
};

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
  ticket: Ticket;
  isDetail?: boolean;
};

export const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  return (
    <div
      className={clsx("flex w-full gap-x-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
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
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">{ticket.bounty}</p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <DeleteButton ticketId={ticket.id} />
        ) : (
          <>
            <DetailButton ticketId={ticket.id} />
            <EditButton ticketId={ticket.id} />
          </>
        )}
      </div>
    </div>
  );
};
