import { cloneElement, useActionState, useState } from "react";
import { Form } from "../form";
import { SubmitButton } from "../form/submit-button";
import {
  EMPTY_FROM_ERROR_ACTION_STATE,
  FromErrorToActionStateReturn,
} from "../form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

type UseConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<FromErrorToActionStateReturn>;
  trigger: React.ReactElement;
};
export const useConfirmDialog = ({
  action,
  trigger,
  description = "This action cannot be undone. Make sure you understand the consequences.",
  title = "Are you absolutely sure?",
}: UseConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => {
      setIsOpen((previous) => !previous);
    },
  });

  const [actionState, formAction] = useActionState(
    action,
    EMPTY_FROM_ERROR_ACTION_STATE,
  );

  const handleSuccess = () => {
    setIsOpen((previousState) => !previousState);
  };

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form
              onSuccess={handleSuccess}
              action={formAction}
              actionState={actionState}
            >
              <SubmitButton>Confirm</SubmitButton>
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
};

// import { cloneElement, useActionState, useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Form } from "../form";
// import { SubmitButton } from "../form/submit-button";
// import {
//   EMPTY_FROM_ERROR_ACTION_STATE,
//   FromErrorToActionStateReturn,
// } from "../form/utils/to-action-state";
//
// type UseConfirmDialogArgs = {
//   title?: string;
//   description?: string;
//   action: () => Promise<FromErrorToActionStateReturn>;
//   trigger: React.ReactElement;
// };

// const useConfirmDialog = ({
//   title = "Are you absolutely sure?",
//   description = "This action cannot be undone. Make sure you understand the consequences.",
//   action,
//   trigger,
// }: UseConfirmDialogArgs) => {
//   const [isOpen, setIsOpen] = useState(false);
//
//   const dialogTrigger = cloneElement(trigger, {
//     onClick: () => setIsOpen((state) => !state),
//   });
//
//   const [actionState, formAction] = useActionState(
//     action,
//     EMPTY_FROM_ERROR_ACTION_STATE,
//   );
//
//   const handleSuccess = () => {
//     setIsOpen(false);
//   };
//
//   const dialog = (
//     <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>{title}</AlertDialogTitle>
//           <AlertDialogDescription>{description}</AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction asChild>
//             <Form
//               onSuccess={handleSuccess}
//               action={formAction}
//               actionState={actionState}
//             >
//               <SubmitButton>Confirm</SubmitButton>
//             </Form>
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
//
//   return [dialogTrigger, dialog] as const;
// };
//
// export { useConfirmDialog };
