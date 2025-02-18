import { ComponentProps, useTransition } from "react";
import { Button } from "../ui/button";

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

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div>
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
