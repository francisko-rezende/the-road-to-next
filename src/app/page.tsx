import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/tickets/components/ticket-list/ticket-list";
import { searchParamsCache } from "@/features/tickets/search-params";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Heading
        title="All tickets"
        description="Ticket by everyone at one place"
      />

      <ErrorBoundary fallback={<Placeholder label="Something went wrong" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList
            searchParams={searchParamsCache.parse(await searchParams)}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
