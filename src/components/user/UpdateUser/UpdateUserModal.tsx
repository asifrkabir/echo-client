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
import { IUser } from "@/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { UpdateUserForm } from "./UpdateUserForm";

interface IProps {
  user: IUser;
}

const UpdateUserModal = ({ user }: IProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="max-w-sm">Update Profile</Button>
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Update User Modal</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <UpdateUserForm user={user} closeModal={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserModal;
