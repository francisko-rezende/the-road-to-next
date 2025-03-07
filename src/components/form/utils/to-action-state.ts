import { ZodError } from "zod";

type FromErrorToActionStateProps = {
  error: unknown;
  formData?: FormData;
};

export type FromErrorToActionStateReturn<T = any> = {
  timeStamp: number;
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
  data?: T;
};

export const EMPTY_FROM_ERROR_ACTION_STATE: FromErrorToActionStateReturn = {
  timeStamp: Date.now(),
  message: "",
  fieldErrors: {},
};

export const toActionState = ({
  message,
  status,
  payload,
  data,
}: {
  message: string;
  status: FromErrorToActionStateReturn["status"];
  payload?: FormData;
  data?: unknown;
}): FromErrorToActionStateReturn => ({
  message,
  fieldErrors: {},
  status,
  payload,
  timeStamp: Date.now(),
  data,
});

export const fromErrorToActionState = ({
  error,
  formData,
}: FromErrorToActionStateProps): FromErrorToActionStateReturn => {
  if (error instanceof ZodError) {
    return {
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      status: "ERROR",
      timeStamp: Date.now(),
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
      status: "ERROR",
      timeStamp: Date.now(),
    };
  }

  return {
    message: "An unknown error occured.",
    fieldErrors: {},
    payload: formData,
    status: "ERROR",
    timeStamp: Date.now(),
  };
};
