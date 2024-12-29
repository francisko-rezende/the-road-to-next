"use client";

import { Ticket } from "@prisma/client";
import clsx from "clsx";
import { LucideSquareArrowUpRight, LucideTrash } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/tickets/constants";
import { TicketId } from "@/features/tickets/types";
import { ticketPath } from "@/paths";
import { deleteTicket } from "../../actions/delete-ticket";

type DeleteButtonProps = ComponentProps<typeof Button> & {
  ticketId: TicketId;
};

const DeleteButton = ({ ticketId, ...props }: DeleteButtonProps) => {
  const handleDeleteTicket = () => deleteTicket(ticketId);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleDeleteTicket}
      {...props}
    >
      <LucideTrash className="h-4 w-4" />
    </Button>
  );
};

type DetailButtonProps = {
  ticketId: TicketId;
};

const DetailButton = ({ ticketId }: DetailButtonProps) => {
  return (
    <Button variant={"outline"} size={"icon"} asChild>
      <Link href={ticketPath(ticketId)}>
        <LucideSquareArrowUpRight />
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
      </Card>

      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <DeleteButton ticketId={ticket.id} />
        ) : (
          <DetailButton ticketId={ticket.id} />
        )}
      </div>
    </div>
  );
};
