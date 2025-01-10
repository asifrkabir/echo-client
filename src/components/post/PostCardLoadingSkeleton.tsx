import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const PostCardLoadingSkeleton = () => {
  return (
    <Card className="flex flex-col rounded-lg border w-full h-auto animate-pulse">
      <CardHeader className="flex flex-row justify-between items-center p-4">
        <div className="flex flex-row items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div className="ml-3">
            <div className="w-24 h-4 bg-gray-300 rounded-md mb-1" />
            <div className="w-16 h-3 bg-gray-200 rounded-md" />
          </div>
        </div>
        <div className="w-14 h-6 bg-gray-300 rounded-md" />
      </CardHeader>

      <CardContent className="p-4">
        {/* Image Grid Skeleton */}
        <div className="grid grid-cols-2 gap-2 mb-8">
          <div className="w-full h-32 bg-gray-300 rounded-sm" />
          <div className="w-full h-32 bg-gray-300 rounded-sm" />
          <div className="w-full h-32 bg-gray-300 rounded-sm" />
          <div className="w-full h-32 bg-gray-300 rounded-sm" />
        </div>

        <div className="w-full h-4 bg-gray-300 rounded-md mb-2" />
        <div className="w-full h-4 bg-gray-200 rounded-md mb-2" />
        <div className="w-3/4 h-4 bg-gray-200 rounded-md mb-2" />
      </CardContent>

      <CardFooter className="flex items-center justify-center p-4 border-t">
        <div className="w-full flex justify-end">
          <div>
            <div className="w-16 h-8 bg-gray-300 rounded-lg" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCardLoadingSkeleton;
