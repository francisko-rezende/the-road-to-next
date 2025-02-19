"use client";

import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import { Pagination } from "@/components/pagination";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "../../search-params";

type TicketPaginationProps = {
  paginatedTicketMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

export const TicketPagination = ({
  paginatedTicketMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions,
  );

  const [search] = useQueryState("search", searchParser);
  const previousSearch = useRef(search);

  useEffect(() => {
    if (search === previousSearch.current) return;
    previousSearch.current = search;

    setPagination({ ...pagination, page: 0 });

    setPagination({ ...pagination, page: 0 });
  }, [pagination, search, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  );
};
