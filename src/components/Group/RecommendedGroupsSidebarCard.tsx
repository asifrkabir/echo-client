"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetGroupsForUser } from "@/hooks/group.hook";
import { IQueryParam } from "@/types";
import Link from "next/link";
import { useState } from "react";

const RecommendedGroupsSidebarCard = () => {
  const [params] = useState<IQueryParam[]>([
    { name: "groupType", value: "recommended" },
  ]);
  const { data, isLoading, isError } = useGetGroupsForUser(params);

  const groups = data?.data || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            key={index}
            className="p-4 flex items-center space-x-3 justify-between"
          >
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-8 w-24 ml-auto rounded" />
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return <p>Something went wrong while loading groups.</p>;
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recommended Groups</h2>
      </div>
      {groups.length === 0 ? (
        <>There are no groups to join.</>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <Card
              key={group._id}
              className="p-4 flex flex-wrap items-center justify-between gap-2"
            >
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium">{group.name}</div>
              </div>

              <Link href={`/groups/${group._id}`}>
                <Button size="sm" variant="outline">
                  View Group
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecommendedGroupsSidebarCard;
