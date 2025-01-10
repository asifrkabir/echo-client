"use client";

import AppForm from "@/components/form/AppForm";
import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/hooks/post.hook";
import { IApiResponse, IPost } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
  post: IPost;
}

export function DeletePostForm({ closeModal, post }: IProps) {
  const { mutate: deletePost, isPending: isDeletePostPending } =
    useDeletePost();
  const queryClient = useQueryClient();

  const handleSubmit: SubmitHandler<FieldValues> = () => {
    const postData = {
      _id: post._id,
    };

    deletePost(postData, {
      onSuccess: (res: IApiResponse<IPost>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Post deleted successfully");

          queryClient.invalidateQueries({ queryKey: ["ALL_POSTS_NEWSFEED"] });

          closeModal();
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(
          error.message || "Failed to delete post. Please try again."
        );
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm onSubmit={handleSubmit}>
          <p className="mb-4">Are you sure you want to delete this post?</p>
          <Button
            type="submit"
            className="w-full bg-red-500"
            disabled={isDeletePostPending}
          >
            {isDeletePostPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
}
