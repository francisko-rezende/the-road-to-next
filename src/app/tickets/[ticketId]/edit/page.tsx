import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { TicketUpdateForm } from "@/features/tickets/components/ticket-update-form";
import { getTicket } from "@/features/tickets/queries/get-ticket";

type TicketEditPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketEditPage = async ({
  params: { ticketId },
}: TicketEditPageProps) => {
  const ticket = await getTicket(ticketId);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="w-full max-w-[420px] animate-fade-in-from-top self-center"
        content={<TicketUpdateForm ticket={ticket} />}
      />
    </div>
  );
};

export default TicketEditPage;
