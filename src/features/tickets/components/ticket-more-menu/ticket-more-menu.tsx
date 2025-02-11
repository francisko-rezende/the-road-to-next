"use client";
import { Ticket, TicketStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/confirm-dialog/confirm-dialog";
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

type TicketStatusRadioGroupItemsProps = {
  ticket: Ticket;
};

const TicketStatusRadioGroupItems = ({
  ticket,
}: TicketStatusRadioGroupItemsProps) => {
  const handleUpdateTicketStatus = async (value: string) => {
    const promise = updateTicketStatus({
      ticketId: ticket.id,
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
        <LucideTrash className="h-4 w-4" />
        <span>Delete</span>
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
