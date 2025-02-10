import { useQueryState } from "nuqs";
import React from "react";
import { SearchInput } from "@/components/search-input";
import { searchParser } from "../../search-params";

type TicketSearchInputProps = {
  placeholder: string;
};

export const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder={placeholder}
    />
  );
};
