import { Ticket } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DeleteButton = () => {
  return (
    <DropdownMenuItem>
      <LucideTrash className="mr-2 h-4 w-4" />
      <span>Delete</span>
    </DropdownMenuItem>
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
        <DeleteButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
