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
import { Pencil } from "lucide-react";
import { useState } from "react";
import { UpdatePostForm } from "./UpdatePostForm";
import { IPost } from "@/types";

interface IProps {
  post: IPost;
}

const UpdatePostModal = ({ post }: IProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-default bg-default hover:bg-muted-foreground">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle>Update Post</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Update Post Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <UpdatePostForm post={post} closeModal={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePostModal;
