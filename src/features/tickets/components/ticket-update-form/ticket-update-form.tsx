import { Ticket } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateTicket } from "@/features/tickets/actions/update-ticket";

type TicketUpdateFormProps = {
  ticket: Ticket;
};

export const TicketUpdateForm = ({ ticket }: TicketUpdateFormProps) => {
  return (
    <form action={updateTicket} className="flex flex-col gap-y-2">
      <input type="hidden" name="id" defaultValue={ticket.id} />
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={ticket.title} />

      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={ticket.content} />
      <Button type="submit">Create</Button>
    </form>
  );
};
