/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IApiResponse, IPost, IQueryParam } from "@/types";

export const getAllPosts = async () => {
  try {
    const { data } = await axiosInstance.get<IApiResponse<IPost[]>>("/posts");

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;

      return responseData;
    }

    throw new Error(error.message || "Unknown error occurred");
  }
};

export const getAllPostsForNewsfeed = async (params?: IQueryParam[]) => {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      params.forEach((item) => {
        queryParams.append(item.name, item.value as string);
      });
    }

    const { data } = await axiosInstance.get<IApiResponse<IPost[]>>(
      "/posts/newsfeed",
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

export const getAllPostsForFollowingNewsfeed = async (
  params?: IQueryParam[]
) => {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      params.forEach((item) => {
        queryParams.append(item.name, item.value as string);
      });
    }

    const { data } = await axiosInstance.get<IApiResponse<IPost[]>>(
      "/posts/newsfeed/following",
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

export const getPostByIdForUser = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get<IApiResponse<IPost>>(
      `/posts/newsfeed/${postId}`
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

export const createPost = async (postData: FormData) => {
  try {
    const { data } = await axiosInstance.post<IApiResponse<IPost>>(
      "/posts",
      postData,
      { headers: { "Content-Type": "multipart/form-data" } }
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

export const updatePost = async (postData: any) => {
  try {
    const { data } = await axiosInstance.put<IApiResponse<IPost>>(
      `/posts/${postData.postId}`,
      postData.formData,
      { headers: { "Content-Type": "multipart/form-data" } }
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

export const deletePost = async (postData: { _id: string }) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponse<IPost>>(
      `/posts/${postData._id}`
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

export const togglePostPublish = async (postData: any) => {
  try {
    const { data } = await axiosInstance.put<IApiResponse<IPost>>(
      `/posts/${postData._id}/publish`,
      postData.data
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
