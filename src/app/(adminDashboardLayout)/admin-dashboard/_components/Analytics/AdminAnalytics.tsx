"use client";

import TotalPostsCard from "@/components/Analytics/TotalPostsCard";
import TotalUsersCard from "@/components/Analytics/TotalUsersCard";

const AdminAnalytics = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TotalUsersCard />
        <TotalPostsCard />
      </div>
    </>
  );
};

export default AdminAnalytics;
