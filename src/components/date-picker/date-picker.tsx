"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  defaultValue?: string;
  id: string;
  name: string;
};

export const DatePicker = ({ defaultValue, id, name }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date(),
  );

  const [open, setOpen] = useState(false);

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  const handleSelect = (selectedDate?: Date) => {
    setDate(selectedDate);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id={id} className="w-full">
        <Button
          variant="outline"
          className="justify-start text-left font-normal"
        >
          {}
          <LucideCalendar />
          {formattedStringDate}
          <input className="hidden" name={name} value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
