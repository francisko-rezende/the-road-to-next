"use client";

import { Ticket } from "@prisma/client";
import { useActionState, useRef } from "react";
import { DatePicker } from "@/components/date-picker";
import { ImperativeHandlerFromDatePicker } from "@/components/date-picker/date-picker";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_FROM_ERROR_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "@/features/tickets/actions/upsert-ticket";
import { fromCent } from "@/utils/currency";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};

export const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_FROM_ERROR_ACTION_STATE,
  );

  const datePickerImperativeHandlerRef =
    useRef<ImperativeHandlerFromDatePicker>(null);

  const handleSuccess = () => {
    datePickerImperativeHandlerRef.current?.reset();
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />

      <div className="mb-1 flex gap-x-2">
        <div className="flex-1">
          <Label htmlFor="deadline">Deadline</Label>
          <DatePicker
            key={actionState.timeStamp}
            id="deadline"
            name="deadline"
            imperativeHandleRef={datePickerImperativeHandlerRef}
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
          />
          <FieldError actionState={actionState} name="deadline" />
        </div>
        <div className="flex-1">
          <Label htmlFor="bounty">Bounty</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step="0.01"
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket.bounty) : "")
            }
          />
          <FieldError actionState={actionState} name="deadline" />
        </div>
      </div>

      <SubmitButton>{ticket ? "Edit" : "Create"}</SubmitButton>
    </Form>
  );
};
