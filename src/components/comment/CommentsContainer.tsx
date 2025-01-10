"use client";

import { useGetAllComments } from "@/hooks/comment.hook";
import { IQueryParam } from "@/types";
import { useEffect, useState } from "react";
import { AddCommentModal } from "./AddComment/AddCommentModal";
import CommentCard from "./CommentCard";
import CommentCardLoadingSkeleton from "./CommentCardLoadingSkeleton";
import { useUser } from "@/context/user.provider";

interface IProps {
  postId: string;
}

const CommentsContainer = ({ postId }: IProps) => {
  const { user, isLoading: isUserLoading } = useUser();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<IQueryParam[]>([
    { name: "post", value: postId },
    { name: "sort", value: "-createdAt" },
  ]);

  const {
    data: commentsData,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllComments(postId, params);

  useEffect(() => {
    if (postId) {
      refetch();
    }
  }, [postId, refetch]);

  if (isLoading || isUserLoading) {
    return (
      <div className="flex flex-col gap-4 items-start w-full">
        {Array.from({ length: 3 }).map((_, idx) => (
          <CommentCardLoadingSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        <AddCommentModal postId={postId} />
      </div>

      {isFetching && (
        <div className="flex flex-col gap-4 items-start w-full">
          {Array.from({ length: 3 }).map((_, idx) => (
            <CommentCardLoadingSkeleton key={idx} />
          ))}
        </div>
      )}

      {commentsData?.data && commentsData?.data?.length > 0 ? (
        <div className="flex flex-col gap-4 w-full items-start">
          {commentsData.data.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              loggedInUser={user!}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 text-center my-10">
          <h3 className="text-lg font-medium tracking-tight">
            No comments yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Be the first to comment on this post.
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentsContainer;
