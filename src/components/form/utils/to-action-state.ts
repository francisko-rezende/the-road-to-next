import { ZodError } from "zod";

type FromErrorToActionStateProps = {
  error: unknown;
  formData?: FormData;
};

export const fromErrorToActionState = ({
  error,
  formData,
}: FromErrorToActionStateProps) => {
  if (error instanceof ZodError) {
    return {
      message: error.errors[0].message,
      payload: formData,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      payload: formData,
    };
  }

  return {
    message: "An unknown error occured.",
    payload: formData,
  };
};
