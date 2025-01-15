"use client";

import { useGetAllPostsForFeedInfinite } from "@/hooks/post.hook";
import { IQueryParam } from "@/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import InfiniteScrollContainer from "../Shared/InfiniteScrollContainer";
import { AddPostModal } from "./AddPost/AddPostModal";
import PostCard from "./PostCard/PostCard";
import PostCardLoadingSkeleton from "./PostCardLoadingSkeleton";

interface IProps {
  groupId: string;
  hideAddPostButton?: boolean;
  customParams?: IQueryParam[];
}

const GroupPostsContainer = ({
  groupId,
  hideAddPostButton,
  customParams,
}: IProps) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");

  const [params] = useState<IQueryParam[]>(() => {
    const defaultParams: IQueryParam[] = [
      {
        name: "groupId",
        value: groupId,
      },
      { name: "limit", value: 4 },
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
  } = useGetAllPostsForFeedInfinite(params);

  const posts = data?.pages.flatMap((page) => page.data || []) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Posts */}
      <div className="lg:col-span-4 space-y-4">
        {!hideAddPostButton && <AddPostModal groupId={groupId} />}

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

export default GroupPostsContainer;
