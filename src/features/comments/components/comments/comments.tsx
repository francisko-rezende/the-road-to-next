"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { CardCompact } from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import { PaginatedData } from "@/types/pagination";
import { getComments } from "../../queries/get-comments";
import { CommentWithMetadata } from "../../types/comment-with-metadata";
import { CommentCreateForm } from "../comment-create-form";
import { CommentDeleteButton } from "../comment-delete-button/comment-delete-button";
import { CommentItem } from "../comment-item/comment-item";

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};
export const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const queryKey = ["comments", ticketId];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: queryKey,
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
      initialData: {
        pages: [
          {
            list: paginatedComments.list,
            metadata: paginatedComments.metadata,
          },
        ],
        pageParams: [undefined],
      },
    });

  const comments = data.pages.map((page) => page.list).flat();

  const handleMore = () => fetchNextPage();

  const queryClient = useQueryClient();

  const handleDeleteComment = () => queryClient.invalidateQueries({ queryKey });
  const handleCreateComment = () => queryClient.invalidateQueries({ queryKey });

  return (
    <>
      <CardCompact
        title="Create comment"
        description="A new comment will be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />
      <div className="ml-8 flex flex-col gap-y-2">
        {comments.map((comment) => {
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              buttons={
                comment.isOwner
                  ? [
                      <CommentDeleteButton
                        key="0"
                        id={comment.id}
                        onDeleteComment={() => handleDeleteComment()}
                      />,
                    ]
                  : []
              }
            />
          );
        })}
      </div>
      <div className="ml-8 flex flex-col justify-center">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={handleMore}
            variant={"ghost"}
          >
            More
          </Button>
        )}
      </div>
    </>
  );
};
