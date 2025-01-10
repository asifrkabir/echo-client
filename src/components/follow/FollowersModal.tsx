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

const FollowerModal = ({ loggedInUserId }: IProps) => {
  const {
    data: followerData,
    isLoading: isGetAllFollowsLoading,
    isError: isGetAllFollowsError,
  } = useGetAllFollows([{ name: "following", value: loggedInUserId }]);

  if (isGetAllFollowsLoading) {
    return <Loader2 className="mx-auto h-4 w-4 animate-spin" />;
  }

  if (isGetAllFollowsError) {
    return <div>Error loading followers.</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Follower</Button>
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
      >
        <DialogHeader>
          <DialogTitle>Follower</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>Follower Details</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {followerData?.data && followerData.data.length > 0 ? (
            followerData.data.map((item: any) => (
              <div key={item.following._id} className="flex items-center">
                {item.follower.profilePicture ? (
                  <Image
                    src={item.follower.profilePicture}
                    alt={item.follower.name || "Follower Profile"}
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-yellow-500 mr-3"
                  />
                ) : (
                  <CircleUser className="w-10 h-10 text-gray-400 mr-3" />
                )}
                <Link
                  href={`/user-dashboard/profile/${item.follower._id}`}
                  className="text-blue-500"
                >
                  {item.follower.name || "Unknown User"}
                </Link>
              </div>
            ))
          ) : (
            <div>You have no followers.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowerModal;
