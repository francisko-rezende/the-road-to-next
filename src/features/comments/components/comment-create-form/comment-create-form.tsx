"use client";
import { useActionState } from "react";
import { Form } from "@/components/form";
import { FieldError } from "@/components/form/field-error";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_FROM_ERROR_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../../actions/create-comment";

type CommentCreateProps = {
  ticketId: string;
};
export const CommentCreateForm = ({ ticketId }: CommentCreateProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_FROM_ERROR_ACTION_STATE,
  );

  console.log({ actionState });

  return (
    <Form action={action} actionState={actionState}>
      <Textarea name="content" placeholder="What's on your mind" />
      <FieldError actionState={actionState} name="content" />
      <SubmitButton>Comment</SubmitButton>
    </Form>
  );
};
