import { SelectContent } from "@radix-ui/react-select";
import { ComponentProps, useTransition } from "react";
import { Button } from "../ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type PageAndSize = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  paginatedMetadata: {
    count: number;
    hasNextPage: boolean;
  };
};

type PaginationButtonProps = ComponentProps<typeof Button>;

const PaginationButton = (props: PaginationButtonProps) => {
  return <Button variant={"outline"} size={"sm"} disabled={false} {...props} />;
};

export const Pagination = ({
  pagination,
  onPagination,
  paginatedMetadata: { count, hasNextPage },
}: PaginationProps) => {
  const [isPending, startTransition] = useTransition();
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset - 1 + pagination.size;
  const actualEndOffset = Math.min(endOffset, count);

  const label = `${startOffset} - ${actualEndOffset} of ${count}`;

  const handlePreviousPage = () => {
    startTransition(() => {
      return onPagination({ ...pagination, page: pagination.page - 1 });
    });
  };

  const handleNextPage = () => {
    startTransition(() => {
      return onPagination({ ...pagination, page: pagination.page + 1 });
    });
  };

  const handleChangeSize = (size: string) => {
    onPagination({ ...pagination, size: parseInt(size) });
  };

  const sizeButton = (
    <Select
      defaultValue={pagination.size.toString()}
      onValueChange={handleChangeSize}
    >
      <SelectTrigger className="h-[36px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="25">25</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex space-x-2">
        {sizeButton}
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={pagination.page < 1 || isPending}
        >
          Previous
        </PaginationButton>
        <PaginationButton
          onClick={handleNextPage}
          disabled={!hasNextPage || isPending}
        >
          Next
        </PaginationButton>
      </div>
    </div>
  );
};
