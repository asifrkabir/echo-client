"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteUser } from "@/hooks/user.hook";
import { IApiResponse, IUser } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import httpStatus from "http-status";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  users: IUser[];
}

const UserDataTable = ({ users }: IProps) => {
  const { mutate: deleteUser } = useDeleteUser();

  const queryClient = useQueryClient();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleDelete = () => {
    if (selectedUserId) {
      deleteUser(selectedUserId, {
        onSuccess: (res: IApiResponse<IUser>) => {
          if (res.statusCode === httpStatus.OK) {
            toast.success("User deleted successfully");

            queryClient.invalidateQueries({
              queryKey: ["GET_ALL_USERS"],
            });

            setSelectedUserId(null);
          } else {
            toast.error(res.message);
          }
        },
        onError: (error) => {
          toast.error(
            error.message || "Failed to delete user. Please try again."
          );
        },
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>
                <div className="flex items-center">
                  {user.profilePicture ? (
                    <Image
                      src={user.profilePicture}
                      alt={user.name || "Profile Picture"}
                      className="rounded-full mr-2"
                      width={30}
                      height={30}
                    />
                  ) : (
                    <CircleUser className="h-7 w-7 mr-2" />
                  )}
                  {user?.name}
                </div>
              </TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      onClick={() => setSelectedUserId(user._id!)}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the user.
                    </AlertDialogDescription>
                    <div className="flex justify-end space-x-2">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Delete
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserDataTable;
