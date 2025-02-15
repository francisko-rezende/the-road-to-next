import { ComponentProps } from "react";
import { Button } from "../ui/button";

type PageAndSize = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
};

type PaginationButtonProps = ComponentProps<typeof Button>;

const PaginationButton = (props: PaginationButtonProps) => {
  return <Button variant={"outline"} size={"sm"} disabled={false} {...props} />;
};

export const Pagination = ({ pagination, onPagination }: PaginationProps) => {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset - 1 + pagination.size;

  const label = `${startOffset} - ${endOffset} of X`;

  const handlePreviousPage = () => {
    onPagination({ ...pagination, page: pagination.page - 1 });
  };

  const handleNextPage = () => {
    onPagination({ ...pagination, page: pagination.page + 1 });
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div>
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={pagination.page <= 1}
        >
          Previous
        </PaginationButton>
        <PaginationButton onClick={handleNextPage}>Next</PaginationButton>
      </div>
    </div>
  );
};
