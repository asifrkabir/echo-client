import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/user.provider";
import { IApiResponse, IUser } from "@/types";
import { CircleUser, Loader2 } from "lucide-react";
import Image from "next/image";
import UpdateUserModal from "./UpdateUser/UpdateUserModal";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";
import {
  useCheckIfUserFollowsAnotherUser,
  useFollow,
  useUnfollow,
} from "@/hooks/follow.hook";
import httpStatus from "http-status";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  user: IUser;
}

export function UserProfileCard({ user }: IProps) {
  const { user: loggedInUser, isLoading: isUserLoading } = useUser();
  const { data: followStatus, isLoading: isFollowStatusLoading } =
    useCheckIfUserFollowsAnotherUser(user._id!);
  const { mutate: follow, isPending: isFollowPending } = useFollow();
  const { mutate: unfollow, isPending: isUnfollowPending } = useUnfollow();

  const queryClient = useQueryClient();

  const handleFollow = () => {
    const followData = {
      following: user._id!,
    };

    follow(followData, {
      onSuccess: (res: IApiResponse<{ message: string }>) => {
        if (res.statusCode === httpStatus.CREATED) {
          queryClient.invalidateQueries({
            queryKey: ["CHECK_IF_USER_FOLLOWS_ANOTHER_USER", user._id],
          });
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(error.message || "Follow failed. Please try again.");
      },
    });
  };

  const handleUnfollow = () => {
    const unfollowData = {
      following: user._id!,
    };

    unfollow(unfollowData, {
      onSuccess: (res: IApiResponse<{ message: string }>) => {
        if (res.statusCode === httpStatus.OK) {
          queryClient.invalidateQueries({
            queryKey: ["CHECK_IF_USER_FOLLOWS_ANOTHER_USER", user._id],
          });
        } else {
          toast.error(res.message);
        }
      },
      onError: (error) => {
        toast.error(error.message || "Unfollow failed. Please try again.");
      },
    });
  };

  if ((isUserLoading || isFollowStatusLoading) && !loggedInUser) {
    return <LoadingSpinner />;
  }

  loggedInUser!.bio = user?.bio;
  loggedInUser!.profilePicture = user?.profilePicture;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center">
        <div className="mb-4">
          {user.profilePicture ? (
            <Image
              src={user.profilePicture}
              alt={user.name || "User Profile"}
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-yellow-500"
            />
          ) : (
            <CircleUser className="w-24 h-24 text-gray-400" />
          )}
        </div>

        <CardTitle className="text-lg font-semibold text-center">
          {user.name || "Unknown User"}
        </CardTitle>

        {user.bio && (
          <CardDescription className="text-sm mb-4 text-center">
            {user.bio}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex justify-center">
        {loggedInUser?.userId !== user._id ? (
          followStatus?.data ? (
            <Button
              onClick={handleUnfollow}
              className="max-w-sm"
              disabled={isUnfollowPending}
            >
              {isUnfollowPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Unfollow"
              )}
            </Button>
          ) : (
            <Button
              onClick={handleFollow}
              className="max-w-sm"
              disabled={isFollowPending}
            >
              {isFollowPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Follow"
              )}
            </Button>
          )
        ) : (
          <UpdateUserModal user={loggedInUser!} />
        )}
      </CardContent>
    </Card>
  );
}
