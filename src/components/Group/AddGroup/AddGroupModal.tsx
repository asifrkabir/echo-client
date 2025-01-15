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
import { AddGroupForm } from "./AddGroupForm";

export function AddGroupModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Group</Button>
      </DialogTrigger>
      <DialogContent className={"lg:max-w-screen-lg"}>
        <DialogHeader>
          <DialogTitle>Add Group</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Add Group Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AddGroupForm closeModal={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
