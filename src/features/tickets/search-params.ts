import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const searchParser = parseAsString
  .withDefault("")
  .withOptions(sortOptions);

export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};

// export const sortParser = parseAsString
//   .withDefault("newest")
//   .withOptions({ shallow: false, clearOnDefault: true });

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  // sort: sortParser,
  ...sortParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
