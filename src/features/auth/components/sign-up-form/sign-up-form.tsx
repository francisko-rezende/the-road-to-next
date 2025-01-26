"use client";
import { useActionState } from "react";
import { Form } from "@/components/form";
import { FieldError } from "@/components/form/field-error";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_FROM_ERROR_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "../../actions/sign-up";

export const SignUpForm = () => {
  const [actionState, action] = useActionState(
    signUp,
    EMPTY_FROM_ERROR_ACTION_STATE,
  );
  console.log({ actionState });
  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="username"
        placeholder="username"
        defaultValue={actionState.payload?.get("username") as string}
      />
      <FieldError actionState={actionState} name="username" />

      <Input
        name="email"
        placeholder="Email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError actionState={actionState} name="email" />

      <Input
        name="password"
        placeholder="Password"
        type="password"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError actionState={actionState} name="password" />

      <Input
        name="confirmPassword"
        placeholder="Confirm password"
        type="password"
        defaultValue={actionState.payload?.get("confirmPassword") as string}
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton>Sign up</SubmitButton>
    </Form>
  );
};
