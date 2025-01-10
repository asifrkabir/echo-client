"use client";

import { useGetAllPostsForNewsfeed } from "@/hooks/post.hook";
import { IQueryParam } from "@/types";
import { useEffect, useState } from "react";
import { AddPostModal } from "./AddPost/AddPostModal";
import PostCard from "./PostCard/PostCard";
import PostCardLoadingSkeleton from "./PostCardLoadingSkeleton";
import SearchFilterNewsfeed from "./SearchFilterNewsfeed";

const PostsContainer = () => {
  const [params, setParams] = useState<IQueryParam[]>([
    { name: "sort", value: "-upvotes" },
  ]);

  const {
    data: postData,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllPostsForNewsfeed(params);

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 p-4 items-start w-full">
        {Array.from({ length: 4 }).map((_, idx) => (
          <PostCardLoadingSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <SearchFilterNewsfeed setParams={setParams} />

      {isFetching && (
        <div className="grid grid-cols-1 gap-8 p-4 items-start w-full">
          {Array.from({ length: 4 }).map((_, idx) => (
            <PostCardLoadingSkeleton key={idx} />
          ))}
        </div>
      )}

      {postData?.data && postData?.data?.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 p-4 w-full items-start">
          {postData?.data.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1 text-center my-40">
          <h3 className="text-2xl font-bold tracking-tight">
            No posts are available right now
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start engaging as soon as posts are added.
          </p>
          <AddPostModal />
        </div>
      )}
    </div>
  );
};

export default PostsContainer;
