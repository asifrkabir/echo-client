"use client";

import { useGetAllPostsForFollowingNewsfeedInfinite } from "@/hooks/post.hook";
import { IQueryParam } from "@/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import InfiniteScrollContainer from "../Shared/InfiniteScrollContainer";
import PostCard from "./PostCard/PostCard";
import PostCardLoadingSkeleton from "./PostCardLoadingSkeleton";

interface IProps {
  customParams?: IQueryParam[];
}

const FollowingPostsContainer = ({ customParams }: IProps) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");

  const [params] = useState<IQueryParam[]>(() => {
    const defaultParams: IQueryParam[] = [
      { name: "limit", value: 4 },
      // { name: "sort", value: "-upvotes" },
    ];

    if (searchTerm) {
      defaultParams.push({ name: "searchTerm", value: searchTerm });
    }

    return customParams ? [...defaultParams, ...customParams] : defaultParams;
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetAllPostsForFollowingNewsfeedInfinite(params);

  const posts = data?.pages.flatMap((page) => page.data || []) || [];

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Posts */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="grid gap-4 grid-cols-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <PostCardLoadingSkeleton key={idx} />
            ))}
          </div>
        ) : isError ? (
          <p>Something went wrong while fetching posts.</p>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center gap-1 text-center my-40">
            <h3 className="text-2xl font-bold tracking-tight">
              No posts are available right now
            </h3>
            <p className="text-sm text-muted-foreground">
              Please check back later.
            </p>
          </div>
        ) : (
          <>
            {/* Infinite Scroll Container */}
            <InfiniteScrollContainer
              className="grid gap-4 grid-cols-1"
              onBottomReached={() => hasNextPage && fetchNextPage()}
            >
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </InfiniteScrollContainer>

            {/* Next Page Loading Skeleton */}
            {isFetchingNextPage && (
              <div className="grid gap-4 grid-cols-1">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <PostCardLoadingSkeleton key={idx} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FollowingPostsContainer;
