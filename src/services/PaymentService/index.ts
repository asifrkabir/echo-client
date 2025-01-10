/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { IApiResponse, IPayment, IPaymentIntent, IQueryParam } from "@/types";

export const createPaymentIntent = async (
  paymentIntentData: IPaymentIntent
) => {
  try {
    const { data } = await axiosInstance.post(
      "/payments/create-payment-intent",
      paymentIntentData
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

export const createPayment = async (paymentData: IPayment) => {
  try {
    const { data } = await axiosInstance.post<IApiResponse<IPayment>>(
      "/payments",
      paymentData
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

export const getAllPayments = async (params?: IQueryParam[]) => {
  try {
    const queryParams = new URLSearchParams();

    if (params) {
      params.forEach((item) => {
        queryParams.append(item.name, item.value as string);
      });
    }

    const { data } = await axiosInstance.get<IApiResponse<IPayment[]>>(
      "/payments",
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
