"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", ticketId],
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    });

  const comments = data?.pages.map((page) => page.list).flat() ?? [];
  // const [comments, setComments] = useState(paginatedComments.list);
  // const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = () => fetchNextPage();
  const handleDeleteComment = (id: string) => {
    // setComments((prevComments) => {
    //   return prevComments.filter((comment) => comment.id === id);
    // });
  };

  const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
    // if (!comment) return;
    // setComments((prevComments) => [comment, ...prevComments]);
  };

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
                        onDeleteComment={() => handleDeleteComment(comment.id)}
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
            disabled={!hasNextPage}
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
