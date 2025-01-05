import { useEffect, useRef } from "react";
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
  const prevTimeStamp = useRef(actionState.timeStamp);
  const isUpdate = prevTimeStamp.current !== actionState.timeStamp;
  useEffect(() => {
    if (!isUpdate) return;

    if (actionState.status === "SUCCESS") {
      handlers.onSuccess?.({ onArgs: actionState });
    }

    if (actionState.status === "ERROR") {
      handlers.onError?.({ onArgs: actionState });
    }

    prevTimeStamp.current = actionState.timeStamp;
  }, [actionState, handlers, isUpdate]);
};
