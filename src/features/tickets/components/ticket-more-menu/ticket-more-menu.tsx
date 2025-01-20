"use client";
import { Ticket, TicketStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateTicketStatus } from "../../actions/update-ticket-status";
import { TICKET_LABELS } from "../../constants";

const DeleteButton = () => {
  return (
    <DropdownMenuItem>
      <LucideTrash className="mr-2 h-4 w-4" />
      <span>Delete</span>
    </DropdownMenuItem>
  );
};
type TicketStatusRadioGroupItemsProps = {
  ticket: Ticket;
};

const TicketStatusRadioGroupItems = ({
  ticket,
}: TicketStatusRadioGroupItemsProps) => {
  const handleUpdateTicketStatus = async (value: string) => {
    const result = await updateTicketStatus({
      id: ticket.id,
      ticketStatus: value as TicketStatus,
    });
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <TicketStatusRadioGroupItems ticket={ticket} />
        <DropdownMenuSeparator />
        <DeleteButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
