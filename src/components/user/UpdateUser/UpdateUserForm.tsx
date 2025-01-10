/* eslint-disable @next/next/no-img-element */
"use client";

import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppTextarea from "@/components/form/AppTextarea";
import { Button } from "@/components/ui/button";
import { useUpdateUser } from "@/hooks/user.hook";
import { updateUserValidationSchema } from "@/schemas/user.schema";
import { IApiResponse, IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
  user: IUser;
}

export function UpdateUserForm({ closeModal, user }: IProps) {
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { mutate: updateUser, isPending: isUpdateUserPending } =
    useUpdateUser();
  const queryClient = useQueryClient();

  const existingUserValues = {
    name: user.name,
    bio: user?.bio,
  };

  useEffect(() => {
    if (user.profilePicture) {
      setExistingImageUrls([user.profilePicture]);
      setImagePreviews([user.profilePicture]);
    }
  }, [user]);

  const handleImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles([file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews([reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setExistingImageUrls([]);
    setImageFiles([]);
    setImagePreviews([]);
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const userData = {
      ...data,
      profilePicture:
        existingImageUrls.length > 0 ? existingImageUrls[0] : null,
    };

    formData.append("data", JSON.stringify(userData));

    for (const image of imageFiles) {
      formData.append("itemImages", image);
    }

    const payload = {
      formData,
    };

    updateUser(payload, {
      onSuccess: (res: IApiResponse<IUser>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("User updated successfully");

          queryClient.invalidateQueries({
            queryKey: ["GET_USER_BY_ID", user.userId],
          });

          closeModal();
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(error.message || "User update failed. Please try again.");
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(updateUserValidationSchema)}
          defaultValues={existingUserValues}
        >
          <AppInput
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            required
          />

          <AppTextarea
            name="bio"
            label="Bio"
            type="text"
            placeholder="Enter your bio"
          />

          <div className="min-w-fit flex-1">
            <label
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
              htmlFor="image"
            >
              Upload profile picture
            </label>
            <input
              className="hidden"
              id="image"
              type="file"
              onChange={(e) => handleImageAdd(e)}
            />
          </div>

          <div>
            <div className="flex justify-center m-8">
              {imagePreviews.length > 0 &&
                imagePreviews.map((imageDataUrl, index) => (
                  <div
                    key={index}
                    className="relative size-48 rounded-full border-2 border-dashed border-default-300 p-2 group"
                  >
                    <img
                      className="h-full w-full object-cover object-center rounded-full"
                      src={imageDataUrl}
                      alt={"Profile Picture"}
                    />

                    <button
                      className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() => handleImageDelete()}
                    >
                      <Trash2 className="text-white w-5 h-5" />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isUpdateUserPending}
          >
            {isUpdateUserPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
        </AppForm>
      </div>
    </>
  );
}
