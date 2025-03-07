"use client";
import { useActionState } from "react";
import { Form } from "@/components/form";
import { FieldError } from "@/components/form/field-error";
import { SubmitButton } from "@/components/form/submit-button";
import {
  EMPTY_FROM_ERROR_ACTION_STATE,
  FromErrorToActionStateReturn,
} from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "../../actions/create-comment";
import { CommentWithMetadata } from "../../types/comment-with-metadata";

type CommentCreateProps = {
  ticketId: string;
  onCreateComment?: (comment: CommentWithMetadata | undefined) => void;
};
export const CommentCreateForm = ({
  ticketId,
  onCreateComment,
}: CommentCreateProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    EMPTY_FROM_ERROR_ACTION_STATE,
  );

  const handleSuccess = (
    actionState: FromErrorToActionStateReturn<CommentWithMetadata | undefined>,
  ) => {
    onCreateComment?.(actionState.data);
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea name="content" placeholder="What's on your mind" />
      <FieldError actionState={actionState} name="content" />
      <SubmitButton>Comment</SubmitButton>
    </Form>
  );
};
