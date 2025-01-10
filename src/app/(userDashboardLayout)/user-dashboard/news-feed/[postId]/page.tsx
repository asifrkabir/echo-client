"use client";

import { useGetPostByIdForUser } from "@/hooks/post.hook";
import PostDetailsCard from "@/components/post/PostDetailsCard/PostDetailsCard";
import { useParams } from "next/navigation";
import React from "react";
import PostCardLoadingSkeleton from "@/components/post/PostCardLoadingSkeleton";

const NewsFeedPostDetailsPage = () => {
  const { postId } = useParams();

  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdForUser(postId as string);

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Newsfeed Post Details
          </h1>
        </div>
        <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm p-4 items-start">
          <PostCardLoadingSkeleton />
        </div>
      </main>
    );
  }

  if (isError || !post?.data) {
    return (
      <>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Newsfeed Post Details
            </h1>
          </div>
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          >
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
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          Newsfeed Post Details
        </h1>
      </div>
      <div className="flex flex-1 rounded-lg border border-dashed shadow-sm p-4 items-start">
        <PostDetailsCard post={post.data} />
      </div>
    </main>
  );
};

export default NewsFeedPostDetailsPage;
