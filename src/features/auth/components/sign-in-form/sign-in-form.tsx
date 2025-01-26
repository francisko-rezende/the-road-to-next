"use client";
import { useActionState } from "react";
import { Form } from "@/components/form";
import { FieldError } from "@/components/form/field-error";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_FROM_ERROR_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signIn } from "../../actions/sign-in";

export const SignInForm = () => {
  const [actionState, action] = useActionState(
    signIn,
    EMPTY_FROM_ERROR_ACTION_STATE,
  );
  return (
    <Form actionState={actionState} action={action}>
      <Input name="email" placeholder="Email" />
      <FieldError actionState={actionState} name="email" />

      <Input name="password" placeholder="Password" />
      <FieldError actionState={actionState} name="password" />

      <SubmitButton>Sign In</SubmitButton>
    </Form>
  );
};
