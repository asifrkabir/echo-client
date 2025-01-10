/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  checkIfUserFollowsAnotherUser,
  follow,
  getAllFollows,
  unfollow,
} from "@/services/FollowService";
import { IFollow, IQueryParam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFollow = () => {
  return useMutation<any, Error, IFollow>({
    mutationKey: ["FOLLOW"],
    mutationFn: async (followData) => await follow(followData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useUnfollow = () => {
  return useMutation<any, Error, IFollow>({
    mutationKey: ["UNFOLLOW"],
    mutationFn: async (followData) => await unfollow(followData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useCheckIfUserFollowsAnotherUser = (toBeFollowedId: string) => {
  return useQuery({
    queryKey: ["CHECK_IF_USER_FOLLOWS_ANOTHER_USER", toBeFollowedId],
    queryFn: async () => await checkIfUserFollowsAnotherUser(toBeFollowedId),
    enabled: !!toBeFollowedId,
    refetchOnMount: "always",
    staleTime: 0,
  });
};

export const useGetAllFollows = (params?: IQueryParam[]) => {
  return useQuery({
    queryKey: ["GET_ALL_FOLLOWS"],
    queryFn: async () => await getAllFollows(params),
  });
};
