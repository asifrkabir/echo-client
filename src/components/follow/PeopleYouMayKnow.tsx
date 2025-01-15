"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPeopleYouMayKnow } from "@/hooks/follow.hook";
import { IQueryParam } from "@/types";
import Link from "next/link";
import { useState } from "react";

const PeopleYouMayKnow = () => {
  const [params] = useState<IQueryParam[]>([{ name: "numOfUsers", value: 5 }]);
  const { data, isLoading, isError } = useGetPeopleYouMayKnow(params);

  const peopleYouMayKnow = data?.data || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="p-4 flex items-center space-x-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-32 rounded" />
            <Skeleton className="h-8 w-24 ml-auto rounded" />
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return <p>Something went wrong while loading people you may know.</p>;
  }

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">People You May Know</h2>
      <div className="space-y-4">
        {peopleYouMayKnow.map((person) => (
          <Card
            key={person._id}
            className="p-4 flex flex-wrap items-center justify-between gap-2"
          >
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={person.profilePicture}
                  alt={`${person.name}'s avatar`}
                  className="rounded-full border-2 border-violet-500"
                />
                <AvatarFallback>
                  {person.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">{person.name}</div>
            </div>

            <Link href={`/profile/${person._id}`}>
              <Button size="sm">View Profile</Button>
            </Link>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default PeopleYouMayKnow;
