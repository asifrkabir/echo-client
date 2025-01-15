import Groups from "@/components/Group/Groups";
import { Suspense } from "react";

const GroupsPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-2">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-semibold md:text-2xl">All Groups</h1>
      </div>
      <Suspense>
        <Groups />
      </Suspense>
    </div>
  );
};

export default GroupsPage;
