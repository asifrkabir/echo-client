"use client";

import ProfilePostsContainer from "@/components/post/ProfilePostsContainer";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
import { UserProfileCard } from "@/components/user/UserProfileCard";
import { useUser } from "@/context/user.provider";
import { useGetUserById } from "@/hooks/user.hook";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const { userId } = useParams();
  const { user: loggedInUser, isLoading: isLoggedInUserLoading } = useUser();
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserById(userId as string);

  const handleGoBack = () => {
    router.back();
  };

  if (!userId || isLoggedInUserLoading || !loggedInUser || isUserLoading) {
    return <LoadingSpinner />;
  }

  if (isUserError || !userData?.data) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">No user found</h3>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4">
      <div>
        <Button onClick={handleGoBack} size="sm">
          <ArrowLeft className="mr-2" /> Go Back
        </Button>
      </div>
      <div className="flex flex-col flex-1 justify-center rounded-lg gap-4">
        <UserProfileCard user={userData.data} />
        <ProfilePostsContainer user={userData.data} />
      </div>
    </main>
  );
};

export default ProfilePage;
