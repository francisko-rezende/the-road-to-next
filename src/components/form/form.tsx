import { ComponentProps } from "react";
import { toast } from "sonner";
import { useActionFeedback } from "@/components/form/hooks/useActionFeedback";
import { FromErrorToActionStateReturn } from "./utils/to-action-state";

type FormProps = ComponentProps<"form"> & {
  actionState: FromErrorToActionStateReturn;
};

export const Form = (props: FormProps) => {
  useActionFeedback({
    actionState: props.actionState,
    onSuccess: ({ onArgs: actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
    },
    onError: ({ onArgs: actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }
    },
  });

  return <form {...props} className="flex flex-col gap-y-2" />;
};
