"use client";

import FollowersModal from "@/components/follow/FollowersModal";
import FollowingModal from "@/components/follow/FollowingModal";
import { AddPostModal } from "@/components/post/AddPost/AddPostModal";
import ProfilePostsContainer from "@/components/post/ProfilePostsContainer";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
import { UserProfileCard } from "@/components/user/UserProfileCard";
import { useUser } from "@/context/user.provider";
import { useGetUserById } from "@/hooks/user.hook";

const MyProfilePage = () => {
  const { user: loggedInUser, isLoading: isLoggedInUserLoading } = useUser();
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserById(loggedInUser?.userId as string);

  if (isLoggedInUserLoading || !loggedInUser || isUserLoading) {
    return <LoadingSpinner />;
  }

  if (isUserError || !userData?.data) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">No user found</h3>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">My Profile</h1>
        <AddPostModal />
      </div>
      <div className="flex flex-col flex-1 justify-center rounded-lg border border-dashed shadow-sm gap-4">
        <UserProfileCard user={userData.data} />

        <div className="grid grid-cols-2 gap-4 p-4">
          {loggedInUser.userId && (
            <FollowersModal loggedInUserId={loggedInUser.userId} />
          )}
          {loggedInUser.userId && (
            <FollowingModal loggedInUserId={loggedInUser.userId} />
          )}
        </div>

        <ProfilePostsContainer user={loggedInUser} />
      </div>
    </main>
  );
};

export default MyProfilePage;
