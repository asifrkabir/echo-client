/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IApiResponse, IQueryParam, IUser } from "@/types";

export const getUserById = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get<IApiResponse<IUser>>(
      `/users/${userId}`
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

export const updateUser = async (userData: any) => {
  try {
    const { data } = await axiosInstance.put<IApiResponse<IUser>>(
      `/users`,
      userData.formData,
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

export const getAllUsers = async (params?: IQueryParam[]) => {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      params.forEach((item) => {
        queryParams.append(item.name, item.value as string);
      });
    }

    const { data } = await axiosInstance.get<IApiResponse<IUser[]>>("/users", {
      params: queryParams,
    });

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;

      return responseData;
    }

    throw new Error(error.message || "Unknown error occurred");
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const { data } = await axiosInstance.delete<IApiResponse<IUser>>(
      `/users/${userId}`
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
