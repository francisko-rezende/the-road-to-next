import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breacrumbs";
import { Separator } from "@/components/ui/separator";
import { getComments } from "@/features/comments/queries/get-comments";
import { TicketItem } from "@/features/tickets/components/ticket-item";
import { getTicket } from "@/features/tickets/queries/get-ticket";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;

  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId);
  const [ticket, comments] = await Promise.all([
    ticketPromise,
    commentsPromise,
  ]);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: "/ticket" },
          { title: ticket.title },
        ]}
      />
      <Separator />
      <div className="flex animate-fade-in-from-top justify-center">
        <TicketItem comments={comments} ticket={ticket} isDetail />
      </div>
    </div>
  );
};

export default TicketPage;
