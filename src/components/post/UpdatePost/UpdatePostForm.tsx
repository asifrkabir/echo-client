/* eslint-disable @next/next/no-img-element */
"use client";

import AppCheckbox from "@/components/form/AppCheckbox";
import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppRichTextEditor from "@/components/form/AppRichTextEditor";
import AppSelect from "@/components/form/AppSelect";
import { Button } from "@/components/ui/button";
import { useUpdatePost } from "@/hooks/post.hook"; // Make sure you have this hook
import { updatePostValidationSchema } from "@/schemas/post.schema";
import { IApiResponse, IPost } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { Loader2, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  closeModal: () => void;
  post: IPost;
}

export function UpdatePostForm({ closeModal, post }: IProps) {
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { mutate: updatePost, isPending: isUpdatePostPending } =
    useUpdatePost();
  const queryClient = useQueryClient();

  const existingPostValues = {
    title: post.title,
    category: post.category,
    content: post.content,
    isPremium: post.isPremium,
  };

  useEffect(() => {
    if (post.imageUrls) {
      setExistingImageUrls(post.imageUrls);
      setImagePreviews(post.imageUrls);
    }
  }, [post]);

  const handleImageAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);
      setImageFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };

        reader.readAsDataURL(file);
      });
    }
  };

  const handleImageDelete = (index: number) => {
    if (index < existingImageUrls.length) {
      setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImageUrls.length;
      setImageFiles((prev) => prev.filter((_, i) => i !== newIndex));
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    const postData = {
      ...data,
      imageUrls: existingImageUrls,
    };

    formData.append("data", JSON.stringify(postData));

    for (const image of imageFiles) {
      formData.append("postImages", image);
    }

    const payload = {
      postId: post._id,
      formData,
    };

    updatePost(payload, {
      onSuccess: (res: IApiResponse<IPost>) => {
        if (res.statusCode === httpStatus.OK) {
          toast.success("Post updated successfully");

          queryClient.invalidateQueries({ queryKey: ["ALL_POSTS_NEWSFEED"] });

          closeModal();
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(error.message || "Post update failed. Please try again.");
      },
    });
  };

  return (
    <>
      <div className="grid gap-4 my-2">
        <AppForm
          onSubmit={handleSubmit}
          resolver={zodResolver(updatePostValidationSchema)}
          defaultValues={existingPostValues}
        >
          <AppInput
            name="title"
            label="Title"
            type="text"
            placeholder="Enter post title"
            required
          />

          <AppSelect
            name="category"
            label="Category"
            placeholder="Select post category"
            options={[
              { label: "Tip", value: "tip" },
              { label: "Story", value: "story" },
            ]}
            required
          />

          <AppRichTextEditor
            name="content"
            label="Content"
            placeholder="Write post content..."
            required
          />

          <AppCheckbox name="isPremium" label="Is Premium?" />

          <div className="min-w-fit flex-1">
            <label
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
              htmlFor="image"
            >
              Upload images
            </label>
            <input
              multiple
              className="hidden"
              id="image"
              type="file"
              onChange={(e) => handleImageAdd(e)}
            />
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-4 m-8">
              {imagePreviews.length > 0 &&
                imagePreviews.map((imageDataUrl, index) => (
                  <div
                    key={index}
                    className="relative size-32 border-2 border-dashed border-default-300 p-2 group"
                  >
                    <img
                      className="h-full w-full object-cover object-center"
                      src={imageDataUrl}
                      alt={`Preview ${index + 1}`}
                    />

                    <button
                      className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(event) => {
                        event.preventDefault();
                        handleImageDelete(index);
                      }}
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
            disabled={isUpdatePostPending}
          >
            {isUpdatePostPending ? (
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
