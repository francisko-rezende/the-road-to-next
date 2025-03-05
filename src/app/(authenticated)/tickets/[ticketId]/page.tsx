import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breacrumbs";
import { Separator } from "@/components/ui/separator";
import { Comments } from "@/features/comments/components/comments";
import { getComments } from "@/features/comments/queries/get-comments";
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
          { title: "Tickets", href: ticketsPath() },
          { title: ticket.title },
        ]}
      />
      <Separator />
      <div className="flex animate-fade-in-from-top justify-center">
        <TicketItem
          ticket={ticket}
          isDetail
          comments={<Comments ticketId={ticket.id} comments={comments} />}
        />
      </div>
    </div>
  );
};

export default TicketPage;
