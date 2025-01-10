"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/AxiosInstance";
import { IApiResponse, IVote } from "@/types";

export const processVote = async (voteData: IVote) => {
  try {
    const { data } = await axiosInstance.post<
      IApiResponse<{ message: string }>
    >("/votes", voteData);

    return data;
  } catch (error: any) {
    if (error.response) {
      const responseData = error.response.data as IApiResponse<null>;

      return responseData;
    }

    throw new Error(error.message || "Unknown error occurred");
  }
};
