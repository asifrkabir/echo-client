import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetGroupById } from "@/hooks/group.hook";
import LoadingSpinner from "../ui/LoadingSpinner/LoadingSpinner";

interface IProps {
  id: string;
}

export function GroupDetailsCard({ id }: IProps) {
  const { data, isLoading, isError } = useGetGroupById(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data?.data) {
    return <p>Something went wrong while fetching group</p>;
  }

  const group = data.data;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-lg font-semibold text-center">
          {group.name || "Unknown Group"}
        </CardTitle>

        {group.description && (
          <CardDescription className="text-sm mb-4 text-center">
            {group.description}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}
