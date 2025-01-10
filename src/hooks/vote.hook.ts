/* eslint-disable @typescript-eslint/no-explicit-any */
import { processVote } from "@/services/VoteService/vote.service";
import { IVote } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useProcesssVote = () => {
  return useMutation<any, Error, IVote>({
    mutationKey: ["PROCESS_VOTE"],
    mutationFn: async (voteData) => await processVote(voteData),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};
