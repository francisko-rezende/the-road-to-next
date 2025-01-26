import { ComponentProps } from "react";
import { FromErrorToActionStateReturn } from "../utils/to-action-state";

type FieldErrorProps = ComponentProps<"span"> & {
  actionState: FromErrorToActionStateReturn;
  name: string;
};

export const FieldError = ({
  actionState,
  name,
  ...props
}: FieldErrorProps) => {
  const message = actionState.fieldErrors[name]?.[0];

  if (!message) return null;

  return (
    <span className="text-xs text-red-500" {...props}>
      {message}
    </span>
  );
};
