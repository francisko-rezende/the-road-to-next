import { getTicket } from "@/features/tickets/queries/get-ticket";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ticketID: string }> },
) {
  const { ticketID } = await params;
  const ticket = await getTicket(ticketID);

  return Response.json(ticket);
}
