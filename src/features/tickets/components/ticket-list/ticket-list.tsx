import { SearchInput } from "@/components/search-input/search-input";
import { Input } from "@/components/ui/input";
import { getTickets } from "@/features/tickets/queries/get-tickets";
import { TicketItem } from "../ticket-item";

type TicketListProps = {
  userId?: string;
};

export const TicketList = async ({ userId }: TicketListProps) => {
  const tickets = await getTickets({ userId });
  return (
    <div className="flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4">
      <div className="w-full max-w-[420px]">
        <SearchInput placeholder="Search tickets..." />
      </div>
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};
