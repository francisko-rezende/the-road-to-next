import { ComponentProps } from "react";
import { toast } from "sonner";
import { useActionFeedback } from "@/components/form/hooks/useActionFeedback";
import { FromErrorToActionStateReturn } from "./utils/to-action-state";

type FormProps = ComponentProps<"form"> & {
  actionState: FromErrorToActionStateReturn;
  onSuccess?: (actionState: FromErrorToActionStateReturn) => void;
  onError?: (actionState: FromErrorToActionStateReturn) => void;
};

export const Form = ({
  actionState,
  onSuccess,
  onError,
  ...props
}: FormProps) => {
  useActionFeedback({
    actionState: actionState,
    onSuccess: ({ onArgs: actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }

      onSuccess?.(actionState);
    },
    onError: ({ onArgs: actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }

      onError?.(actionState);
    },
  });

  return <form {...props} className="flex flex-col gap-y-2" />;
};
