/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IApiResponse, IComment, IQueryParam } from "@/types";

export const getAllComments = async (params?: IQueryParam[]) => {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      params.forEach((item) => {
        queryParams.append(item.name, item.value as string);
      });
    }

    const { data } = await axiosInstance.get<IApiResponse<IComment[]>>(
      "/comments",
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

export const createComment = async (commentData: IComment) => {
  try {
    const { data } = await axiosInstance.post<IApiResponse<IComment>>(
      "/comments",
      commentData
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

export const updateComment = async (commentData: IComment) => {
  try {
    const { data } = await axiosInstance.put<IApiResponse<IComment>>(
      `/comments/${commentData._id}`,
      {
        content: commentData.content,
      }
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

export const deleteComment = async (commentData: IComment) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponse<IComment>>(
      `/comments/${commentData._id}`
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
