import { CardCompact } from "@/components/card-compact";
import { getComments } from "../../queries/get-comments";
import { CommentCreateForm } from "../comment-create-form";
import { CommentItem } from "../comment-item/comment-item";

type CommentsProps = {
  ticketId: string;
};
export const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId);

  return (
    <>
      <CardCompact
        title="Create comment"
        description="A new comment will be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="ml-8 flex flex-col gap-y-2">
        {comments.map((comment) => {
          return <CommentItem key={comment.id} comment={comment} />;
        })}
      </div>
    </>
  );
};
