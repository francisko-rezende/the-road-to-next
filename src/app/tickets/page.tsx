import { Suspense } from "react";
import { Heading } from "@/components/heading/heading";
import { TicketList } from "@/features/tickets/components/ticket-list/ticket-list";

const TicketsPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets in one place" />
      <Suspense>
        <TicketList />
      </Suspense>
    </div>
  );
};

export default TicketsPage;
