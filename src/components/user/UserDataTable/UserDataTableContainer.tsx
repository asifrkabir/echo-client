"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
import { useGetAllUsers } from "@/hooks/user.hook";
import UserDataTable from "./UserDataTable";

const UserDataTableContainer = () => {
  const { data: userData, isLoading } = useGetAllUsers();

  if (!userData?.data || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full">
      <UserDataTable users={userData.data} />
    </div>
  );
};

export default UserDataTableContainer;
