import { getTickets } from "@/features/tickets/queries/get-tickets";

export async function GET() {
  const { list, metada } = await getTickets({
    userId: undefined,
    searchParams: {
      search: "",
      size: 5,
      page: 0,
      sortKey: "createdAt",
      sortValue: "desc",
    },
  });
  return Response.json({ list, metada });
}
