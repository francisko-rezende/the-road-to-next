"use client";

import { useQueryStates } from "nuqs";
import { SortSelect } from "@/components/sort-select";
import { SortSelectOption } from "@/types/sort-select-option";
import { sortOptions, sortParser } from "../../search-params";

type TicketSortSelectProps = {
  options: SortSelectOption[];
};
export const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  return <SortSelect options={options} value={sort} onChange={setSort} />;
};
