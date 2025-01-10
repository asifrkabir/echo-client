/* eslint-disable @next/next/no-img-element */
"use client";

import AppForm from "@/components/form/AppForm";
import AppTextarea from "@/components/form/AppTextarea";
import { Button } from "@/components/ui/button";
import { useCreateComment } from "@/hooks/comment.hook";
import { addCommentValidationSchema } from "@/schemas/comment.schema";
import { IApiResponse, IComment } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  postId: string;
  closeModal: () => void;
}

export function AddCommentForm({ postId, closeModal }: IProps) {
  const { mutate: createComment, isPending: isCreateCommentPending } =
    useCreateComment();
  const queryClient = useQueryClient();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const commentData = {
      post: postId,
      content: data.content,
    };

    createComment(commentData, {
      onSuccess: (res: IApiResponse<IComment>) => {
        if (res.statusCode === httpStatus.CREATED) {
          toast.success("Comment added successfully");

          queryClient.invalidateQueries({
            queryKey: ["GET_ALL_COMMENTS", postId],
          });

          closeModal();
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(
          error.message || "Failed to add comment. Please try again."
        );
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(addCommentValidationSchema)}
        >
          <AppTextarea
            name="content"
            label="Comment"
            type="text"
            placeholder="Write your comment"
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isCreateCommentPending}
          >
            {isCreateCommentPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
}
