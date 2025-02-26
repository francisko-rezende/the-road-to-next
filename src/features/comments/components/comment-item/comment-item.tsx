import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "../../types/comment-with-metadata";

type CommentItemProps = {
  comment: CommentWithMetadata;
  buttons: React.ReactNode[];
};
export const CommentItem = ({ comment, buttons }: CommentItemProps) => {
  return (
    <div className="flex gap-x-2">
      <Card className="flex flex-1 flex-col gap-y-1 p-4">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {comment.user?.username ?? "Delete user"}
          </p>
          <p className="text-sm text-muted-foreground">
            {comment.createdAt.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">{comment.content}</p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>
      <div className="col flex gap-y-1">{buttons}</div>
    </div>
  );
};
