"use client";

import { Ticket } from "@prisma/client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { useActionFeedback } from "@/components/form/hooks/useActionFeedback";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_FROM_ERROR_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/tickets/actions/upsert-ticket";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

export const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_FROM_ERROR_ACTION_STATE,
  );

  useActionFeedback({
    actionState,
    onSuccess: ({ onArgs: actionState }) => console.log(actionState.message),
    onError: ({ onArgs: actionState }) => console.log(actionState.message),
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldError>{actionState.fieldErrors?.title?.[0]}</FieldError>

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />

      <FieldError>{actionState.fieldErrors?.content?.[0]}</FieldError>
      <SubmitButton>{ticket ? "Edit" : "Create"}</SubmitButton>
    </form>
  );
};
