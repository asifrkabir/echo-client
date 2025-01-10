/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createPayment,
  createPaymentIntent,
  getAllPayments,
} from "@/services/PaymentService";
import { IPayment, IPaymentIntent, IQueryParam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreatePaymentIntent = () => {
  return useMutation<any, Error, IPaymentIntent>({
    mutationKey: [],
    mutationFn: async (paymentIntentData) =>
      await createPaymentIntent(paymentIntentData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useCreatePayment = () => {
  return useMutation<any, Error, IPayment>({
    mutationKey: [],
    mutationFn: async (paymentData) => await createPayment(paymentData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export const useGetAllPayments = (params?: IQueryParam[]) => {
  return useQuery({
    queryKey: ["GET_ALL_PAYMENTS"],
    queryFn: async () => await getAllPayments(params),
  });
};
