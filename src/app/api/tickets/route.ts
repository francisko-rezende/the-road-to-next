import { getTickets } from "@/features/tickets/queries/get-tickets";
import { searchParamsCache } from "@/features/tickets/search-params";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const untypedSearchParams = Object.fromEntries(searchParams);

  const typedSearchParams = searchParamsCache.parse(untypedSearchParams);
  console.log(typedSearchParams);

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
