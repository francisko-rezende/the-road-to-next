import { getComments } from "../../queries/get-comments";
import { CommentItem } from "../comment-item/comment-item";

type CommentsProps = {
  ticketId: string;
};
export const Comments = async ({ ticketId }: CommentsProps) => {
  const comments = await getComments(ticketId);

  return (
    <div className="ml-8 flex flex-col gap-y-2">
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};
