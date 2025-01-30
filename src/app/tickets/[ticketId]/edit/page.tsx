import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TicketUpsertForm } from "@/features/tickets/components/ticket-upsert-form/ticket-upsert-form";
import { getTicket } from "@/features/tickets/queries/get-ticket";

type TicketEditPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const { user } = await getAuth();
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner({ authUser: user, entity: ticket });

  // if (!isTicketFound || !isTicketOwner) {
  //   notFound();
  // }

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="w-full max-w-[420px] animate-fade-in-from-top self-center"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
};

export default TicketEditPage;
