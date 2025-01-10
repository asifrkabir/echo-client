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
import { IQueryParam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["GET_ALL_POSTS"],
    queryFn: async () => await getAllPosts(),
  });
};

export const useGetAllPostsForNewsfeed = (params?: IQueryParam[]) => {
  return useQuery({
    queryKey: ["ALL_POSTS_NEWSFEED"],
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
