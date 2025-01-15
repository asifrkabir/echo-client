/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroupById,
  getGroupsForUser,
  joinGroup,
  leaveGroup,
  updateGroup,
} from "@/services/GroupService";
import { IApiResponse, IQueryParam } from "@/types";
import {
  ICreateGroup,
  IGroup,
  IJoinGroup,
  ILeaveGroup,
  IUpdateGroup,
} from "@/types/group.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { toast } from "sonner";

export const getAllGroupsQuery = (params?: IQueryParam[]) => ({
  queryKey: ["GROUPS", params],
  queryFn: async () => await getAllGroups(params),
});

export const useGetAllGroups = (params?: IQueryParam[]) => {
  return useQuery({
    ...getAllGroupsQuery(params),
  });
};

export const getGroupByIdQuery = (id: string) => ({
  queryKey: ["GROUP", id],
  queryFn: async () => await getGroupById(id),
});

export const useGetGroupById = (id: string) => {
  return useQuery({
    ...getGroupByIdQuery(id),
  });
};

export const useCreateGroup = () => {
  return useMutation<any, Error, ICreateGroup>({
    mutationFn: createGroup,
  });
};

export const useUpdateGroup = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, IUpdateGroup>({
    mutationFn: updateGroup,
    onSuccess: (res: IApiResponse<IGroup>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Group updated successfully");

        queryClient.invalidateQueries({
          queryKey: ["GROUPS"],
        });

        queryClient.invalidateQueries({
          queryKey: ["GROUPS", id],
        });
      } else {
        console.error(res);
        toast.error(res.message || "Failed to update group. Please try again.");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to update group. Please try again.");
    },
  });
};

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: deleteGroup,
    onSuccess: (res: IApiResponse<IGroup>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Group deleted successfully");

        queryClient.invalidateQueries({
          queryKey: ["GROUPS"],
        });
      } else {
        console.error(res);
        toast.error(res.message || "Failed to delete group. Please try again.");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to delete group. Please try again.");
    },
  });
};

export const useJoinGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, IJoinGroup>({
    mutationFn: joinGroup,
    onSuccess: (res: IApiResponse<IGroup>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Successfully joined the group");

        queryClient.invalidateQueries({
          queryKey: ["GROUPS"],
        });
      } else {
        console.error(res);
        toast.error(res.message || "Failed to join group. Please try again.");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to join group. Please try again.");
    },
  });
};

export const useLeaveGroup = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, ILeaveGroup>({
    mutationFn: leaveGroup,
    onSuccess: (res: IApiResponse<IGroup>) => {
      if (res.statusCode === httpStatus.OK) {
        toast.success("Successfully left the group");

        queryClient.invalidateQueries({
          queryKey: ["GROUPS"],
        });
      } else {
        console.error(res);
        toast.error(res.message || "Failed to leave group. Please try again.");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to leave group. Please try again.");
    },
  });
};

export const getGroupsForUserQuery = (params?: IQueryParam[]) => ({
  queryKey: ["GROUPS_FOR_USER", params],
  queryFn: async () => await getGroupsForUser(params),
});

export const useGetGroupsForUser = (params?: IQueryParam[]) => {
  return useQuery({
    ...getGroupsForUserQuery(params),
  });
};
