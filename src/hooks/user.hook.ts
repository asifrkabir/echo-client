/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteUser,
  getAllUsers,
  getTotalUsers,
  getUserById,
  updateUser,
} from "@/services/UserService";
import { IApiResponse, IQueryParam, IUser } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

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
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteUser,
    onSuccess: (res: IApiResponse<IUser>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("User deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["GET_ALL_USERS"],
        });
      } else {
        console.error(res);
        toast.error(res.message || "Failed to delete User. Please try again.");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to delete User. Please try again.");
    },
  });
};

export const getTotalUsersQuery = (params?: IQueryParam[]) => ({
  queryKey: ["TOTAL_USERS", params],
  queryFn: async () => await getTotalUsers(params),
});

export const useGetTotalUsers = (params?: IQueryParam[]) => {
  return useQuery({
    ...getTotalUsersQuery(params),
  });
};
