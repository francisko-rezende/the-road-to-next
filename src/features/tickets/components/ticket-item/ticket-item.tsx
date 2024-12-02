import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TICKET_ICONS } from "@/features/tickets/constants";
import { type Ticket } from "@/features/tickets/types";
import { ticketPath } from "@/paths";

type TicketItemProps = {
  ticket: Ticket;
};

export const TicketItem = ({ ticket }: TicketItemProps) => {
  return (
    <Card className="w-full max-w-[420px]">
      <CardHeader>
        <CardTitle>
          <span>{TICKET_ICONS[ticket.status]}</span>
          <span className="truncate text-lg font-semibold">{ticket.title}</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-3 whitespace-break-spaces">{ticket.content}</p>
      </CardContent>

      <CardFooter>
        <Link href={ticketPath(ticket.id)} className="text-sm underline">
          View
        </Link>
      </CardFooter>
    </Card>
  );
};
