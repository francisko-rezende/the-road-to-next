import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Placeholder } from "@/components/placeholder";
import { RedirectToast } from "@/components/redirect-toast/redirect-toast";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/tickets/components/ticket-list/ticket-list";
import { TicketUpsertForm } from "@/features/tickets/components/ticket-upsert-form/ticket-upsert-form";

const TicketsPage = () => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-y-8">
        <Heading title="Tickets" description="All your tickets in one place" />

        <CardCompact
          className="w-full max-w-[420px] self-center"
          title="Create a ticket"
          description="A new ticket will be created"
          content={<TicketUpsertForm />}
        />

        <ErrorBoundary fallback={<Placeholder label="Something went wrong" />}>
          <Suspense fallback={<Spinner />}>
            <TicketList />
          </Suspense>
        </ErrorBoundary>
      </div>
      <RedirectToast />
    </>
  );
};

export default TicketsPage;
