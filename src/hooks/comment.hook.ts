/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "@/services/CommentService";
import { IComment, IQueryParam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllComments = (postId: string, params?: IQueryParam[]) => {
  return useQuery({
    queryKey: ["GET_ALL_COMMENTS", postId],
    queryFn: async () => await getAllComments(params),
    enabled: !!postId,
    refetchOnMount: true,
    staleTime: 0,
  });
};

export const useCreateComment = () => {
  return useMutation<any, Error, IComment>({
    mutationKey: ["CREATE_COMMENT"],
    mutationFn: async (commentData) => await createComment(commentData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useUpdateComment = () => {
  return useMutation<any, Error, IComment>({
    mutationKey: ["UPDATE_COMMENT"],
    mutationFn: async (commentData) => await updateComment(commentData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useDeleteComment = () => {
  return useMutation<any, Error, IComment>({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async (commentData) => await deleteComment(commentData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};
