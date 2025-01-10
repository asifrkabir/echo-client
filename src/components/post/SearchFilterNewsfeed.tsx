"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDebounce from "@/hooks/debounce.hook";
import { IQueryParam } from "@/types";
import { ArrowDownUp } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

interface SearchFilterNewsfeedProps {
  setParams: React.Dispatch<React.SetStateAction<IQueryParam[]>>;
}

const SearchFilterNewsfeed = ({ setParams }: SearchFilterNewsfeedProps) => {
  const { register, setValue, watch } = useForm();
  const searchTerm = useDebounce(watch("searchTerm"));
  const category = watch("category");
  const sort = watch("sort");
  const isFree = watch("isFree");

  const updateParams = useCallback(
    (name: string, value: boolean | React.Key) => {
      setParams((prev) => {
        const existingIndex = prev.findIndex((param) => param.name === name);

        if (existingIndex > -1) {
          const updatedParams = [...prev];
          updatedParams[existingIndex].value = value;
          return updatedParams;
        } else {
          return [{ name, value }, ...prev];
        }
      });
    },
    [setParams]
  );

  useEffect(() => {
    if (searchTerm !== undefined) {
      updateParams("searchTerm", searchTerm);
    }
  }, [searchTerm, updateParams]);

  useEffect(() => {
    if (category === "all") {
      setParams((prev) => prev.filter((param) => param.name !== "category"));
    } else if (category) {
      updateParams("category", category);
    }
  }, [category, setParams, updateParams]);

  useEffect(() => {
    if (sort) {
      updateParams("sort", sort);
    }
  }, [sort, updateParams]);
  
  useEffect(() => {
    if (isFree !== undefined && isFree !== "on") {
      if (isFree) {
        updateParams("isPremium", false);
      } else {
        setParams((prev) => prev.filter((param) => param.name !== "isPremium"));
      }
    }
  }, [isFree, setParams, updateParams]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <Input
        type="text"
        {...register("searchTerm")}
        placeholder="Search posts..."
        className="max-w-xs"
      />

      <Select
        value={category}
        onValueChange={(value) => setValue("category", value)}
      >
        <SelectTrigger className="max-w-xs">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="tip">Tip</SelectItem>
          <SelectItem value="story">Story</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sort || "-upvotes"}
        onValueChange={(value) => setValue("sort", value)}
      >
        <SelectTrigger className="max-w-xs">
          <ArrowDownUp className="text-muted-foreground size-4" />
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="-upvotes">Upvotes (Descending)</SelectItem>
          <SelectItem value="upvotes">Upvotes (Ascending)</SelectItem>
          <SelectItem value="-createdAt">Date (Newest First)</SelectItem>
          <SelectItem value="createdAt">Date (Oldest First)</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Switch
          {...register("isFree")}
          onCheckedChange={(checked) => setValue("isFree", checked)}
        />
        <label className="text-sm">Show only free posts</label>
      </div>
    </div>
  );
};

export default SearchFilterNewsfeed;
