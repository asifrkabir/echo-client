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
import { AddCommentForm } from "./AddCommentForm";

interface IProps {
  postId: string;
}

export function AddCommentModal({ postId }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FCBE4F] hover:bg-[#e6a93c] transition text-black">
          Add Comment
        </Button>
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle>Add Comment</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Add Comment Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AddCommentForm postId={postId} closeModal={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
