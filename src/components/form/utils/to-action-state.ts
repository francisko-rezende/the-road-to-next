import { ZodError } from "zod";

type FromErrorToActionStateProps = {
  error: unknown;
  formData?: FormData;
};

export type FromErrorToActionStateReturn = {
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
};

export const fromErrorToActionState = ({
  error,
  formData,
}: FromErrorToActionStateProps): FromErrorToActionStateReturn => {
  if (error instanceof ZodError) {
    return {
      message: error.errors[0].message,
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
    };
  }

  return {
    message: "An unknown error occured.",
    fieldErrors: {},
    payload: formData,
  };
};
