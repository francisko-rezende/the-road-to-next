import { notFound } from "next/navigation";
import { TicketItem } from "@/features/tickets/components/ticket-item";
import { getTicket } from "@/features/tickets/queries/get-ticket";
import { getTickets } from "@/features/tickets/queries/get-tickets";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex animate-fade-in-from-top justify-center">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
};

export async function generateStaticParams() {
  const tickets = await getTickets();

  return tickets.map(({ id }) => ({ ticketId: id }));
}

export default TicketPage;
