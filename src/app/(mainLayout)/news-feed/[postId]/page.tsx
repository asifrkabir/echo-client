"use client";

import PostCardLoadingSkeleton from "@/components/post/PostCardLoadingSkeleton";
import PostDetailsCard from "@/components/post/PostDetailsCard/PostDetailsCard";
import { Button } from "@/components/ui/button";
import { useGetPostByIdForUser } from "@/hooks/post.hook";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const NewsFeedPostDetailsPage = () => {
  const router = useRouter();
  const { postId } = useParams();

  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdForUser(postId as string);

  const handleGoBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col gap-4">
        <div className="flex items-center">
          <Button onClick={handleGoBack} size="sm">
            <ArrowLeft className="mr-2" /> Go Back
          </Button>
        </div>
        <div className="flex flex-1 justify-center rounded-lg items-start">
          <PostCardLoadingSkeleton />
        </div>
      </main>
    );
  }

  if (isError || !post?.data) {
    return (
      <>
        <main className="flex flex-1 flex-col gap-4">
          <div className="flex items-center">
            <Button onClick={handleGoBack} size="sm">
              <ArrowLeft className="mr-2" /> Go Back
            </Button>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                No post found
              </h3>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4">
      <div className="flex items-center">
        <Button onClick={handleGoBack} size="sm">
          <ArrowLeft className="mr-2" /> Go Back
        </Button>
      </div>
      <div className="flex flex-1 rounded-lg items-start">
        <PostDetailsCard post={post.data} />
      </div>
    </main>
  );
};

export default NewsFeedPostDetailsPage;
