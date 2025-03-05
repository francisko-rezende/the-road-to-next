import { CardCompact } from "@/components/card-compact";
import { CommentWithMetadata } from "../../types/comment-with-metadata";
import { CommentCreateForm } from "../comment-create-form";
import { CommentDeleteButton } from "../comment-delete-button/comment-delete-button";
import { CommentItem } from "../comment-item/comment-item";

type CommentsProps = {
  ticketId: string;
  comments?: CommentWithMetadata[];
};
export const Comments = ({ ticketId, comments = [] }: CommentsProps) => {
  return (
    <>
      <CardCompact
        title="Create comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="ml-8 flex flex-col gap-y-2">
        {comments.map((comment) => {
          return (
            <CommentItem
              key={comment.id}
              comment={comment}
              buttons={
                comment.isOwner
                  ? [<CommentDeleteButton key="0" id={comment.id} />]
                  : []
              }
            />
          );
        })}
      </div>
    </>
  );
};
