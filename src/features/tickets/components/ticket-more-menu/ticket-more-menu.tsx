import { Ticket, TicketStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  return (
    <DropdownMenuRadioGroup value={ticket.status}>
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
