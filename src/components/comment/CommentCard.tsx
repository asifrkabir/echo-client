import { IApiResponse, IComment, IUser } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { CircleUser, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useDeleteComment, useUpdateComment } from "@/hooks/comment.hook";
import httpStatus from "http-status";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";

interface CommentCardProps {
  comment: IComment;
  loggedInUser: IUser;
}

const CommentCard = ({ comment, loggedInUser }: CommentCardProps) => {
  const { mutate: updateComment, isPending: isUpdateCommentPending } =
    useUpdateComment();
  const { mutate: deleteComment, isPending: isDeleteCommentPending } =
    useDeleteComment();

  const queryClient = useQueryClient();

  const { content, createdAt } = comment;
  const user: IUser = comment.user as IUser;

  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);

  const handleDeleteComment = () => {
    const commentData = {
      _id: comment._id,
    };

    deleteComment(commentData, {
      onSuccess: (res: IApiResponse<IComment>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Comment deleted successfully");

          queryClient.invalidateQueries({
            queryKey: ["GET_ALL_COMMENTS"],
          });
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(
          error.message || "Failed to delete comment. Please try again."
        );
      },
    });
  };

  const handleUpdateComment = () => {
    const commentData = {
      _id: comment._id,
      content: newContent,
    };

    updateComment(commentData, {
      onSuccess: (res: IApiResponse<IComment>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Comment updated successfully");

          queryClient.invalidateQueries({
            queryKey: ["GET_ALL_COMMENTS"],
          });
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(
          error.message || "Failed to update comment. Please try again."
        );
      },
    });

    setIsEditing(false);
  };

  if (isUpdateCommentPending || isDeleteCommentPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 rounded-lg w-full border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {user?.profilePicture ? (
            <Image
              src={user.profilePicture}
              alt={user.name!}
              width={36}
              height={36}
              className="rounded-full border-2 mr-2"
            />
          ) : (
            <CircleUser className="h-8 w-8 text-gray-400 mr-2" />
          )}
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(createdAt!))} ago
            </p>
          </div>
        </div>

        {loggedInUser.userId === user._id && (
          <div className="flex items-center">
            <button onClick={() => setIsEditing(true)} className="mr-2">
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDeleteComment()}
              className="text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div>
          <Textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full border rounded p-2 mb-2"
          />
          <Button onClick={handleUpdateComment}>Save</Button>
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
            className="ml-2"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <p className="text-sm">{content}</p>
      )}
    </div>
  );
};

export default CommentCard;
