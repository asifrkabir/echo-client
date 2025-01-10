"use client";

import { useGetAllPostsForFeedInfinite } from "@/hooks/post.hook";
import { IQueryParam } from "@/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import InfiniteScrollContainer from "../Shared/InfiniteScrollContainer";
import { Button } from "../ui/button";
import { AddPostModal } from "./AddPost/AddPostModal";
import PostCard from "./PostCard/PostCard";
import PostCardLoadingSkeleton from "./PostCardLoadingSkeleton";

interface IProps {
  customParams?: IQueryParam[];
}

const PostsContainer = ({ customParams }: IProps) => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const searchTerm = searchParams.get("search");

  const [params] = useState<IQueryParam[]>(() => {
    const defaultParams: IQueryParam[] = [
      { name: "limit", value: 4 },
      // { name: "sort", value: "-upvotes" },
    ];

    if (categoryId) {
      defaultParams.push({ name: "category", value: categoryId });
    }

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
      {/* Left Sidebar */}
      <div className="lg:col-span-1 h-screen sticky lg:top-24">
        <div className="flex flex-col space-y-4 h-full overflow-y-auto hide-scrollbar">
          <Button>Left Sidebar Item 1</Button>
          <Button>Left Sidebar Item 2</Button>
          <Button>Left Sidebar Item 3</Button>
          <Button>Left Sidebar Item 1</Button>
          <Button>Left Sidebar Item 2</Button>
          <Button>Left Sidebar Item 3</Button>
          <Button>Left Sidebar Item 1</Button>
          <Button>Left Sidebar Item 2</Button>
          <Button>Left Sidebar Item 3</Button>
          <Button>Left Sidebar Item 1</Button>
          <Button>Left Sidebar Item 2</Button>
          <Button>Left Sidebar Item 3</Button>
          <Button>Left Sidebar Item 1</Button>
          <Button>Left Sidebar Item 2</Button>
          <Button>Left Sidebar Item 3</Button>
          <Button>Left Sidebar Item 1</Button>
          <Button>Left Sidebar Item 2</Button>
          <Button>Left Sidebar Item 3</Button>
          <Button>Left Sidebar Item 1</Button>
          <Button>Left Sidebar Item 2</Button>
          <Button>Left Sidebar Item 3</Button>
        </div>
      </div>

      {/* Posts */}
      <div className="lg:col-span-2 space-y-4">
        <AddPostModal />

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

      {/* Right Sidebar */}
      <div className="lg:col-span-1 h-screen sticky lg:top-24">
        <div className="flex flex-col space-y-4 h-full overflow-y-auto hide-scrollbar">
          <Button>Right Sidebar Item 1</Button>
          <Button>Right Sidebar Item 2</Button>
          <Button>Right Sidebar Item 3</Button>
          <Button>Right Sidebar Item 1</Button>
          <Button>Right Sidebar Item 2</Button>
          <Button>Right Sidebar Item 3</Button>
          <Button>Right Sidebar Item 1</Button>
          <Button>Right Sidebar Item 2</Button>
          <Button>Right Sidebar Item 3</Button>
          <Button>Right Sidebar Item 1</Button>
          <Button>Right Sidebar Item 2</Button>
          <Button>Right Sidebar Item 3</Button>
          <Button>Right Sidebar Item 1</Button>
          <Button>Right Sidebar Item 2</Button>
          <Button>Right Sidebar Item 3</Button>
          <Button>Right Sidebar Item 1</Button>
          <Button>Right Sidebar Item 2</Button>
          <Button>Right Sidebar Item 3</Button>
          <Button>Right Sidebar Item 1</Button>
          <Button>Right Sidebar Item 2</Button>
          <Button>Right Sidebar Item 3</Button>
          <Button>Right Sidebar Item 1</Button>
          <Button>Right Sidebar Item 2</Button>
          <Button>Right Sidebar Item 3</Button>
        </div>
      </div>
    </div>
  );
};

export default PostsContainer;
