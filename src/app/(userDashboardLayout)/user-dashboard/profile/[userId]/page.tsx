"use client";

import ProfilePostsContainer from "@/components/post/ProfilePostsContainer";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
import { UserProfileCard } from "@/components/user/UserProfileCard";
import { useUser } from "@/context/user.provider";
import { useGetUserById } from "@/hooks/user.hook";
import { useParams } from "next/navigation";

const ProfilePage = () => {
  const { userId } = useParams();
  const { user: loggedInUser, isLoading: isLoggedInUserLoading } = useUser();
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserById(userId as string);

  if (!userId || isLoggedInUserLoading || !loggedInUser || isUserLoading) {
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
        <h1 className="text-lg font-semibold md:text-2xl">User Profile</h1>
      </div>
      <div className="flex flex-col flex-1 justify-center rounded-lg border border-dashed shadow-sm gap-4">
        <UserProfileCard user={userData.data} />
        <ProfilePostsContainer user={userData.data} />
      </div>
    </main>
  );
};

export default ProfilePage;
