import { Placeholder } from "@/components/placeholder";
import { getTickets } from "@/features/tickets/queries/get-tickets";
import { ParsedSearchParams } from "../../search-params";
import { TicketItem } from "../ticket-item";
import { TicketPagination } from "../ticket-pagination";
import { TicketSearchInput } from "../ticket-search-input";
import { TicketSortSelect } from "../ticket-sort-select";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

export const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets({ userId, searchParams });

  return (
    <div className="flex flex-1 animate-fade-in-from-top flex-col items-center gap-y-4">
      <div className="flex w-full max-w-[420px] gap-x-2">
        <TicketSearchInput placeholder="Search tickets..." />
        <TicketSortSelect
          options={[
            { sortKey: "createdAt", sortValue: "desc", label: "Newest" },
            { sortKey: "bounty", sortValue: "desc", label: "Bounty" },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}

      <div className="w-full max-w-[420px] gap-x-2">
        <TicketPagination />
      </div>
    </div>
  );
};
