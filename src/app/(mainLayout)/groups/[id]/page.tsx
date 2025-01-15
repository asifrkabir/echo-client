"use client";

import { GroupDetailsCard } from "@/components/Group/GroupDetailsCard";
import GroupPostsContainer from "@/components/post/GroupPostsContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const GroupDetailsPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div>
        <Button onClick={handleGoBack} size="sm">
          <ArrowLeft className="mr-2" /> Go Back
        </Button>
      </div>
      <div className="flex flex-col flex-1 justify-center rounded-lg gap-4">
        <GroupDetailsCard id={id as string} />
        <GroupPostsContainer groupId={id as string} />
      </div>
    </div>
  );
};

export default GroupDetailsPage;
