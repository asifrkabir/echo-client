/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsForFollowingNewsfeed,
  getAllPostsForNewsfeed,
  getPostByIdForUser,
  togglePostPublish,
  updatePost,
} from "@/services/PostService";
import { IApiResponse, IPost, IQueryParam } from "@/types";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["GET_ALL_POSTS"],
    queryFn: async () => await getAllPosts(),
  });
};

export const useGetAllPostsForNewsfeed = (params?: IQueryParam[]) => {
  return useQuery({
    queryKey: ["ALL_POSTS_NEWSFEED", params],
    queryFn: async () => await getAllPostsForNewsfeed(params),
  });
};

export const useGetAllPostsForFollowingNewsfeed = (params?: IQueryParam[]) => {
  return useQuery({
    queryKey: ["ALL_POSTS_FOLLOWING_NEWSFEED"],
    queryFn: async () => await getAllPostsForFollowingNewsfeed(params),
    refetchOnMount: "always",
    staleTime: 0,
  });
};

export const useGetPostByIdForUser = (postId: string) => {
  return useQuery({
    queryKey: ["GET_POST_BY_ID", postId],
    queryFn: async () => await getPostByIdForUser(postId),
    enabled: !!postId,
    refetchOnMount: "always",
    staleTime: 0,
  });
};

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useUpdatePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async (postData) => await updatePost(postData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useDeletePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (postData) => await deletePost(postData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useTogglePostPublish = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["TOGGLE_POST_PUBLISH"],
    mutationFn: async (postData) => await togglePostPublish(postData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const getAllPostsForFeedInfiniteQuery = (
  params: IQueryParam[] = []
) => ({
  queryKey: ["POSTS_FEED", params],
  queryFn: async ({ pageParam = 1 }) => {
    const paginationParams = [...params, { name: "page", value: pageParam }];
    return await getAllPostsForNewsfeed(paginationParams);
  },
  getNextPageParam: (lastPage: IApiResponse<IPost[]>) => {
    if (lastPage.meta!.page < lastPage.meta!.totalPage) {
      return lastPage.meta!.page + 1;
    }
    return undefined;
  },
  initialPageParam: 1,
});

export const useGetAllPostsForFeedInfinite = (params: IQueryParam[]) => {
  return useInfiniteQuery({ ...getAllPostsForFeedInfiniteQuery(params) });
};

export const useGetAllPostsForFollowingNewsfeedInfiniteQuery = (
  params: IQueryParam[] = []
) => ({
  queryKey: ["POSTS_FEED", params],
  queryFn: async ({ pageParam = 1 }) => {
    const paginationParams = [...params, { name: "page", value: pageParam }];
    return await getAllPostsForFollowingNewsfeed(paginationParams);
  },
  getNextPageParam: (lastPage: IApiResponse<IPost[]>) => {
    if (lastPage.meta!.page < lastPage.meta!.totalPage) {
      return lastPage.meta!.page + 1;
    }
    return undefined;
  },
  initialPageParam: 1,
});

export const useGetAllPostsForFollowingNewsfeedInfinite = (
  params: IQueryParam[]
) => {
  return useInfiniteQuery({
    ...useGetAllPostsForFollowingNewsfeedInfiniteQuery(params),
  });
};
