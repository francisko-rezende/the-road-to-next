"use client";
import { Ticket, TicketStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
// import { ComponentProps } from "react";
import { toast } from "sonner";
// import { ConfirmDialog } from "@/components/confirm-dialog";
import { useConfirmDialog } from "@/components/confirm-dialog/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTicket } from "../../actions/delete-ticket";
import { updateTicketStatus } from "../../actions/update-ticket-status";
import { TICKET_LABELS } from "../../constants";
// import { TicketId } from "../../types";
//
// const DeleteButton = () => {
//   return (
//     <DropdownMenuItem>
//       <LucideTrash className="mr-2 h-4 w-4" />
//       <span>Delete</span>
//     </DropdownMenuItem>
//   );
// };

// type DeleteButtonProps = ComponentProps<typeof Button> & {
//   ticketId: TicketId;
// };
//
// const DeleteButton = ({ ticketId, ...props }: DeleteButtonProps) => {
//
//   return (
//     <ConfirmDialog
//       action={deleteTicket.bind(null, ticketId)}
//       trigger={
//         <DropdownMenuItem>
//           <Button variant="outline" size="icon" {...props}>
//             <LucideTrash className="h-4 w-4" />
//
//             <span>Delete</span>
//           </Button>
//         </DropdownMenuItem>
//       }
//     ></ConfirmDialog>
//   );
// };

type TicketStatusRadioGroupItemsProps = {
  ticket: Ticket;
};

const TicketStatusRadioGroupItems = ({
  ticket,
}: TicketStatusRadioGroupItemsProps) => {
  const handleUpdateTicketStatus = async (value: string) => {
    const promise = updateTicketStatus({
      id: ticket.id,
      ticketStatus: value as TicketStatus,
    });

    toast.promise(promise, {
      loading: "Updating status...",
    });

    const result = await promise;

    if (result.status === "ERROR") {
      toast.error(result.message);
      return;
    }

    if (result.status === "SUCCESS") {
      toast.success(result.status);
    }
  };
  return (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateTicketStatus}
    >
      {(Object.keys(TICKET_LABELS) as Array<TicketStatus>).map((key) => {
        return (
          <DropdownMenuRadioItem value={key} key={key}>
            {TICKET_LABELS[key]}
          </DropdownMenuRadioItem>
        );
      })}
    </DropdownMenuRadioGroup>
  );
};

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

export const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <Button variant="outline">
          <LucideTrash className="h-4 w-4" />
          <span>Delete</span>
        </Button>
      </DropdownMenuItem>
    ),
  });

  return (
    <>
      {deleteDialog}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          <TicketStatusRadioGroupItems ticket={ticket} />
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
