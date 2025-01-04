import { useEffect } from "react";
import { FromErrorToActionStateReturn } from "@/components/form/utils/to-action-state";

type OnArgs = {
  onArgs: FromErrorToActionStateReturn;
};

type UseActionFeedbackProps = {
  actionState: FromErrorToActionStateReturn;
  onSuccess?: ({ onArgs }: OnArgs) => void;
  onError?: ({ onArgs }: OnArgs) => void;
};

export const useActionFeedback = ({
  actionState,
  ...handlers
}: UseActionFeedbackProps) => {
  useEffect(() => {
    if (actionState.status === "SUCCESS") {
      handlers.onSuccess?.({ onArgs: actionState });
    }

    if (actionState.status === "ERROR") {
      handlers.onError?.({ onArgs: actionState });
    }
  }, [actionState, handlers]);
};
