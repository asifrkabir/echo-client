"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { DeletePostForm } from "./DeletePostForm";
import { Trash2 } from "lucide-react";
import { IPost } from "@/types";

interface IProps {
  post: IPost;
}

export function DeletePostModal({ post }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-red-500 bg-default">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className=""
      >
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Delete Post Modal</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DeletePostForm post={post} closeModal={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
