import FollowingPostsContainer from "@/components/post/FollowingPostsContainer";
import { Suspense } from "react";

const FollowingNewsFeedPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">People You Follow</h1>
      </div>
      <div className="h-full flex-1 flex-col space-y-2">
        <Suspense>
          <FollowingPostsContainer />
        </Suspense>
      </div>
    </main>
  );
};

export default FollowingNewsFeedPage;
