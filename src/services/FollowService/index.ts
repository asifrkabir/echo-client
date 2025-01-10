/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IApiResponse, ICreateFollow, IFollow, IQueryParam } from "@/types";

export const follow = async (followData: ICreateFollow) => {
  try {
    const { data } = await axiosInstance.post<IApiResponse<IFollow>>(
      `/follows/${followData.following}`
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;

      return responseData;
    }

    throw new Error(error.message || "Unknown error occurred");
  }
};

export const unfollow = async (followData: ICreateFollow) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponse<IFollow>>(
      `/follows/${followData.following}`
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;

      return responseData;
    }

    throw new Error(error.message || "Unknown error occurred");
  }
};

export const checkIfUserFollowsAnotherUser = async (toBeFollowedId: string) => {
  try {
    const { data } = await axiosInstance.get<IApiResponse<boolean>>(
      `/follows/check/${toBeFollowedId}`
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;

      return responseData;
    }

    throw new Error(error.message || "Unknown error occurred");
  }
};

export const getAllFollows = async (params?: IQueryParam[]) => {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      params.forEach((item) => {
        queryParams.append(item.name, item.value as string);
      });
    }

    const { data } = await axiosInstance.get<IApiResponse<IFollow[]>>(
      "/follows",
      { params: queryParams }
    );

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;

      return responseData;
    }

    throw new Error(error.message || "Unknown error occurred");
  }
};
