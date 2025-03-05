import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breacrumbs";
import { CardCompact } from "@/components/card-compact";
import { Separator } from "@/components/ui/separator";
import { TicketUpsertForm } from "@/features/tickets/components/ticket-upsert-form/ticket-upsert-form";
import { getTicket } from "@/features/tickets/queries/get-ticket";
import { ticketPath } from "@/paths";

type TicketEditPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketFound = !!ticket;

  if (!isTicketFound || !ticket.isOwner) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: "/ticket" },
          { title: ticket.title, href: ticketPath(ticketId) },
          { title: "Edit" },
        ]}
      />
      <Separator />
      <div className="flex flex-1 flex-col items-center justify-center">
        <CardCompact
          title="Edit Ticket"
          description="Edit an existing ticket"
          className="w-full max-w-[420px] animate-fade-in-from-top self-center"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  );
};

export default TicketEditPage;
