import { CardCompact } from "@/components/card-compact";
import { getAuth } from "@/features/auth/actions/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getComments } from "../../queries/get-comments";
import { CommentCreateForm } from "../comment-create-form";
import { CommentDeleteButton } from "../comment-delete-button/comment-delete-button";
import { CommentItem } from "../comment-item/comment-item";

type CommentsProps = {
  ticketId: string;
};
export const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId);
  const { user } = await getAuth();

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
                isOwner({ authUser: user, entity: comment })
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
