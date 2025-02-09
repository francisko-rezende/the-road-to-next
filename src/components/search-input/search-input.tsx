"use client";

import { useQueryState } from "nuqs";
import React, { ComponentProps } from "react";
import { useDebouncedCallback } from "use-debounce";
import { searchParser } from "@/features/tickets/search-params";
import { Input } from "../ui/input";

type SearchInputProps = ComponentProps<typeof Input>;

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    250,
  );

  return (
    <Input
      defaultValue={search}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
};
