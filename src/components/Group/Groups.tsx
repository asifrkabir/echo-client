"use client";

import { useGetAllGroups } from "@/hooks/group.hook";
import { IQueryParam } from "@/types";
import { useState } from "react";
import Pagination from "../Shared/Pagination";
import { Skeleton } from "../ui/skeleton";
import GroupCard from "./GroupCard";

interface IProps {
  customParams?: IQueryParam[];
}

const Groups = ({ customParams }: IProps) => {
  const [params, setParams] = useState<IQueryParam[]>(() => {
    const defaultParams: IQueryParam[] = [
      { name: "limit", value: 16 },
      { name: "page", value: 1 },
    ];

    return customParams ? [...defaultParams, ...customParams] : defaultParams;
  });

  const { data, isLoading, isError } = useGetAllGroups(params);

  const groups = data?.data || [];
  const meta = data?.meta;

  const handlePageChange = (newPage: number) => {
    setParams((prev) =>
      prev.map((param) =>
        param.name === "page" ? { ...param, value: newPage } : param
      )
    );
  };

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {[...Array(16)].map((_, index) => (
            <Skeleton key={index} className="h-16 w-full rounded-md" />
          ))}
        </div>
      ) : isError ? (
        <p>Something went wrong while fetching groups.</p>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {groups.length === 0 ? (
              <p>No groups found.</p>
            ) : (
              groups.map((group) => <GroupCard key={group._id} group={group} />)
            )}
          </div>

          {meta && (
            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Groups;
