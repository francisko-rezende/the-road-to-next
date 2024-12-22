import { Heading } from "@/components/heading/heading";
import { TicketItem } from "@/features/tickets/components/ticket-item";
import { getTickets } from "@/features/tickets/queries/get-tickets";

const TicketsPage = async () => {
  const tickets = await getTickets();

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets in one place" />
      <div className="flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4">
        {tickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
