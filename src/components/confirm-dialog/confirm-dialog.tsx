import { cloneElement, useState } from "react";
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
import { Button } from "../ui/button";

type UseConfirmDialogProps = {
  title?: string;
  description?: string;
  action: () => Promise<FormData>;
  trigger: React.ReactElement;
};
export const useConfirmDialog = ({
  action,
  trigger,
  description = "This action cannot be undone. Make sure you understand the consequences.",
  title = "Are you absolutely sure?",
}: UseConfirmDialogProps) => {
  const [open, setOpen] = useState(false);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setOpen((previous) => !previous),
  });

  const dialog = (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={action}>
              <Button type="submit">Confirm</Button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog];
};
