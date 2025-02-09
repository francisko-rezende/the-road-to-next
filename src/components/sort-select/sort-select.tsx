"use client";

import { useQueryState } from "nuqs";
import { sortParser } from "@/features/tickets/search-params";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Option = {
  label: string;
  value: string;
};

type SortSelectProps = {
  options: Option[];
};

export const SortSelect = ({ options }: SortSelectProps) => {
  const [sortValue, setSortValue] = useQueryState("sort", sortParser);

  const handleSort = (value: string) => {
    setSortValue(value);
  };

  return (
    <Select defaultValue={sortValue} onValueChange={handleSort}>
      <SelectTrigger className="w-[280px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value, label }) => {
          return (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
