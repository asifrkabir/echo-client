"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
import { useGetAllPosts } from "@/hooks/post.hook";
import PostDataTable from "./PostDataTable";

const PostDataTableContainer = () => {
  const { data: postData, isLoading } = useGetAllPosts();

  if (!postData?.data || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full">
      <PostDataTable posts={postData.data} />
    </div>
  );
};

export default PostDataTableContainer;
