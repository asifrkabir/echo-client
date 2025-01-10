/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useGetAllFollows } from "@/hooks/follow.hook";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CircleUser, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  loggedInUserId: string;
}

const FollowingModal = ({ loggedInUserId }: IProps) => {
  const {
    data: followingData,
    isLoading: isGetAllFollowsLoading,
    isError: isGetAllFollowsError,
  } = useGetAllFollows([{ name: "follower", value: loggedInUserId }]);

  if (isGetAllFollowsLoading) {
    return <Loader2 className="mx-auto h-4 w-4 animate-spin" />;
  }

  if (isGetAllFollowsError) {
    return <div>Error loading following.</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Following</Button>
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle>Following</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Following Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {followingData?.data && followingData.data.length > 0 ? (
            followingData.data.map((item: any) => (
              <div key={item.following._id} className="flex items-center">
                {item.following.profilePicture ? (
                  <Image
                    src={item.following.profilePicture}
                    alt={item.following.name || "Follower Profile"}
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-yellow-500 mr-3"
                  />
                ) : (
                  <CircleUser className="w-10 h-10 text-gray-400 mr-3" />
                )}
                <Link
                  href={`/user-dashboard/profile/${item.following._id}`}
                  className="text-blue-500"
                >
                  {item.following.name || "Unknown User"}
                </Link>
              </div>
            ))
          ) : (
            <div>You are not following anyone.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowingModal;
