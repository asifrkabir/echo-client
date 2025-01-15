/* eslint-disable @next/next/no-img-element */
"use client";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppTextarea from "@/components/form/AppTextarea";
import { Button } from "@/components/ui/button";
import { useCreateGroup } from "@/hooks/group.hook";
import { addGroupValidationSchema } from "@/schemas/group.schema";
import { IApiResponse, ICreateGroup, IGroup } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2 } from "lucide-react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
}

export function AddGroupForm({ closeModal }: IProps) {
  const { mutate: createGroup, isPending } = useCreateGroup();
  const queryClient = useQueryClient();

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const createGroupData: ICreateGroup = {
      name: data.name,
      description: data?.description,
    };

    createGroup(createGroupData, {
      onSuccess: (res: IApiResponse<IGroup>) => {
        if (res.statusCode === httpStatus.CREATED) {
          toast.success("Group created successfully");

          queryClient.invalidateQueries({
            queryKey: ["GROUPS"],
          });
          queryClient.invalidateQueries({
            queryKey: ["GROUPS_FOR_USER"],
          });

          closeModal();
        } else {
          console.error(res);
          toast.error(
            res.message || "Failed to create group. Please try again."
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(
          error.message || "Failed to create group. Please try again."
        );
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(addGroupValidationSchema)}
        >
          <AppInput
            name="name"
            label="Name"
            type="text"
            placeholder="Enter group name"
            required
          />

          <AppTextarea
            name="description"
            label="Description"
            type="text"
            placeholder="Write group description"
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
}
