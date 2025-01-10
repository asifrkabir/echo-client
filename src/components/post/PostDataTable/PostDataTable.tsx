"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTogglePostPublish } from "@/hooks/post.hook";
import { IApiResponse, IPost } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { CircleUser, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  posts: IPost[];
}

const PostDataTable = ({ posts }: IProps) => {
  const { mutate: togglePostPublish } = useTogglePostPublish();
  const queryClient = useQueryClient();

  const [loadingPostId, setLoadingPostId] = useState<string | null>(null);

  const handleTogglePostPublish = (postId: string, isPublished: boolean) => {
    setLoadingPostId(postId);

    const togglePostPublishData = {
      _id: postId,
      data: {
        isPublished: !isPublished,
      },
    };

    togglePostPublish(togglePostPublishData, {
      onSuccess: (res: IApiResponse<IPost>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Publish status updated successfully");

          queryClient.invalidateQueries({
            queryKey: ["GET_ALL_POSTS"],
          });
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(
          error.message || "Failed to update publish status. Please try again."
        );
      },
      onSettled: () => {
        setLoadingPostId(null);
      },
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Toggle Publish</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post._id}>
              <TableCell>{post?.title}</TableCell>
              <TableCell>{post?.category}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {post.author.profilePicture ? (
                    <Image
                      src={post?.author?.profilePicture}
                      alt={post?.author?.name || "Author Profile"}
                      className="rounded-full mr-2"
                      width={30}
                      height={30}
                    />
                  ) : (
                    <CircleUser className="h-7 w-7 mr-2" />
                  )}
                  {post?.author?.name || "Unknown Author"}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant={post?.isPublished ? "outline" : "default"}
                  onClick={() =>
                    handleTogglePostPublish(post?._id, post?.isPublished)
                  }
                  disabled={loadingPostId === post?._id}
                >
                  {loadingPostId === post._id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : post?.isPublished ? (
                    "Unpublish"
                  ) : (
                    "Publish"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostDataTable;
