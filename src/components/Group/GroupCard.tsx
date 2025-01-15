import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IGroup } from "@/types";

interface IGroupCardProps {
  group: IGroup;
}

const GroupCard = ({ group }: IGroupCardProps) => {
  return (
    <Card className="p-4 flex items-center justify-between gap-2">
      <div className="flex items-center space-x-3">
        <div className="text-sm font-medium">{group.name}</div>
      </div>

      <Link href={`/groups/${group._id}`}>
        <Button size="sm" variant="outline">
          View Group
        </Button>
      </Link>
    </Card>
  );
};

export default GroupCard;
