import PostsContainer from "@/components/post/PostsContainer";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Newsfeed",
};

const NewsFeedPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2">
      <Suspense>
        <PostsContainer />
      </Suspense>
    </div>
  );
};

export default NewsFeedPage;
