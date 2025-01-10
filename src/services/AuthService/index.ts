/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IApiResponse } from "@/types";
import { ILoginResponse, IRegisterResponse } from "@/types/auth.type";
import httpStatus from "http-status";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (registrationData: FormData) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/register",
      registrationData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const res = data as IApiResponse<IRegisterResponse>;

    if (res.statusCode === httpStatus.CREATED) {
      cookies().set("accessToken", res.data?.accessToken as string);
      cookies().set("refreshToken", res.data?.accessToken as string);
    }

    return res;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;

      return responseData;
    }

    throw new Error(error.message || "Unknown error occurred");
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post<IApiResponse<ILoginResponse>>(
      "/auth/login",
      userData
    );

    if (data.statusCode === httpStatus.OK) {
      cookies().set("accessToken", data.data?.accessToken as string);
      cookies().set("refreshToken", data.data?.accessToken as string);
    }

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;

      return responseData;
    }

    throw new Error(error.message || "Unknown error occurred");
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      userId: decodedToken?.userId,
      name: decodedToken?.name,
      email: decodedToken?.email,
      profilePicture: decodedToken?.profilePicture,
      role: decodedToken?.role,
    };
  }

  return decodedToken;
};

export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;
    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to get new access token");
  }
};
