"use client";
import { useActionState } from "react";
import { Form } from "@/components/form";
import { FieldError } from "@/components/form/field-error";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_FROM_ERROR_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "../actions/sign-up";

export const SignUpForm = () => {
  const [actionState, action] = useActionState(
    signUp,
    EMPTY_FROM_ERROR_ACTION_STATE,
  );
  return (
    <Form action={action} actionState={actionState}>
      <Input name="username" placeholder="username" />
      <FieldError actionState={actionState} name="username" />

      <Input name="email" placeholder="Email" />
      <FieldError actionState={actionState} name="email" />

      <Input name="password" placeholder="Password" type="password" />
      <FieldError actionState={actionState} name="password" />

      <Input
        name="confirmPassword"
        placeholder="Confirm password"
        type="password"
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton>Sign up</SubmitButton>
    </Form>
  );
};
