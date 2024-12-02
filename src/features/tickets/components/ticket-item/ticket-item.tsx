import { LucideSquareArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/tickets/constants";
import { type Ticket } from "@/features/tickets/types";
import { ticketPath } from "@/paths";

type TicketItemProps = {
  ticket: Ticket;
};

export const TicketItem = ({ ticket }: TicketItemProps) => {
  const detailButton = (
    <Button variant={"outline"} size={"icon"} asChild>
      <Link href={ticketPath(ticket.id)}>
        <LucideSquareArrowUpRight />
      </Link>
    </Button>
  );
  return (
    <div className="flex w-full max-w-[420px] gap-1">
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
          <p className="line-clamp-3 whitespace-break-spaces">
            {ticket.content}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-y-1">{detailButton}</div>
    </div>
  );
};
