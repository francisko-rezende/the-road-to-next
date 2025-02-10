"use client";

import { SortSelectOption } from "@/types/sort-select-option";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  options: SortSelectOption[];
  value: SortObject;
  onChange: (sort: SortObject) => void;
};

export const SortSelect = ({ options, value, onChange }: SortSelectProps) => {
  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");

    onChange({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select
      defaultValue={value.sortKey + "_" + value.sortValue}
      onValueChange={handleSort}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => {
          return (
            <SelectItem
              key={option.sortKey + option.sortValue}
              value={option.sortKey + "_" + option.sortValue}
            >
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
