/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "@/services/UserService";
import { IQueryParam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["GET_USER_BY_ID", userId],
    queryFn: async () => await getUserById(userId),
    enabled: !!userId,
    refetchOnMount: "always",
    staleTime: 0,
  });
};

export const useUpdateUser = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (userData) => await updateUser(userData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useGetAllUsers = (params?: IQueryParam[]) => {
  return useQuery({
    queryKey: ["GET_ALL_USERS"],
    queryFn: async () => await getAllUsers(params),
    refetchOnMount: "always",
    staleTime: 0,
  });
};

export const useDeleteUser = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (userId) => await deleteUser(userId),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};
