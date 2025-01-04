import { ComponentProps } from "react";

type FieldErrorProps = ComponentProps<"span">;
export const FieldError = (props: FieldErrorProps) => {
  return <span className="text-xs text-red-500" {...props} />;
};
