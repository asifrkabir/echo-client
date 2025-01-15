"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@/context/user.provider";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const ProfileSidebarCard = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    <div className="flex items-center space-x-3 w-full">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="h-8 w-20 ml-auto rounded" />
    </div>;
  }

  return (
    <Card className="w-full p-4 flex flex-wrap items-center justify-between gap-2">
      {/* User Avatar */}
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={user?.profilePicture}
            alt="User Avatar"
            className="rounded-full border-2 border-violet-500"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="text-sm font-medium">{user?.name || "Anonymous"}</div>
      </div>

      <Link href="/my-profile">
        <Button size="sm" variant="outline">
          My Profile
        </Button>
      </Link>
    </Card>
  );
};

export default ProfileSidebarCard;
