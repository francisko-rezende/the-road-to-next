import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { TicketItem } from "@/features/tickets/components/ticket-item";
import { getTicket } from "@/features/tickets/queries/get-ticket";
import { ticketsPath } from "@/paths";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = await getTicket(ticketId);

  if (!ticket) {
    return (
      <Placeholder
        label="Ticket not found"
        button={
          <Button asChild variant={"outline"}>
            <Link href={ticketsPath()}>Go to tickets</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex animate-fade-in-from-top justify-center">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
};

export default TicketPage;
